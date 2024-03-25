//@ts-check
import { logInfo } from "./core/log.js";
import { getWebResearch } from "./web/getWebResearch.js";
import { writeFirstDraftAbout } from "./writing/writeFirstDraftAbout.js";
import fs from 'fs';

export const getTopicKnowledge = async (topicPrompt) => {
  const webResearch = await getWebResearch(topicPrompt);
  return webResearch;
}

export const writeFirstDraft = async ({ blogTopic, researchTopic, styleTemplate, structureTemplate, knowledgeOutputFileName }) => {
  logInfo(`Researching knowledge about '${researchTopic}' for blog post about '${blogTopic}'`);
  const researchData = await getTopicKnowledge(researchTopic);
  if (knowledgeOutputFileName) {
    fs.writeFileSync(knowledgeOutputFileName, JSON.stringify(researchData, null, 2));
  }
  logInfo(`Successfully researched knowledge about '${researchTopic}' for blog post about '${blogTopic}'`);

  const stringStyleTemplate = typeof styleTemplate === 'string' ? styleTemplate : JSON.stringify(styleTemplate);
  const stringStructureTemplate = typeof structureTemplate === 'string' ? structureTemplate : JSON.stringify(structureTemplate);
  const stringResearchData = typeof researchData === 'string' ? researchData : JSON.stringify(researchData);

  const blogRequest = ({
    topic: blogTopic,
    styleTemplate: stringStyleTemplate,
    structureTemplate: stringStructureTemplate,
    providedKnowledge: JSON.stringify(stringResearchData)
  })

  logInfo(`Writing first draft about '${blogTopic}'`);
  const resp = await writeFirstDraftAbout(blogRequest);
  logInfo(`Successfully wrote first draft about '${blogTopic}'`);
  return resp;
}

export const app = {
  getTopicKnowledge,
  writeFirstDraft,
}
