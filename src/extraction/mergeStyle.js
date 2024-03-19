// @ts-check
import { logInfo } from "../core/log.js";
import { getCompletionMessageContent } from "../llm/openai.js"
import { coreStylePrompt } from "./coreStylePrompt.js";

const prompt = `
  Here are several style analyses extracted from one body of work. Collapse them all into one shared summary. 
  
  Focus on the most common and the most distinctive elements and includes both of those types in your final summary.

  The final summary shall have the same five sections that the input summaries have.

  ${coreStylePrompt}
`

const createMessages = (styles) => {
  const systemMessage = {
    role: 'system',
    content: 'You are an expert writing analyst with a background as an English professor.',
    name: 'writing_analyst'
  };

  const userMessage = {
    role: 'user',
    content: styles.map(style => `${prompt}\n---\n${style}`).join('\n'),
    name: 'writer'
  };

  return [systemMessage, userMessage];
}

async function mergeInBatchesOfFive(styles) {
  if (styles.length <= 5) {
    const messages = createMessages(styles);
    return [await getCompletionMessageContent(messages)];
  }

  const chunkedStyles = [];
  for (let i = 0; i < styles.length; i += 5) {
    chunkedStyles.push(styles.slice(i, i + 5));
  }

  const mergedStylesPromises = chunkedStyles.map(async (chunk) => {
    const messages = createMessages(chunk);
    return await getCompletionMessageContent(messages);
  });

  const mergedStyles = await Promise.all(mergedStylesPromises);
  return mergeInBatchesOfFive(mergedStyles);
}

export const mergeStyles = async (styles) => {
  const totalRounds = Math.ceil(Math.log(styles.length) / Math.log(5));
  logInfo(`Merging ${styles.length} styles. Total rounds needed to merge styles: ${totalRounds}`);
  const mergedStyles = await mergeInBatchesOfFive(styles);
  return mergedStyles[0]
}
