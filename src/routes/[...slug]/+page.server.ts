import { client } from '../../../tina/__generated__/client';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const response = await client.queries.page({
      relativePath: `${params.slug}.md`
    });
    
    return {
      page: response.data.page
    };
  } catch {
    throw error(404, 'Page not found');
  }
}