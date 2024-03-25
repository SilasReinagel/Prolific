import { getWebTop5Knowledge } from './web/getWebTop5Knowledge.js';
import { promises as fs } from 'fs';

async function main() {
  const query = 'how does a comustion engine work?';
  const top5Knowledge = await getWebTop5Knowledge(query);
  const outputPath = './output/combustion_knowledge.json';

  async function writeKnowledgeToFile(knowledge, path) {
    try {
      await fs.writeFile(path, JSON.stringify(knowledge, null, 2));
      console.log(`Knowledge written successfully to ${path}`);
    } catch (error) {
      console.error('Error writing knowledge to file:', error);
    }
  }

  writeKnowledgeToFile(top5Knowledge, outputPath);
}

main();


