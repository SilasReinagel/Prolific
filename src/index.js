// @ts-check
import { getMissingEnvironmentVariables } from "./config.js";
import { app } from "./app.js";
import { program } from 'commander';
import fs from 'fs';
import { logError, logInfo, setLogLevel } from "./core/log.js";

const topicToFilename = (topic) => {
  return topic
    .replaceAll(' ', '_')
    .replaceAll('\\', '_')
    .replaceAll('/', '-')
    .toLowerCase()
}

const main = () => {
  setLogLevel(3) // Info

  const missingEnvironmentVariables = getMissingEnvironmentVariables();
  if (missingEnvironmentVariables.length > 0) {
    console.error(`Error: The following environment variables are not set: ${missingEnvironmentVariables.join(", ")}`);
    process.exit(1);
  }

  program
    .option('-c, --cmd <cmd>', 'command')
    .option('-b, --blog <blog>', 'blog topic')
    .option('-t, --topic <topic>', 'research topic')
    .option('-o, --output <output>', 'output file name')
    .option('-wfp, --writingFilePath <writingFilePath>', 'author writing style template path')
    .option('-sfp, --structureFilePath <structureFilePath>', 'article structure template path')
    .option('-h, --help', 'help')
    .parse(process.argv);

  const options = program.opts();

  if (options.cmd === "research") {
    const topicPrompt = options.topic
    const outputFileName = options.output ?? `./_output/${topicPrompt.replace(' ', '_').toLowerCase()}_knowledge.json`
    if (!topicPrompt) {
      console.log('topic is required');
      return;
    }
    app.getTopicKnowledge(topicPrompt)
      .then(topicKnowledge => {
        fs.writeFileSync(outputFileName, JSON.stringify(topicKnowledge, null, 2));
        logInfo(`Wrote Topic Research to ${outputFileName}`)
      })
      .catch(err => {
        logError(err)
      })
  } else if (options.cmd == 'firstDraft') {
    const blogTopic = options.blog
    const researchTopic = options.topic ?? blogTopic
    const researchOutputFileName = `./_output/knowledge/${topicToFilename(researchTopic)}_knowledge.json`
    const outputFileName = options.output ?? `./_output/blogs/${topicToFilename(blogTopic)}_first_draft.md`
    const writingFilePath = options.writingFilePath
    const structureFilePath = options.structureFilePath
    if (!blogTopic || !researchTopic || !writingFilePath || !structureFilePath) {
      console.log('blog and research topic are required');
      return;
    }

    const styleTemplate = fs.readFileSync(writingFilePath, 'utf8')
    const structureTemplate = fs.readFileSync(structureFilePath, 'utf8')
    if (!styleTemplate || !structureTemplate) {
      console.log('writing and structure templates are required');
      return;
    }
    
    app.writeFirstDraft({ blogTopic, researchTopic, styleTemplate, structureTemplate, knowledgeOutputFileName: researchOutputFileName })
      .then(blogPost => {
        fs.writeFileSync(outputFileName, blogPost);
        logInfo(`Wrote first draft to ${outputFileName}`);
      })
      .catch(err => {
        logError(err)
      })
  } else if (options.cmd == 'help') {
    program.help();
  } else {
    console.log('Invalid command. Use --help to see the list of available commands.');
    program.help();
  }
}

main()
