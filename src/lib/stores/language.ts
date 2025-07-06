import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Language = 'sk' | 'en';

function createLanguageStore() {
	// Initialize with 'sk' as default
	const { subscribe, set } = writable<Language>('sk');

	return {
		subscribe,
		set: (lang: Language) => {
			set(lang);
			if (browser) {
				localStorage.setItem('lang', lang);
			}
		},
		// Initialize the store with value from localStorage
		init: () => {
			if (browser) {
				const stored = localStorage.getItem('lang') as Language;
				if (stored && (stored === 'sk' || stored === 'en')) {
					set(stored);
				}
			}
		}
	};
}

export const language = createLanguageStore();
