<script lang="ts">
	import LightboxModal from '$lib/LightboxModal.svelte';
	import { onMount } from 'svelte';

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
			<h1>Hotel v centre historického Bardejova</h1>
		</div>

		<div class="horizontal-l"></div>

		<div class="hero-content-inner hero-btns">
			<button class="primary-btn">
				<span class="material-symbols-outlined"> calendar_month </span>
				Rezervovať
			</button>
			<button class="primary-btn">
				<span class="material-symbols-outlined"> restaurant </span>
				Denné menu
			</button>
		</div>

		<div>
			<div class="horizontal-l"></div>
			<div class="vertical-l"></div>
		</div>
	</div>

	<img src="media/saris3.jpg" alt="" />
</section>

<section class="bg">
	<article>
		<div class="text">
			<div>
				<div class="vertical-l"></div>
				<div class="horizontal-l"></div>
			</div>
			<div class="text-inner">
				<h1>O hoteli</h1>
				<p>
					Hotel Saris sa nachádza v centre historického mesta Bardejov, ktoré je zapísané na zozname
					svetového kultúrneho dedičstva UNESCO. Hotel ponúka komfortné ubytovanie, reštauráciu s
					tradičnou slovenskou kuchyňou a moderné konferenčné priestory.
				</p>
			</div>
			<div>
				<div class="horizontal-l"></div>
				<div class="vertical-l"></div>
			</div>
		</div>
		<div class="gallery">
			<button onclick={(e) => (lightboxImgUrl = (e.target as HTMLImageElement)?.src || '')}>
				<img src="media/pexels-evonics-1058277.jpg" alt="" />
			</button>
		</div>
	</article>

	<article>
		<div class="text">
			<div>
				<div class="vertical-l"></div>
				<div class="horizontal-l"></div>
			</div>
			<div class="text-inner">
				<h1>Ubytovanie</h1>
				<p>
					Hotel Saris ponúka rôzne typy izieb, od štandardných jedno- a dvojlôžkových izieb až po
					luxusné apartmány. Všetky izby sú vybavené moderným nábytkom, Wi-Fi pripojením a TV.
				</p>
			</div>
			<div>
				<div class="horizontal-l"></div>
				<div class="vertical-l"></div>
			</div>
		</div>
		<div class="gallery">
			<button onclick={(e) => (lightboxImgUrl = (e.target as HTMLImageElement)?.src || '')}>
				<img src="media/saris4.jpg" alt="" />
			</button>
		</div>
	</article>

	<article>
		<div class="text">
			<div>
				<div class="vertical-l"></div>
				<div class="horizontal-l"></div>
			</div>
			<div class="text-inner">
				<h1>Gastronómia</h1>
				<p>
					Reštaurácia hotela Saris ponúka široký výber jedál z tradičnej slovenskej kuchyne, ako aj
					medzinárodné špeciality. Hostia si môžu vychutnať jedlo v príjemnom prostredí s výhľadom
					na historické centrum mesta.
				</p>
			</div>
			<div>
				<div class="horizontal-l"></div>
				<div class="vertical-l"></div>
			</div>
		</div>
		<div class="gallery">
			<button onclick={(e) => (lightboxImgUrl = (e.target as HTMLImageElement)?.src || '')}>
				<img src="media/saris zenich nevesta.jpg" alt="" />
			</button>
		</div>
	</article>

	<article>
		<div class="text">
			<div>
				<div class="vertical-l"></div>
				<div class="horizontal-l"></div>
			</div>
			<div class="text-inner">
				<h1>Aktivity</h1>
				<p>
					V blízkosti hotela sa nachádzajú rôzne turistické a cyklistické trasy, ako aj historické
					pamiatky. Hostia môžu navštíviť Bardejovské kúpele, ktoré sú známe svojimi liečivými
					prameňmi.
				</p>
			</div>
			<div>
				<div class="horizontal-l"></div>
				<div class="vertical-l"></div>
			</div>
		</div>
		<div class="gallery">
			<button onclick={(e) => (lightboxImgUrl = (e.target as HTMLImageElement)?.src || '')}>
				<img src="media/pexels-evonics-1058277.jpg" alt="" />
			</button>
			<button onclick={(e) => (lightboxImgUrl = (e.target as HTMLImageElement)?.src || '')}>
				<img src="media/pexels-evonics-1058277.jpg" alt="" />
			</button>
			<button onclick={(e) => (lightboxImgUrl = (e.target as HTMLImageElement)?.src || '')}>
				<img src="media/pexels-evonics-1058277.jpg" alt="" />
			</button>
		</div>
	</article>
</section>

<style>
	/* Hero */

	.hero {
		height: 100vh;
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
		grid-template-rows: 1fr auto auto auto 1fr;
		background: url('/background.jpg') no-repeat center center;
		background-size: cover;
		z-index: 10;
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
		width: 0;
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

	.hero-btns {
		display: flex;
		gap: 2rem;
		justify-content: flex-end;
		animation: none;
		height: auto;
	}

	/* Articles */

	.bg {
		background-color: var(--primary);
		padding: 20vh 0;
		overflow-x: hidden;
	}

	article {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		max-width: 1500px;
		margin: 0 auto 20vh auto;
		padding: 0 2rem;
		min-height: 400px;
		max-height: 80vh;
	}

	article:nth-child(even) .text {
		order: 2;
	}

	article:nth-child(even) .gallery {
		order: 1;
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
		font-size: 5rem;
		font-weight: 800;
		letter-spacing: -0.05rem;

		background: radial-gradient(var(--tertiary) 0%, var(--tertiary-semi) 80%);
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.text p {
		font-size: 1.1rem;
		line-height: 1.8;
		color: white;
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
		width: 25vh;
		height: 25vh;
		position: absolute;
		top: -10%;
		left: -15%;
		background-color: #61584b10;
		backdrop-filter: blur(10px);
		z-index: 2;
	}

	article:nth-child(even) .gallery::before {
		left: unset;
		right: -5%;
		width: 15vh;
		height: 15vh;
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

	article:nth-child(even) .gallery::after {
		right: unset;
		left: -15%;
		width: 25vh;
		height: 25vh;
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
		transition-delay: 0.4s;
	}

	:global(.gallery.animate) button:nth-child(3) {
		transition-delay: 0.8s;
	}

	:global(.gallery.animate) button:nth-child(4) {
		transition-delay: 1.2s;
	}

	:global(.gallery.animate) button:nth-child(5) {
		transition-delay: 1.6s;
	}

	:global(.gallery.animate) button:nth-child(n + 6) {
		transition-delay: 2s;
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

		.text p {
			font-size: 1.1rem;
		}

		.gallery {
			min-height: 250px;
		}
	}
</style>
