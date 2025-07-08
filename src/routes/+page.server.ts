import { error } from '@sveltejs/kit';
import matter from "gray-matter";
import fs from 'fs';

export async function load() {
	try {
		const pageFile = fs.readFileSync(`content/homepage/Homepage.md`, 'utf-8');
		const { data } = matter(pageFile);

		return {
			homepage: data
		};
	} catch {
		throw error(404, 'Page not found');
	}
}
