<script lang="ts">
	import '../app.css';
	import { language } from '$lib/stores/language';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let { children, data } = $props();

	// Initialize language store from localStorage on mount
	onMount(() => {
		language.init();
	});

	function changeLanguage(lang: 'sk' | 'en') {
		language.set(lang);
	}

	let isSidebarOpen = $state(false);
</script>

<div class="desktop-header">
	<header>
		<a href="/" class="logo">
			<img src="media/saris logo.png" alt="" />
		</a>
		<button class="open-sidebar-btn" onclick={() => (isSidebarOpen = true)}>
			<span class="material-symbols-outlined"> menu </span>
		</button>
		<nav>
			{#each data.navMenu || [] as navItem}
				{#if navItem?.type === 'categoryLink'}
					<span class="flyout-trigger">
						<span class="flyout-title">
							{navItem?.text}
							<span class="material-symbols-outlined"> arrow_drop_down </span>
						</span>
						<div class="flyout">
							{#each navItem?.links || [] as link}
								<a href="/{link?.page}">{link?.text}</a>
							{/each}
						</div>
					</span>
				{:else if navItem?.type === 'pageLink'}
					<a href="/{navItem?.page}">{navItem?.text}</a>
				{/if}
			{/each}

			<span class="flyout-trigger">
				<span class="flyout-title">
					<span class="material-symbols-outlined"> language </span>
				</span>
				<div class="flyout">
					<button onclick={() => changeLanguage('sk')}>Slovensky</button>
					<button onclick={() => changeLanguage('en')}>English</button>
				</div>
			</span>

			{#each data.socialMenu || [] as socialItem}
				{#if socialItem?.__typename === 'MenuSocialMenuLinks'}
					<a href={socialItem?.url}>
						<img src={socialItem?.image} alt="" class="social-icon" />
					</a>
				{/if}
			{/each}
		</nav>
	</header>
</div>

{#if isSidebarOpen}
	<div class="sidebar-backdrop" in:fade={{ duration: 200 }} out:fade={{ duration: 200 }}>
		<div class="sidebar" in:fly={{ x: -300, duration: 300 }} out:fly={{ x: -300, duration: 300 }}>
			<button class="close-sidebar-btn" onclick={() => (isSidebarOpen = false)}>
				<span class="material-symbols-outlined"> close </span>
			</button>
			<nav>
				<a href="/">Domov</a>
				{#each data.navMenu || [] as navItem}
					{#if navItem?.__typename === 'MenuNavMenuLinksCategoryLink'}
						<div class="category">
							<span class="category-title">
								{navItem?.text}
							</span>
							{#each navItem?.links || [] as page}
								<a href="/{page?.page?._sys.filename}">— {page?.text}</a>
							{/each}
						</div>
					{:else if navItem?.__typename === 'MenuNavMenuLinksPageLink'}
						<a href="/{navItem?.page?._sys.filename}">{navItem?.text}</a>
					{/if}
				{/each}

				<div class="category mt-8 mb-8">
					<span class="category-title">
						<span class="material-symbols-outlined"> language </span>
					</span>
					<button onclick={() => changeLanguage('sk')}>— Slovensky</button>
					<button onclick={() => changeLanguage('en')}>— English</button>
				</div>

				<div class="social-menu">
					{#each data.socialMenu || [] as socialItem}
						{#if socialItem?.__typename === 'MenuSocialMenuLinks'}
							<a href={socialItem?.url}>
								<img src={socialItem?.image} alt="" class="social-icon" />
							</a>
						{/if}
					{/each}
				</div>
			</nav>
		</div>
	</div>
{/if}

{@render children()}

<style>
	.desktop-header {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.desktop-header header {
		max-width: 500rem;
		height: 4.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 0 2rem;
		margin: 1rem;
		color: var(--tertiary);
		position: relative;

		background:
			radial-gradient(circle 1rem at top left, #0000 98%, var(--secondary)) top left,
			radial-gradient(circle 1rem at top right, #0000 98%, var(--secondary)) top right,
			radial-gradient(circle 1rem at bottom left, #0000 98%, var(--secondary)) bottom left,
			radial-gradient(circle 1rem at bottom right, #0000 98%, var(--secondary)) bottom right;
		background-size: 51% 51%;
		background-repeat: no-repeat;

		font-size: 1rem;
	}

	.desktop-header header::after {
		content: '';
		position: absolute;
		height: calc(100% - 0.5rem);
		width: calc(100% - 0.5rem);
		border: 1px solid var(--tertiary-semi);

		pointer-events: none;
	}

	.desktop-header header::before {
		content: '';
		position: absolute;
		height: calc(100% + 2px);
		width: calc(100% + 2px);

		background:
			radial-gradient(circle 1rem at top left, #0000 98%, var(--tertiary-semi)) top left,
			radial-gradient(circle 1rem at top right, #0000 98%, var(--tertiary-semi)) top right,
			radial-gradient(circle 1rem at bottom left, #0000 98%, var(--tertiary-semi)) bottom left,
			radial-gradient(circle 1rem at bottom right, #0000 98%, var(--tertiary-semi)) bottom right;
		background-size: 51% 51%;
		background-repeat: no-repeat;

		z-index: -1;

		filter: drop-shadow(0 0.2rem 0.3rem #10101080);
	}

	.desktop-header .logo {
		height: 100%;
		width: auto;
	}

	.desktop-header .logo img {
		height: 100%;
		width: auto;
		float: center;
		filter: sepia(45%) saturate(637%) hue-rotate(308deg) brightness(80%) contrast(96%);
		padding: 1rem 0;
		object-fit: contain;
	}

	.logo:hover {
		filter: drop-shadow(0 0 0.4rem var(--tertiary-semi)) brightness(10);
	}

	.desktop-header nav {
		height: 100%;
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 0 0.5rem;
		position: relative;
	}

	.desktop-header nav > a,
	.desktop-header .flyout-trigger {
		text-decoration: none;
		transition:
			text-shadow 0.15s ease-in-out,
			color 0.15s ease-in-out;
		color: var(--tertiary);
		padding: 1.5rem 0;
	}

	.desktop-header a:hover,
	.desktop-header .flyout-trigger:hover .flyout-title,
	.desktop-header .flyout button:hover {
		text-shadow: 0 0 1rem var(--tertiary);
		color: white;
	}

	.social-icon {
		height: 1.2rem;
		width: auto;
	}

	.flyout-title {
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.flyout {
		display: flex;
		position: absolute;
		top: 100%;
		transform: translateX(-0.75rem);
		padding: 0.25rem 3rem 0.75rem 0.75rem;
		flex-direction: column;
		gap: 0.5rem;
		background:
			radial-gradient(circle 0.5rem at bottom left, #0000 98%, var(--tertiary-semi)) bottom left,
			radial-gradient(circle 0.5rem at bottom right, #0000 98%, var(--tertiary-semi)) bottom right;
		background-size: 51% 100%;
		background-repeat: no-repeat;

		mask-image: linear-gradient(to bottom, white 100%, transparent 0%);
		mask-repeat: no-repeat;
		mask-size: 100% 0%;
		pointer-events: none;
		transition: mask-size 0.15s ease-in-out;
	}

	.flyout::before {
		content: '';
		position: absolute;
		top: 0px;
		left: 1px;
		height: calc(100% - 1px);
		width: calc(100% - 2px);

		background:
			radial-gradient(circle 0.5rem at bottom left, #0000 98%, var(--secondary)) bottom left,
			radial-gradient(circle 0.5rem at bottom right, #0000 98%, var(--secondary)) bottom right;
		background-size: 51% 100%;
		background-repeat: no-repeat;

		z-index: -1;
	}

	.flyout-trigger:hover > .flyout,
	.flyout:hover {
		mask-size: 100% 100%;
		pointer-events: all;
	}

	.flyout button {
		cursor: pointer;
		text-align: left;
	}

	.open-sidebar-btn {
		display: none;
	}

	.sidebar {
		display: none;
	}

	/* Responsive */
	@media (max-width: 1000px) {
		.desktop-header header {
			padding: 0 1rem;
			margin: 0.5rem;
		}

		.desktop-header nav {
			display: none;
		}

		.open-sidebar-btn {
			display: flex;
			cursor: pointer;
		}

		.close-sidebar-btn {
			display: flex;
			cursor: pointer;
			background-color: var(--primary);
			color: var(--tertiary);
			width: fit-content;
			border-radius: 100rem;
			padding: 0.25rem;
		}

		.sidebar-backdrop {
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			background-color: #61584b10;
			backdrop-filter: blur(10px);
			z-index: 100;
		}

		.sidebar {
			position: fixed;
			top: 0;
			left: 0;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			background: var(--tertiary);
			height: 100vh;
			min-width: 50vw;
			padding: 1rem 2rem 1rem 1rem;
		}

		.sidebar nav {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		.sidebar nav > a {
			text-decoration: none;
			transition:
				text-shadow 0.15s ease-in-out,
				color 0.15s ease-in-out;
			color: var(--primary);
		}

		.sidebar .category {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.sidebar .category-title {
			font-weight: bold;
		}

		.sidebar .category button {
			text-align: left;
		}

		.sidebar .social-menu {
			display: flex;
			gap: 1rem;
		}

		.sidebar .social-icon {
			height: 1.5rem;
			width: auto;
		}
	}
</style>
