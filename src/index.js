// @ts-check
import { getMissingEnvironmentVariables } from "./config.js";
import { app } from "./app.js";
import { program } from 'commander';
import fs from 'fs';
import { logError, logInfo, setLogLevel } from "./core/log.js";

const main = () => {
  setLogLevel(3)

  const missingEnvironmentVariables = getMissingEnvironmentVariables();
  if (missingEnvironmentVariables.length > 0) {
    console.error(`Error: The following environment variables are not set: ${missingEnvironmentVariables.join(", ")}`);
    process.exit(1);
  }

  program
    .option('-c, --cmd <cmd>', 'command')
    .option('-t, --topic <topic>', 'research topic')
    .option('-o, --output <output>', 'output file name')
    .option('-h, --help', 'help')
    .parse(process.argv);

  const options = program.opts();

  if (options.cmd === "research") {
    const topicPrompt = options.topic
    const outputFileName = options.output ?? `./output/${topicPrompt.replace(' ', '_').toLowerCase()}_knowledge.json`
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
  } else if (options.cmd == 'help') {
    program.help();
  } else {
    console.log('Invalid command. Use --help to see the list of available commands.');
    program.help();
  }
}

main()
