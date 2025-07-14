<script lang="ts">
	import { language } from '$lib/stores/language';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { fly } from 'svelte/transition';

	let observer: IntersectionObserver;

	function setupObserver() {
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate');
					}
				});
			},
			{ threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
		);

		document
			.querySelectorAll('.vertical-l, .horizontal-l, .hero-content-inner, .text-inner, .gallery')
			.forEach((el) => observer.observe(el));
	}

	function teardownObserver() {
		observer?.disconnect();
	}

	function resetAnimations() {
		document.querySelectorAll('.animate').forEach((el) => el.classList.remove('animate'));
	}

	onMount(() => {
		setupObserver();
		return () => teardownObserver();
	});

	afterNavigate(() => {
		// remove old classes, tear down & re-observe new elements
		resetAnimations();
		teardownObserver();
		setupObserver();
	});

	let formStatus = $state('');

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		if (!form) return;
		const data = new FormData(form);

		fetch(form.action, {
			method: form.method,
			body: data,
			headers: {
				Accept: 'application/json'
			}
		})
			.then((response) => {
				if (response.ok) {
					formStatus =
						$language === 'sk' ? 'Ďakujeme za rezerváciu!' : 'Thanks for your submission!';
					if (form) form.reset();
				} else {
					formStatus =
						$language === 'sk'
							? 'Nastala chyba pri odosielaní formulára'
							: 'There was a problem submitting your form';
				}
			})
			.catch((error) => {
				formStatus =
					$language === 'sk'
						? 'Nastala chyba pri odosielaní formulára'
						: 'There was a problem submitting your form';
			});
	}
</script>

<svelte:head>
	<title>{$language === 'sk' ? 'Rezervácia | Hotel Šariš' : 'Reservation | Hotel Šariš'}</title>

	<meta name="description" content="Zarezervujte si svoj pobyt v Hoteli Šariš." />
	<meta property="og:title" content="Rezervácia | Hotel Šariš" />
	<meta property="og:description" content="Zarezervujte si svoj pobyt v Hoteli Šariš." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://hotel-saris-web.pages.dev/rezervacia" />
	<meta property="og:image" content="/media/favicon.ico" />

	<link rel="canonical" href="https://hotel-saris-web.pages.dev/rezervacia" />
</svelte:head>

<section class="hero">
	<div class="hero-content">
		<div>
			<div class="vertical-l min-h-20"></div>
			<div class="horizontal-l"></div>
		</div>

		<div class="hero-content-inner">
			<h1>
				{$language === 'sk' ? 'Rezervácia' : 'Reservation'}
			</h1>
		</div>

		<div>
			<div class="horizontal-l"></div>
			<div class="vertical-l"></div>
		</div>
	</div>

	<div class="hero-form">
		<form action="https://formspree.io/f/mldlrjol" method="POST" onsubmit={handleSubmit}>
			<div class="form-group">
				<div>
					<label for="meno">{$language === 'sk' ? 'Meno' : 'First Name'}</label>
					<input type="text" id="meno" name="meno" required />
				</div>

				<div>
					<label for="priezvisko">{$language === 'sk' ? 'Priezvisko' : 'Last Name'}</label>
					<input type="text" id="priezvisko" name="priezvisko" required />
				</div>
			</div>

			<label for="telefon">{$language === 'sk' ? 'Telefón' : 'Phone'}</label>
			<input type="text" id="telefon" name="telefon" required />

			<label for="email">E-mail</label>
			<input type="email" id="email" name="email" required />

			<label for="typ-izby">{$language === 'sk' ? 'Typ izby' : 'Room Type'}</label>
			<select id="typ-izby" name="typ-izby" required>
				<option value="1/1">1/1</option>
				<option value="1/2">1/2</option>
				<option value="apartman">{$language === 'sk' ? 'Apartmán' : 'Apartment'}</option>
				<option value="rodinna-izba">{$language === 'sk' ? 'Rodinná izba' : 'Family Room'}</option>
			</select>

			<label for="dospeli">{$language === 'sk' ? 'Počet dospelých' : 'Number of adults'}</label>
			<input type="number" id="dospeli" name="dospeli" min="1" max="15" value="1" />

			<div class="form-group">
				<div>
					<label for="deti-do-6"
						>{$language === 'sk' ? 'Deti do 6 rokov' : 'Children under 6'}</label
					>
					<input type="number" id="deti-do-6" name="deti-do-6" min="0" max="15" value="0" />
				</div>

				<div>
					<label for="deti-6-plus"
						>{$language === 'sk' ? 'Deti od 6 rokov a viac' : 'Children 6 and older'}</label
					>
					<input type="number" id="deti-6-plus" name="deti-6-plus" min="0" max="15" value="0" />
				</div>
			</div>

			<div class="form-group">
				<div>
					<label for="prichod">{$language === 'sk' ? 'Dátum príchodu' : 'Arrival Date'}</label>
					<input type="date" id="prichod" name="prichod" required />
				</div>
				<div>
					<label for="odchod">{$language === 'sk' ? 'Dátum odchodu' : 'Departure Date'}</label>
					<input type="date" id="odchod" name="odchod" required />
				</div>
			</div>

			<label for="ulica">{$language === 'sk' ? 'Ulica' : 'Street'}</label>
			<input type="text" id="ulica" name="ulica" required />

			<div class="form-group">
				<div>
					<label for="mesto">{$language === 'sk' ? 'Mesto' : 'City'}</label>
					<input type="text" id="mesto" name="mesto" required />
				</div>

				<div>
					<label for="krajina">{$language === 'sk' ? 'Krajina' : 'Country'}</label>
					<input type="text" id="krajina" name="krajina" required />
				</div>
			</div>

			<label for="poznamka">{$language === 'sk' ? 'Poznámka' : 'Note'}</label>
			<textarea id="poznamka" name="poznamka" rows="4"></textarea>

			<label>
				<input type="checkbox" id="suhlas" name="suhlas" required />
				{$language === 'sk'
					? 'V zmysle Zákona č. 122/2013 Z.z. o ochrane osobných údajov v znení neskorších predpisov súhlasím so správou, spracovaním a uchovaním osobných údajov.'
					: 'In accordance with Act No. 122/2013 Coll. on the Protection of Personal Data as amended, I agree to the management, processing, and storage of personal data.'}
			</label>

			<label>
				<input type="checkbox" id="ponuky" name="ponuky" />
				{$language === 'sk'
					? 'Súhlasím so zasielaním ponúk na môj e-mail.'
					: 'I agree to receive offers via e-mail.'}
			</label>

			{#if formStatus}
				<p class="form-status my-4 text-center" in:fly={{ y: 20, duration: 300 }}>
					{formStatus}
				</p>
			{/if}

			<button type="submit">{$language === 'sk' ? 'Odoslať' : 'Submit'}</button>
		</form>
	</div>
</section>

<style>
	/* Hero */

	.hero {
		display: grid;
		grid-template-columns: 50% 1fr;
		grid-template-rows: 1fr;
	}

	.hero-content {
		height: 100vh;
		position: sticky;
		top: 0;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto 1fr;
		background: url('/media/background.webp') no-repeat center center;
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
		font-size: max(5vw, 3rem);
		font-weight: 400;
		letter-spacing: -0.1rem;
		line-height: 110%;
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

	/* Form */
	.hero-form {
		display: flex;
		justify-content: center;
		padding: 6.5rem 2rem 1rem 2rem;
		background: var(--primary);
		overflow-y: auto;
	}

	.hero-form * {
		color: var(--tertiary);
	}

	.hero-form form {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.hero-form label {
		margin-bottom: 0.5rem;
	}

	.hero-form input,
	select,
	textarea,
	button {
		margin-bottom: 1rem;
		padding: 0.5rem;
		border: 1px solid var(--tertiary-border);
		border-radius: 4px;
		transition:
			border 0.15s ease-in-out,
			background-color 0.15s ease-in-out,
			color 0.15s ease-in-out;
	}

	.hero-form input[type='checkbox'] {
		width: auto;
		margin-right: 0.5rem;
		margin-bottom: 0;
	}

	.hero-form input:hover,
	select:hover,
	textarea:hover,
	button:hover {
		border: 1px solid var(--tertiary);
	}

	.hero-form input:focus,
	select:focus,
	textarea:focus {
		border: 1px solid var(--tertiary);
		background-color: var(--tertiary);
		color: var(--primary);
		outline: none;
	}

	.hero-form button {
		cursor: pointer;
		transition: background-color 0.15s ease-in-out;
	}

	.hero-form button:hover {
		background-color: var(--tertiary);
		color: var(--primary);
	}

	.hero-form .form-group {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}

	.hero-form .form-group div {
		display: flex;
		flex-direction: column;
	}

	/* Responsive design */
	@media (max-width: 1000px) {
		/* Hero Section */
		.hero {
			height: max-content;
			grid-template-columns: 1fr;
			grid-template-rows: 50% 1fr;
		}

		.hero-content {
			position: static;
			height: auto;
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

		.hero-form {
			padding: 1rem;
		}

		.hero-form .form-group {
			grid-template-columns: 1fr;
			gap: 0;
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
	}
</style>
