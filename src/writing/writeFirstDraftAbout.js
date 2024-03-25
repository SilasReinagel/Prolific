// @ts-check
import { getCompletionMessageContent } from "../llm/openai.js";

const promptTemplate = `Write a blog about [TOPIC] using the provided [STYLE_TEMPLATE] and [STRUCTURE_TEMPLATE] and [PROVIDED_KNOWLEDGE]. 

TOPIC=\`{TOPIC}\`
STYLE_TEMPLATE=\`{STYLE_TEMPLATE}\`
STRUCTURE_TEMPLATE=\`{STRUCTURE_TEMPLATE}\`
PROVIDED_KNOWLEDGE=\`{PROVIDED_KNOWLEDGE}\`
`

export const writeFirstDraftAbout = async ({ topic, styleTemplate, structureTemplate, providedKnowledge }) => {
  const prompt = promptTemplate
    .replace("{TOPIC}", topic)
    .replace("{STYLE_TEMPLATE}", styleTemplate)
    .replace("{STRUCTURE_TEMPLATE}", structureTemplate)
    .replace("{PROVIDED_KNOWLEDGE}", providedKnowledge);

  return await getCompletionMessageContent([
    { role: "system", content: "You are a skilled blog ghostwriter with deep knowledge about every subject." },
    { role: "user", content: prompt },
  ]);
};
