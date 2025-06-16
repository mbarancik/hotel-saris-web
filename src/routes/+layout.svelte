<script lang="ts">
	import '../app.css';

	let { children, data } = $props();
</script>

<div class="flex justify-center w-full fixed top-0 left-0 z-100">
	<header>
		<img src="media/saris logo.png" alt="" class="logo">
		<nav>
			<a href="/">Ubytovanie</a>
			<a href="/">Gastronómia</a>
			<a href="/">Aktivity</a>
			<a href="/">Svadby</a>
			<a href="/">Firemné akcie</a>
			<a href="/">Kontakt</a>
			<span class="material-symbols-outlined">
				language
			</span>
			<a href="/">
				<img src="Facebook_Logo_Primary.png" alt="" class="social-icon">
			</a>
			<a href="/">
				<img src="Instagram_Glyph_Gradient.png" alt="" class="social-icon">
			</a>
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
		padding: 1rem 2rem;
		margin: 1rem;
		color: var(--tertiary);
		position: relative;

		background:
			radial-gradient(circle 1rem at top    left ,#0000 98%,var(--secondary)  ) top    left,
			radial-gradient(circle 1rem at top    right,#0000 98%,var(--secondary) ) top    right,
			radial-gradient(circle 1rem at bottom left ,#0000 98%,var(--secondary)) bottom left,
			radial-gradient(circle 1rem at bottom right,#0000 98%,var(--secondary)) bottom right;
		background-size:51% 51%;
		background-repeat:no-repeat;

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
			radial-gradient(circle 1rem at top    left ,#0000 98%,var(--tertiary-semi)  ) top    left,
			radial-gradient(circle 1rem at top    right,#0000 98%,var(--tertiary-semi) ) top    right,
			radial-gradient(circle 1rem at bottom left ,#0000 98%,var(--tertiary-semi)) bottom left,
			radial-gradient(circle 1rem at bottom right,#0000 98%,var(--tertiary-semi)) bottom right;
		background-size:51% 51%;
		background-repeat:no-repeat;

		z-index: -1;

		filter: drop-shadow(0 0.2rem 0.3rem #10101080);
	}

	nav {
		height: 100%;
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 0.5rem;
	}

	.logo {
		height: 100%;
		width: auto;
		float: center;
		filter: sepia(45%) saturate(637%) hue-rotate(308deg) brightness(80%) contrast(96%);
	}

	a {
		text-decoration: none;
		transition: text-shadow 0.15s ease-in-out, color 0.15s ease-in-out;
		color: var(--tertiary);
	}

	a:hover {
		text-shadow: 0 0 1rem var(--tertiary);
		color: white;
	}

	.social-icon {
		height: 1.2rem;
		width: auto;
	}
</style>