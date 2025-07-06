import { client } from '../../tina/__generated__/client';
import { error } from '@sveltejs/kit';

export async function load() {
  try {
    const response = await client.queries.homepageConnection();
	  const homepage = response.data.homepageConnection.edges?.[0]?.node;

    console.log(homepage)

    return {
      homepage: homepage
    };
  } catch {
    throw error(404, 'Page not found');
  }
}
