<script>
  // export let data;
</script>

<!-- <div class="pages">
  {#each data.pages as page}
    {#if page && page.node}
      <article>
        <h2><a href="/{page.node._sys.relativePath.slice(0, -3)}">{page.node.title}</a></h2>
      </article>
    {/if}
  {/each}
</div> -->

<section class="hero">
  <div class="content">
    <div>
      <div class="vertical-l"></div>
      <div class="horizontal-l"></div>
    </div>

    <div class="content-inner">
      <h1>
        Hotel v centre historického Bardejova
      </h1>
    </div>

    <div class="horizontal-l"></div>

    <div class="content-inner content-btns">
      <button>
        <span class="material-symbols-outlined">
          calendar_month
        </span>
        Rezervovať
      </button>
      <button>
        <span class="material-symbols-outlined">
          restaurant
        </span>
        Denné menu
      </button>
    </div>
    
    <div>
      <div class="horizontal-l"></div>
      <div class="vertical-l"></div>
    </div>
  </div>

  <img src="media/saris3.jpg" alt="">
</section>

<section class="bg">
  <div class="spacer">
    <div class="vertical-l"></div>
    <div class="horizontal-l"></div>
  </div>

  <article>
    <img src="media/pexels-evonics-1058277.jpg" alt="">
    <div>
      <h1>O hoteli</h1>
      <p>
        Hotel Saris sa nachádza v centre historického mesta Bardejov, ktoré je zapísané na zozname svetového kultúrneho dedičstva UNESCO. Hotel ponúka komfortné ubytovanie, reštauráciu s tradičnou slovenskou kuchyňou a moderné konferenčné priestory.
      </p>
    </div>
  </article>

  <div class="horizontal-l"></div>

  <article>
    <div>
      <h1>Ubytovanie</h1>
      <p>
        Hotel Saris ponúka rôzne typy izieb, od štandardných jedno- a dvojlôžkových izieb až po luxusné apartmány. Všetky izby sú vybavené moderným nábytkom, Wi-Fi pripojením a TV.
      </p>
    </div>
    <img src="media/saris4.jpg" alt="">
  </article>

  <div class="horizontal-l"></div>

  <article>
    <img src="media/saris zenich nevesta.jpg" alt="">
    <div>
      <h1>Gastronómia</h1>
      <p>
        Reštaurácia hotela Saris ponúka široký výber jedál z tradičnej slovenskej kuchyne, ako aj medzinárodné špeciality. Hostia si môžu vychutnať jedlo v príjemnom prostredí s výhľadom na historické centrum mesta.
      </p>
    </div>
  </article>

  <div class="horizontal-l"></div>

  <article>
    <div>
      <h1>Aktivity</h1>
      <p>
        V blízkosti hotela sa nachádzajú rôzne turistické a cyklistické trasy, ako aj historické pamiatky. Hostia môžu navštíviť Bardejovské kúpele, ktoré sú známe svojimi liečivými prameňmi.
      </p>
    </div>
    <img src="media/pexels-evonics-1058277.jpg" alt="">
  </article>

  <div class="spacer">
    <div class="horizontal-l"></div>
    <div class="vertical-l"></div>
  </div>
</section>

<style>
  /* Hero */

  .hero {
    height: 95vh;
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

  .hero .content {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto auto auto 1fr;
    background: url("/background.jpg") no-repeat center center;
    background-size: cover;
    z-index: 10;
  }

  .hero .content-inner {
    margin: 0 3rem;
    padding: 2rem;
    border-left: 1px solid var(--tertiary-border);
    border-right: 1px solid var(--tertiary-border);
  }

  .hero .content-inner h1 {
    font-family: "Gloock", serif;
    color: var(--tertiary);
    font-size: 6rem;
    font-weight: 400;
    letter-spacing: -0.15rem;
    line-height: 7rem;
  }

  .hero .vertical-l {
    height: 100%;
    margin: 0 3rem;
    border-left: 1px solid var(--tertiary-border);
    border-right: 1px solid var(--tertiary-border);
  }

  .horizontal-l {
    height: 1px;
    width: 100%;
    background-color: var(--tertiary-border);
  }

  .hero .content-btns {
    display: flex;
    gap: 2rem;
    justify-content: flex-end;
  }

  button {
    padding: 0.5rem 1rem;
    color: var(--tertiary);
    font-size: 1.2rem;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    position: relative;

		background:
			radial-gradient(circle 0.5rem at top    left ,#0000 98%,var(--secondary)  ) top    left,
			radial-gradient(circle 0.5rem at top    right,#0000 98%,var(--secondary) ) top    right,
			radial-gradient(circle 0.5rem at bottom left ,#0000 98%,var(--secondary)) bottom left,
			radial-gradient(circle 0.5rem at bottom right,#0000 98%,var(--secondary)) bottom right;
		background-size:51% 51%;
		background-repeat:no-repeat;
  }

  button:hover {
    color: var(--secondary);

    background:
			radial-gradient(circle 0.5rem at top    left ,#0000 98%,var(--tertiary)  ) top    left,
			radial-gradient(circle 0.5rem at top    right,#0000 98%,var(--tertiary) ) top    right,
			radial-gradient(circle 0.5rem at bottom left ,#0000 98%,var(--tertiary)) bottom left,
			radial-gradient(circle 0.5rem at bottom right,#0000 98%,var(--tertiary)) bottom right;
    background-size:51% 51%;
		background-repeat:no-repeat;
  }

	button::before {
		content: '';
		position: absolute;
		height: calc(100% + 2px);
		width: calc(100% + 2px);

		background:
			radial-gradient(circle 0.5rem at top    left ,#0000 98%,var(--tertiary-semi)  ) top    left,
			radial-gradient(circle 0.5rem at top    right,#0000 98%,var(--tertiary-semi) ) top    right,
			radial-gradient(circle 0.5rem at bottom left ,#0000 98%,var(--tertiary-semi)) bottom left,
			radial-gradient(circle 0.5rem at bottom right,#0000 98%,var(--tertiary-semi)) bottom right;
		background-size:51% 51%;
		background-repeat:no-repeat;

		z-index: -1;

		filter: drop-shadow(0 0.2rem 0.3rem #202020aa);
	}

  /* Articles */

  .bg {
    background-color: var(--secondary);
  }

  .spacer {
    height: 20vh;
  }

  .vertical-l {
    height: 100%;
    border-left: 1px solid var(--tertiary-border);
    border-right: 1px solid var(--tertiary-border);
    max-width: 100rem;
    margin: 0 auto;
  }

  article {
    margin: 0 auto;
    color: white;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 1fr;
    max-width: 100rem;
    max-height: 70vh;
    border-left: 1px solid var(--tertiary-border);
    border-right: 1px solid var(--tertiary-border);
  }

  article > img {
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  article > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 6rem 4rem;
  }

  article h1 {
    /* color: var(--tertiary-semi); */
    font-family: "Gloock", serif;
    font-size: 6rem;
    font-weight: 800;
    letter-spacing: -0.05rem;

    background: radial-gradient(
      var(--tertiary) 0%,
      var(--tertiary-border) 60%
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  article p {
    font-size: 1.2rem;
    line-height: 2rem;
  }
</style>