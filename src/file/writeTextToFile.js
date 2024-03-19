import fs from 'fs';
import path from 'path';

/**
 * Writes text to a file, creating the directory if required.
 * 
 * @param {string} filename - The path and name of the file to write to.
 * @param {string} text - The text to write to the file.
 */
const writeTextToFile = (filename, text) => {
  const directory = path.dirname(filename);

  // Check if the directory exists, if not, create it
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  // Write the text to the file
  fs.writeFileSync(filename, text, 'utf8');
}

export default writeTextToFile;
