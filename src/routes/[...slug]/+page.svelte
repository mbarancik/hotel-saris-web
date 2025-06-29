<script lang="ts">
	import LightboxModal from '$lib/LightboxModal.svelte';
	import parseContentToHtml from '$lib/parseToHtml';

	let { data } = $props();

	let lightboxImgUrl = $state('');
</script>

{#if lightboxImgUrl}
	<LightboxModal imgUrl={lightboxImgUrl} close={() => (lightboxImgUrl = '')} />
{/if}

<section class="hero">
	<div class="hero-content">
		<div>
			<div class="vertical-l"></div>
			<div class="horizontal-l"></div>
		</div>

		<div class="hero-content-inner">
			<h1>
				{data.page.title}
			</h1>
		</div>

		<div>
			<div class="horizontal-l"></div>
			<div class="vertical-l"></div>
		</div>
	</div>

	<img src={data.page.image} alt="" />
</section>

<section class="bg">
	{#each data.page.body || [] as body}
		<article>
			<div class="text">
				<div>
					<div class="vertical-l"></div>
					<div class="horizontal-l"></div>
				</div>
				<div class="text-inner">
					<h1>{body?.title}</h1>
					<div class="text-body">
						{@html parseContentToHtml(body?.text)}
					</div>
					{#if body?.buttons}
						<div class="mt-4 flex gap-4">
							{#each body?.buttons || [] as button}
								<a
									href={button?.__typename === 'PagesBodyButtonsPageButton'
										? button.page?._sys.filename
										: button?.__typename === 'PagesBodyButtonsUrlButton'
											? button.url?.substring(0, 4) === 'http'
												? button.url
												: 'https://' + button.url
											: '#'}
									class="primary-btn"
								>
									{button?.text}
								</a>
							{/each}
						</div>
					{/if}
				</div>
				<div>
					<div class="horizontal-l"></div>
					<div class="vertical-l"></div>
				</div>
			</div>
			{#if body?.gallery}
				<div class="gallery">
					{#each body?.gallery || [] as img}
						<button onclick={(e) => (lightboxImgUrl = (e.target as HTMLImageElement)?.src || '')}>
							<img src={img} alt="" />
						</button>
					{/each}
				</div>
			{/if}
		</article>
	{/each}
</section>

<style>
	/* Hero */

	.hero {
		height: 60vh;
		overflow: hidden;
		display: grid;
		grid-template-columns: 55% 1fr;
		grid-template-rows: 1fr;
	}

	.hero img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 20%;
	}

	.hero-content {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto 1fr;
		background: url('/background.jpg') no-repeat center center;
		background-size: cover;
		z-index: 10;
	}

	.hero-content-inner {
		margin: 0 3rem;
		padding: 2rem;
		border-left: 1px solid var(--tertiary-border);
		border-right: 1px solid var(--tertiary-border);
		animation: vertical-l 2s ease-in-out forwards;
	}

	@keyframes vertical-l {
		0% {
			height: 4rem;
		}
		100% {
			height: 100%;
		}
	}

	.hero-content-inner h1 {
		font-family: 'Gloock', serif;
		color: var(--tertiary);
		font-size: 5.5rem;
		font-weight: 400;
		letter-spacing: -0.15rem;
		line-height: 6.5rem;
	}

	.vertical-l {
		height: 100%;
		border-left: 1px solid var(--tertiary-border);
		border-right: 1px solid var(--tertiary-border);
		animation: vertical-l-mask 2s ease-in-out forwards;
		mask-image: linear-gradient(to bottom, white 100%, transparent 0%);
		mask-repeat: no-repeat;
	}

	.hero .vertical-l {
		margin: 0 3rem;
	}

	@keyframes vertical-l-mask {
		0% {
			mask-size: 100% 0%;
		}
		100% {
			mask-size: 100% 100%;
		}
	}

	.horizontal-l {
		height: 1px;
		width: 0%;
		background-color: var(--tertiary-border);
		animation: horizontal-l 2s ease-in-out forwards;
	}

	.horizontal-l:nth-of-type(odd) {
		float: right;
	}

	@keyframes horizontal-l {
		0% {
			width: 0;
		}
		100% {
			width: 100%;
		}
	}

	/* Articles */

	.bg {
		background-color: var(--primary);
		padding: 20vh 0;
		overflow-x: hidden;
	}

	article {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		max-width: 1500px;
		margin: 0 auto 20vh auto;
		padding: 0 2rem;
	}

	article:has(.gallery) {
		grid-template-columns: 1fr 1fr;
	}

	.text {
		display: grid;
		grid-template-rows: 1fr auto 1fr;
		grid-template-columns: 1fr;
		padding: 1rem;
		z-index: 3;
		/* background: radial-gradient(
      closest-side at center,
      #61584b20 60%,
      transparent 80%
    ); */
	}

	.text h1 {
		font-family: 'Gloock', serif;
		font-size: 3rem;
		line-height: 1.2;
		font-weight: 800;
		letter-spacing: -0.05rem;

		background: radial-gradient(var(--tertiary) 0%, var(--tertiary-semi) 80%);
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.text .vertical-l {
		margin: 0 2rem;
		min-height: 2rem;
	}

	.text-inner {
		margin: 0 2rem;
		padding: 2rem;
		border-left: 1px solid var(--tertiary-border);
		border-right: 1px solid var(--tertiary-border);
		animation: vertical-l 2s ease-in-out forwards;
	}

	.gallery {
		gap: 1rem;
		height: 100%;
		max-height: 80vh;
		position: relative;
		width: fit-content;
		justify-self: center;
	}

	.gallery::before {
		content: '';
		display: block;
		width: 25vh;
		height: 25vh;
		position: absolute;
		top: -10%;
		left: -15%;
		background-color: #61584b10;
		backdrop-filter: blur(10px);
		z-index: 2;
	}

	.gallery::after {
		content: '';
		display: block;
		width: 15vh;
		height: 15vh;
		position: absolute;
		bottom: -10%;
		right: -5%;
		background-color: #61584b10;
		backdrop-filter: blur(10px);
		z-index: 2;
	}

	.gallery button {
		height: 100%;
		width: fit-content;
		padding: 0;
		border: none;
		background: none;
		cursor: pointer;
		overflow: hidden;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.gallery img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: center;
		cursor: pointer;
		display: block;
	}

	.gallery button:hover {
		transform: scale(1.01);
		box-shadow: 0 0 2rem #61584b20;
	}

	/* Multiple images */
	.gallery:has(button:nth-child(n + 2)) {
		display: grid;
	}

	.gallery:has(button:nth-child(n + 2)) button {
		width: 100%;
	}

	/* Two images */
	.gallery:has(img:nth-child(2):last-child),
	.gallery:has(button:nth-child(2):last-child) {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr;
	}

	/* Three images */
	.gallery:has(img:nth-child(3):last-child),
	.gallery:has(button:nth-child(3):last-child) {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
	}

	.gallery:has(img:nth-child(3):last-child) img:first-child,
	.gallery:has(button:nth-child(3):last-child) button:first-child {
		grid-column: 1 / -1;
		grid-row: 1;
	}

	/* Four images */
	.gallery:has(img:nth-child(4):last-child),
	.gallery:has(button:nth-child(4):last-child) {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
	}

	/* Five or more images */
	.gallery:has(img:nth-child(n + 5)),
	.gallery:has(button:nth-child(n + 5)) {
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(auto-fit, 1fr);
	}

	/* Responsive design */
	@media (max-width: 768px) {
		article {
			grid-template-columns: 1fr;
			gap: 2rem;
			margin-bottom: 4rem;
			min-height: auto;
		}

		article:nth-child(even) {
			grid-template-columns: 1fr;
		}

		article:nth-child(even) .text,
		article:nth-child(even) .gallery {
			order: unset;
		}

		.text {
			padding: 1rem;
		}

		.text h1 {
			font-size: 2.5rem;
		}

		.gallery {
			min-height: 250px;
		}
	}
</style>
