// @ts-check
import axios from 'axios';
import extract from 'unfluff';

/**
 * Fetches the content of a webpage given its URL and extracts the text using unfluff.
 * 
 * @param {string} url - The URL of the webpage to fetch.
 * @returns {Promise<string>} The extracted text from the webpage.
 */
async function getWebBasicText(url) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    const extracted = extract(data);
    return extracted.text;
  } catch (error) {
    console.error('Error fetching or extracting text from the page:', error);
    throw error;
  }
}

export default getWebBasicText;
