<script lang="ts">
	import LightboxModal from '$lib/LightboxModal.svelte';
	import { language } from '$lib/stores/language';
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import sanitizeHtml from 'sanitize-html';

	let { data } = $props();

	let lightboxImgUrl = $state('');

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate');
					}
				});
			},
			{
				threshold: 0.2,
				rootMargin: '0px 0px -50px 0px'
			}
		);

		const animatedElements = document.querySelectorAll(
			'.vertical-l, .horizontal-l, .hero-content-inner, .text-inner, .gallery'
		);
		animatedElements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});

	const handleHref = (button: any) => {
		if (button.type === 'pageButton') {
			return button.page || '#';
		} else if (button.type === 'urlButton') {
			// Check if the URL starts with http:// or https://
			if (button.url && !/^https?:\/\//i.test(button.url)) {
				return 'https://' + button.url;
			}
			return button.url || '#';
		}
		return '#'; // Default fallback URL
	};
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
				{$language === 'sk' ? data.page.title : data.page.enTitle}
			</h1>
		</div>

		<div>
			<div class="horizontal-l"></div>
			<div class="vertical-l"></div>
		</div>
	</div>

	{#if data.page.image}
		<img src={data.page.image} alt="" />
	{/if}
</section>

<section class="bg">
	{#each data.page.content || [] as content}
		<article>
			<div class="text">
				<div>
					<div class="vertical-l"></div>
					<div class="horizontal-l"></div>
				</div>
				<div class="text-inner">
					<h1>{$language === 'sk' ? content?.title : content?.enTitle}</h1>
					<div class="text-body">
						{#await marked.parse(($language === 'sk' ? content?.text : content?.enText) || '')}
							<p>Loading...</p>
						{:then parsed}
							{@html sanitizeHtml(parsed)}
						{:catch error}
							<p>Error loading content.</p>
						{/await}
					</div>
					{#if content?.buttons}
						<div class="mt-4 flex gap-4">
							{#each content?.buttons || [] as button}
								<a href={handleHref(button)} class="primary-btn">
									{$language === 'sk' ? button?.text : button?.enText}
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
			{#if content?.gallery}
				<div class="gallery">
					{#each content?.gallery || [] as img}
						<button onclick={(e) => (lightboxImgUrl = (e.target as HTMLImageElement)?.src || '')}>
							<img src={img.image} alt="" />
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
		height: 50vh;
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}

	.hero img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		overflow: hidden;
	}

	.hero:has(img) {
		height: 75vh;
		grid-template-columns: 50% 1fr;
	}

	.hero-content {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto 1fr;
		background: var(--tertiary);
		background-size: cover;
		z-index: 10;
		height: auto;
	}

	.hero:has(img) .hero-content {
		background: url('media/background.webp') no-repeat center center;
	}

	.hero-content-inner {
		margin: 0 3rem;
		padding: 2rem;
		border-left: 1px solid var(--tertiary-border);
		border-right: 1px solid var(--tertiary-border);
		height: 4rem;
	}

	:global(.hero-content-inner.animate) {
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
		color: var(--secondary);
		font-size: max(5vw, 3rem);
		font-weight: 400;
		letter-spacing: -0.1rem;
		line-height: 110%;
	}

	.hero:has(img) .hero-content-inner h1 {
		color: var(--tertiary);
	}

	.vertical-l {
		height: 100%;
		border-left: 1px solid var(--tertiary-border);
		border-right: 1px solid var(--tertiary-border);

		mask-image: linear-gradient(to bottom, white 100%, transparent 0%);
		mask-repeat: no-repeat;
		mask-size: 100% 0%;
	}

	:global(.vertical-l.animate) {
		animation: vertical-l-mask 2s ease-in-out forwards;
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
	}

	:global(.horizontal-l.animate) {
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
	}

	.text h1 {
		font-family: 'Gloock', serif;
		font-size: 3rem;
		line-height: 1.2;
		font-weight: 800;
		letter-spacing: -0.05rem;
		color: var(--tertiary);
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

	:global(.gallery.animate) {
		transform: translateY(0);
		opacity: 1;
	}

	.gallery::before {
		content: '';
		display: block;
		width: 20vh;
		height: 20vh;
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
			transform 0.8s ease-out,
			opacity 0.8s ease-out;

		transform: translateY(50px);
		opacity: 0;
	}

	:global(.gallery.animate) button {
		transform: translateY(0);
		opacity: 1;
	}

	:global(.gallery.animate) button:nth-child(1) {
		transition-delay: 0s;
	}

	:global(.gallery.animate) button:nth-child(2) {
		transition-delay: 0.2s;
	}

	:global(.gallery.animate) button:nth-child(3) {
		transition-delay: 0.4s;
	}

	:global(.gallery.animate) button:nth-child(4) {
		transition-delay: 0.6s;
	}

	:global(.gallery.animate) button:nth-child(5) {
		transition-delay: 0.8s;
	}

	:global(.gallery.animate) button:nth-child(n + 6) {
		transition-delay: 1s;
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
		transition-duration: 0.15s;
	}

	:global(.gallery.animate) button:hover {
		transform: translateY(0) scale(1.01);
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
	@media (max-width: 1000px) {
		/* Hero Section */
		.hero {
			height: 80vh;
			grid-template-columns: 1fr;
			grid-template-rows: 50% 1fr;
		}

		.hero-content-inner {
			padding: 1rem;
		}

		.hero-content-inner h1 {
			font-size: 3rem;
			line-height: 3.5rem;
			letter-spacing: normal;
			text-align: center;
		}

		/* Articles */
		article {
			grid-template-columns: 1fr;
			gap: 2rem;
			margin-bottom: 10vh;
			min-height: auto;
			max-height: none;
			padding: 0 1rem;
		}

		article:has(.gallery) {
			grid-template-columns: 1fr;
		}

		article:nth-child(even) .text,
		article:nth-child(even) .gallery {
			order: unset;
		}

		.text {
			padding: 0.5rem;
		}

		.text h1 {
			font-size: 2.5rem;
			text-align: center;
		}

		.text .vertical-l {
			margin: 0 1rem;
		}

		.text-inner {
			margin: 0 1rem;
			padding: 1.5rem;
		}

		/* Gallery */
		.gallery {
			min-height: 250px;
			max-height: 60vh;
			width: 100%;
			justify-self: stretch;
		}

		.gallery::before,
		article:nth-child(even) .gallery::before {
			width: 8vh;
			height: 8vh;
			top: -5%;
			left: -5%;
		}

		.gallery::after,
		article:nth-child(even) .gallery::after {
			width: 5vh;
			height: 5vh;
			bottom: -5%;
			right: -5%;
		}

		/* Multiple images mobile adjustments */
		.gallery:has(button:nth-child(n + 4)) {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: repeat(auto-fit, 1fr);
		}

		.gallery:has(button:nth-child(n + 5)) {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		/* Extra small screens */
		.hero-content-inner {
			margin: 0 0.5rem;
			padding: 0.5rem;
		}

		.hero-content-inner h1 {
			font-size: 2.5rem;
			line-height: 3rem;
		}

		.hero .vertical-l {
			margin: 0 0.5rem;
		}

		.text h1 {
			font-size: 2rem;
		}

		.text .vertical-l {
			margin: 0 0.5rem;
		}

		.text-inner {
			margin: 0 0.5rem;
			padding: 1rem;
		}

		.gallery {
			min-height: 200px;
		}

		/* Force single column for very small galleries */
		/* .gallery:has(button:nth-child(n + 3)) {
			grid-template-columns: 1fr;
		} */
	}
</style>
