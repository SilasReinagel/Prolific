// @ts-check
import axios from 'axios';
import extract from 'unfluff';
import { logInfo } from '../core/log.js';

/**
 * Fetches the content of a webpage given its URL and extracts the text using unfluff.
 * 
 * @param {string} url - The URL of the webpage to fetch.
 * @returns {Promise<string>} The extracted text from the webpage.
 */
async function getWebBasicText(url) {
  logInfo(`getWebBasicText - Started for URL: ${url}`);
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    });
    const data = response.data;
    const extracted = extract(data);
    console.log({ data, extracted })
    logInfo(`getWebBasicTextfor - Succeeded for URL: ${url}`);
    return extracted.text;
  } catch (error) {
    console.error('Error fetching or extracting text from the page:', error);
    throw error;
  }
}

export default getWebBasicText;
