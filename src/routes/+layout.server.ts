import { client } from '../../tina/__generated__/client';

export async function load() {
	const pagesResponse = await client.queries.pagesConnection();

	return {
		pages: pagesResponse.data.pagesConnection.edges || []
	};
}
