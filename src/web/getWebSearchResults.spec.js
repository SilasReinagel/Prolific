import { getWebSearchResults } from './getWebSearchResults';

describe('getWebSearchResults', () => {
  it('should fetch search results for the query "Who is Paul Graham?"', async () => {
    const results = await getWebSearchResults("Who is Paul Graham?");
    console.log({ results })
    expect(results.data).toBeDefined();
    expect(results.data.results).toBeDefined();
    expect(results.data.results.length).toBeGreaterThan(0);
    expect(results.data.results.some(result => result.title.includes("Paul Graham"))).toBeTruthy();
  });
});
