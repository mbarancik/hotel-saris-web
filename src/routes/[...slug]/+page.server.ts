import { error } from '@sveltejs/kit';
import matter from 'gray-matter';
import fs from 'fs';

export async function load({ params }) {
	try {
		const pageFile = fs.readFileSync(`content/pages/${params.slug}.md`, 'utf-8');
		const { data } = matter(pageFile);

		return {
			page: data
		};
	} catch {
		throw error(404, 'Page not found');
	}
}
