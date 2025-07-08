import matter from 'gray-matter';
import fs from 'fs';

export async function load() {
	const navMenuFile = fs.readFileSync('content/menu/NavMenu.md', 'utf-8');
	const navMenu = matter(navMenuFile).data.links;
	const socialMenuFile = fs.readFileSync('content/menu/SocialMenu.md', 'utf-8');
	const socialMenu = matter(socialMenuFile).data.links;

	return {
		navMenu: navMenu,
		socialMenu: socialMenu
	};
}
