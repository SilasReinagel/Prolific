//@ts-check
import { getWebResearch } from "./web/getWebResearch.js";

export const getTopicKnowledge = async (topicPrompt) => {
  const webResearch = await getWebResearch(topicPrompt);
  return webResearch;
}

export const app = {
  getTopicKnowledge
}
