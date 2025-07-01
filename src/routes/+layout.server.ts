import { client } from '../../tina/__generated__/client';

export async function load() {
	const pagesResponse = await client.queries.pagesConnection();
	const pages = pagesResponse.data.pagesConnection.edges;

	const menuResponse = await client.queries.menuConnection();
	const menu = menuResponse.data.menuConnection.edges;

	return {
		pages: pages,
		menu: menu,
	};
}
