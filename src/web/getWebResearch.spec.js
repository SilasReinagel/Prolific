import { getWebResearch } from './getWebResearch.js';

describe('getWebResearch', () => {
  it('should fetch research data based on a query', async () => {
    const query = 'how the internal combustion engine works?';
    const webResearch = await getWebResearch(query);
    console.log({ data: JSON.stringify(webResearch, null, 2) })

    expect(webResearch).toBeDefined();
    expect(webResearch.results).toBeDefined();
    expect(webResearch.results.length).toBeGreaterThan(0);
  });
});
