<script lang="ts">
	import '../app.css';
	import { language } from '$lib/stores/language';
	import { onMount } from 'svelte';

	let { children, data } = $props();

	const pages = data?.pages || [];
	const navMenu =
		data?.menu?.find((item) => item?.node?._sys?.filename === 'NavMenu')?.node?.links || [];
	const socialMenu =
		data?.menu?.find((item) => item?.node?._sys?.filename === 'SocialMenu')?.node?.links || [];

	// Initialize language store from localStorage on mount
	onMount(() => {
		language.init();
	});

	function changeLanguage(lang: 'sk' | 'en') {
		language.set(lang);
	}
</script>

<div class="fixed top-0 left-0 z-100 flex w-full justify-center">
	<header>
		<a href="/" class="logo">
			<img src="media/saris logo.png" alt="" />
		</a>
		<nav>
			{#each navMenu as navItem}
				{#if navItem?.__typename === 'MenuNavMenuLinksCategoryLink'}
					<span class="flyout-trigger">
						<span class="flyout-title">
							{navItem?.text}
							<span class="material-symbols-outlined"> arrow_drop_down </span>
						</span>
						<div class="flyout">
							{#each navItem?.links || [] as page}
								<a href="/{page?.page?._sys.filename}">{page?.text}</a>
							{/each}
						</div>
					</span>
				{:else if navItem?.__typename === 'MenuNavMenuLinksPageLink'}
					<a href="/{navItem?.page?._sys.filename}">{navItem?.text}</a>
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

			{#each socialMenu as socialItem}
				{#if socialItem?.__typename === 'MenuSocialMenuLinks'}
					<a href={socialItem?.url}>
						<img src={socialItem?.image} alt="" class="social-icon" />
					</a>
				{/if}
			{/each}
		</nav>
	</header>
</div>

{@render children()}

<style>
	header {
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

	header::after {
		content: '';
		position: absolute;
		height: calc(100% - 0.5rem);
		width: calc(100% - 0.5rem);
		border: 1px solid var(--tertiary-semi);

		pointer-events: none;
	}

	header::before {
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

	.logo {
		height: 100%;
		width: auto;
	}

	.logo img {
		height: 100%;
		width: auto;
		float: center;
		filter: sepia(45%) saturate(637%) hue-rotate(308deg) brightness(80%) contrast(96%);
		padding: 1rem 0;
	}

	.logo:hover {
		filter: drop-shadow(0 0 0.4rem var(--tertiary-semi)) brightness(10);
	}

	nav {
		height: 100%;
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 0 0.5rem;
		position: relative;
	}

	nav > a,
	.flyout-trigger {
		text-decoration: none;
		transition:
			text-shadow 0.15s ease-in-out,
			color 0.15s ease-in-out;
		color: var(--tertiary);
		padding: 1.5rem 0;
	}

	a:hover,
	.flyout-trigger:hover .flyout-title,
	.flyout button:hover {
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
</style>
