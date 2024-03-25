// @ts-check
import getWebSearchResults from './getWebSearchResults.js';
import getWebBasicText from './getWebBasicText.js';

/**
 * Fetches the top 5 search results for a given query and enriches them with the page text.
 * 
 * @param {string} query - The search query.
 * @returns {Promise<Array>} An array of the top 5 search results enriched with page text.
 */
export async function getWebTop5Knowledge(query) {
  try {
    const searchResults = await getWebSearchResults(query);
    const resultsQueue = [...searchResults];
    const enrichedResults = [];
    while (resultsQueue.length > 0 && enrichedResults.length < 5) {
      const result = resultsQueue.shift();
      if (!result) {
        continue;
      }
      try {
        const pageText = await getWebBasicText(result.link);
        enrichedResults.push({ ...result, pageText });
      } catch (error) {
        console.error(`Error fetching or extracting text from the page: ${result.link}`, error);
      }
    }
    return enrichedResults;
  } catch (error) {
    console.error('Error fetching top 5 search results:', error);
    throw error;
  }
}

export default getWebTop5Knowledge;
