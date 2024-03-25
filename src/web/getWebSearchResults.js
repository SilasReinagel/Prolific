// @ts-check
import axios from 'axios';

const serperConfig = {
  baseUrl: "https://google.serper.dev/search",
  apiKey: process.env.SERPER_API_KEY
}

/**
 * Fetches web search results for a given query and returns an array of organic search results.
 * 
 * @param {string} query - The search query.
 * @returns {Promise<Array<{title: string, link: string, snippet: string}>>} An array of objects, each representing an organic search result with a title, link, and snippet.
 */
export const getWebSearchResults = async (query) => {
  const req = {
    method: 'post',
    url: serperConfig.baseUrl,
    headers: { 
      'X-API-KEY': serperConfig.apiKey, 
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({ q: query })
  };

  return await axios(req)
    .then(response => response.data.organic);
}

export default getWebSearchResults;
