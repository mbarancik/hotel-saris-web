<script lang="ts">
	import { onMount } from 'svelte';
	import 'svelte/transition';
	let { imgUrl, close } = $props();

	onMount(() => {
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				close();
			}
		});
	});
</script>

<div class="backdrop">
	<button class="close-button" onclick={close}>
		<span class="material-symbols-outlined">close</span>
	</button>
	<img src={imgUrl} alt="" />
</div>

<style>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		backdrop-filter: blur(5px);
	}

	.backdrop img {
		max-width: 90%;
		max-height: 90%;
		object-fit: contain;
	}

	.close-button {
		position: absolute;
		top: 0;
		right: 0;
		margin: 1rem;
		background: var(--tertiary);
		color: var(--secondary);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		border-radius: 50%;
		transition: background-color 0.15s ease;
	}

	.close-button:hover {
		background-color: var(--tertiary-semi);
	}
</style>
