// @ts-check
import { getCompletionMessageContent } from "../llm/openai.js"
import { coreStylePrompt } from "./coreStylePrompt.js"

const prompt = `
  Given the blog post: [BLOG POST], analyze and extract the following key aspects.

  ${coreStylePrompt}
  
  Summarize each of these aspects concisely, providing insights into how 
  they contribute to the overall effectiveness and uniqueness of the blog post's writing.
`

export const extractStyle = async (blogText) => {
  const messages = [{
    role: 'system',
    content: 'You are an expert writing analyst with a background as an English professor.',
    name: 'writing_analyst'
  },
  {
    role: 'user',
    content: prompt.replace('[BLOG POST]', blogText),
    name: 'writer'
  }]

  const styleTemplate = await getCompletionMessageContent(messages)
  return styleTemplate
}

export default extractStyle;
