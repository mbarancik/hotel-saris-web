import { client } from '../../tina/__generated__/client';

export async function load() {
  const pagesResponse = await client.queries.pageConnection();
  
  return {
    pages: pagesResponse.data.pageConnection.edges || []
  };
}