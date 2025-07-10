<script lang="ts">
	import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';

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
      .querySelectorAll(
        '.vertical-l, .horizontal-l, .hero-content-inner, .text-inner, .gallery'
      )
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
</script>

<section class="hero">
	<div class="hero-content">
		<div>
			<div class="vertical-l"></div>
			<div class="horizontal-l"></div>
		</div>

		<div class="hero-content-inner">
      <h1>
        {page.status}
      </h1>
			<h2 class="text-2xl">
				{page.status === 404
					? "Stránka nebola nájdená"
					: "Niečo sa pokazilo"}
			</h2>
		</div>

		<div>
			<div class="horizontal-l"></div>
			<div class="vertical-l"></div>
		</div>
	</div>
</section>

<style>
  .hero {
		height: 100vh;
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
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

  .hero-content-inner h2 {
    font-size: 1.5rem;
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
</style>