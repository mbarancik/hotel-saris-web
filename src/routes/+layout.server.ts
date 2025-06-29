import { client } from '../../tina/__generated__/client';

export async function load() {
	const pagesResponse = await client.queries.pagesConnection();

	const pages = pagesResponse.data.pagesConnection.edges;
	const pagesObj: { [key: string]: typeof pages } = {};

	if (pages && pages.length > 0) {
		for (const page of pages) {
			if (page?.node?.category !== null && page?.node?.category !== '') {
				const category = page?.node?.category;
				if (category) {
					pagesObj[category] = pagesObj[category] || [];
					pagesObj[category].push(page);
				}
			} else {
				pagesObj['uncategorized'] = pagesObj['uncategorized'] || [];
				pagesObj['uncategorized'].push(page);
			}
		}
	}

	return {
		pages: pagesObj,
	};
}
