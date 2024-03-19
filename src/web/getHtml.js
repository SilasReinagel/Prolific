import axios from 'axios';

/**
 * Fetches the HTML content of a webpage given its URL.
 * 
 * @param {string} url - The URL of the webpage to fetch.
 * @returns {Promise<string>} The HTML content of the webpage.
 */
async function getHtml(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching HTML from the page:', error);
    throw error;
  }
}

export default getHtml;
