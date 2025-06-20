import { client } from '../../../tina/__generated__/client';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const response = await client.queries.pages({
      relativePath: `${params.slug}.md`
    });
    
    return {
      page: response.data.pages
    };
  } catch {
    throw error(404, 'Page not found');
  }
}