import fs from 'fs';
import path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const SITE_URL = 'https://hotel-saris-web.pages.dev';

function getMarkdownUrls() {
	const baseDir = path.join(process.cwd(), 'content');
	const urls = [];

	// pages → /slug
	const pagesDir = path.join(baseDir, 'pages');
	const pageFiles = fs.readdirSync(pagesDir);
	for (const file of pageFiles) {
		if (file.endsWith('.md')) {
			const slug = file.replace(/\.md$/, '');
			urls.push({ url: `/${slug}` });
		}
	}

	// homepage → /
	const homepagePath = path.join(baseDir, 'homepage', 'Homepage.md');
	if (fs.existsSync(homepagePath)) {
		urls.push({ url: `/` });
	}

	return urls;
}

async function generateSitemap() {
	const links = getMarkdownUrls();
	const stream = new SitemapStream({ hostname: SITE_URL });

	const xml = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
		data.toString()
	);

	const outputPath = path.resolve('static/sitemap.xml');
	fs.writeFileSync(outputPath, xml);

	console.log('✅ Sitemap generated at static/sitemap.xml');
}

generateSitemap().catch((err) => {
	console.error('❌ Sitemap generation failed:', err);
	process.exit(1);
});
