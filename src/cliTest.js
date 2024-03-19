// @ts-check
import fs from 'fs/promises';
import path from 'path';
import { mergeStyles } from './extraction/mergeStyle.js';
import getWebBasicText from './web/getWebBasicText.js';
import writeTextToFile from './file/writeTextToFile.js';
import extractStyle from './extraction/extractStyle.js';
import { setLogLevel } from './core/log.js';

const baseUrl = "https://www.silasreinagel.com"
const relativeUrls = [
  "/blog/ai/claude3/cursor/llm/2024/03/18/ai-using-claude-3-with-cursor/",
  "/blog/ai/llama2/llm/2024/03/14/ai-how-to-run-llama-2-locally/",
  "/blog/information-systems/system%20design/agents/business%20intelligence/2024/03/08/next-level-information-systems/",
  "/blog/ai/structured-data/prompt-engineering/2024/02/14/ai-structured-data/",
  "/blog/2022/09/02/dont-wear-too-many-hats/",
  "/blog/2022/08/16/the-cushy-job-of-an-engineering-leader/",
  "/blog/2022/05/25/best-idea-in-agile/",
  "/blog/2022/05/19/high-performance-threejs-page-load/",
  "/blog/2022/05/04/career-keystone-communication/",
  "/blog/2022/03/23/career-keystone-people/",
  "/blog/2022/02/28/career-keystone-value/",
  "/blog/2022/01/14/no-invisible-work/",
  "/blog/2022/01/12/ai-design-picking-pruning-and-shaping/",
  "/blog/2021/06/29/how-to-assign-tasks/",
  "/blog/2021/06/17/4-levels-of-customer-service/",
  "/blog/2021/05/13/microtasking-for-hyper-productivity-and-happiness/",
  "/blog/2021/03/25/customizing-your-gumroad-product-buy-button/",
  "/blog/2021/02/18/perfect-estimates-every-time/",
  "/blog/2021/01/14/summits-vs-action-squads/",
  "/blog/2020/09/18/software-at-scale-constraints-copy/",
  "/blog/2020/07/21/reactive-game-state-unity/",
  "/blog/2020/06/26/software-development-principle-of-flow/",
  "/blog/2020/05/04/game-jamming-with-a-large-team/",
  "/blog/2020/03/24/lean-software-process/",
  "/blog/2020/02/26/traits-of-great-team-players/",
  "/blog/2020/01/06/three-hour-workday/",
  "/blog/2019/10/24/text-value-colocation/",
  "/blog/2019/09/03/compose-your-software/",
  "/blog/2019/08/12/how-slack-harms-projects/",
  "/blog/2019/07/08/internal-tickets-create-misery/",
  "/blog/2019/06/24/never-use-reference-constants/",
  "/blog/2019/05/28/open-source-project-essentials/",
  "/blog/2019/05/13/dont-define-done/",
  "/blog/2019/04/08/consequences-of-project-success/",
  "/blog/2019/03/18/reactive-advantages-one-integration/",
  "/blog/2019/02/04/messaging-conceptual-fundamentals/",
  "/blog/2018/12/10/elegant-event-triggers/",
  "/blog/2018/11/12/using-orms-and-dtos-elegantly/",
  "/blog/2018/10/30/indirection-is-not-abstraction/",
  "/blog/2018/10/15/elegant-ab-tests/",
  "/blog/2018/09/10/test-failures-are-critical-bugs/",
  "/blog/2018/08/31/factory-objects/",
  "/blog/2018/08/13/supersonic-project-velocity/",
  "/blog/2018/07/23/static-dependency-access/",
  "/blog/2018/07/02/you-must-not-admit-a-single-null/",
  "/blog/2018/06/18/result-vs-exception/",
  "/blog/2018/05/21/who-makes-the-decision/",
  "/blog/2018/05/01/introducing-lite-mediator/",
  "/blog/2018/04/24/marker-interfaces-are-evil/",
  "/blog/2018/02/27/your-configs-are-totally-wrong/",
  "/blog/2017/11/27/eight-projects-you-shouldnt-tdd/",
  "/blog/2017/07/18/put-the-logic-with-the-data/",
  "/blog/2017/06/27/cut-out-the-middleman/",
  "/blog/2017/05/30/autonomous-objects/",
  "/blog/2017/05/09/make-your-interfaces-abstract/",
  "/blog/2017/04/04/virtues-of-a-great-microservice/",
  "/blog/2017/03/28/keep-your-asp-net-controllers-code-free/",
  "/blog/2017/03/21/independently-executable-units/",
  "/blog/2017/03/07/making-a-concrete-behavior-reusable/",
  "/blog/2017/02/28/your-code-is-terrible/",
  "/blog/2017/02/21/make-your-interfaces-small/",
  "/blog/2017/02/07/never-ever-return-null/",
  "/blog/2017/01/31/implementing-serization-using-aop/",
  "/blog/2017/01/10/make-it-small/",
  "/blog/2016/12/06/using-lambdas-to-simplify-exception-handling/",
  "/blog/2016/12/03/how-good-is-your-continuous-delivery/",
  "/blog/2016/11/19/never-get-it-done/",
  "/blog/2016/11/15/the-seven-aspects-of-software-quality/",
  "/blog/2016/11/10/delete-your-old-resume/",
  "/blog/2016/10/26/the-new-rule-of-new-internal-objects/",
  "/blog/2016/10/17/type-erasure-is-a-failed-experiment-part-2/",
  "/blog/2016/10/11/type-erasure-is-a-failed-experiment-part-1/",
  "/blog/2016/10/04/collaborate-with-your-computer/",
  "/blog/2016/09/26/build-horizontally-not-vertically/",
  "/blog/2016/09/17/the-practical-value-of-tdd/"
]

async function extractSilasReinagelStyles() {
  try {
    const texts = await Promise.all(relativeUrls.map(url => getWebBasicText(`${baseUrl}${url}`)));
    texts.forEach((text, index) => {
      const name = relativeUrls[index].split('/').filter(Boolean).pop(); // Extracts the name from the URL
      writeTextToFile(`./extracted/silasreinagel/blogtext/${name}.txt`, text);
    });

    const styles = await Promise.all(texts.map(text => extractStyle(text)));
    styles.forEach((style, index) => {
      const name = relativeUrls[index].split('/').filter(Boolean).pop(); // Extracts the name from the URL
           writeTextToFile(`./extracted/silasreinagel/style/${name}.txt`, style);
    });

  } catch (error) {
    console.error('Error extracting styles:', error);
  }
}

async function readStylesFromDirectory(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath);
    const styles = await Promise.all(files.map(file => 
      fs.readFile(path.join(directoryPath, file), { encoding: 'utf8' })
    ));
    return styles;
  } catch (error) {
    console.error('Error reading styles from directory:', error);
    return [];
  }
}

async function generateMergedStyleTemplate() {
  setLogLevel(3);
  const stylesDirectoryPath = './extracted/silasreinagel/style';
  const styles = await readStylesFromDirectory(stylesDirectoryPath);
  const mergedStyle = await mergeStyles(styles);
  await fs.writeFile('./extracted/silasreinagel/styleTemplate.txt', mergedStyle);
  console.log('Style template generated successfully.');
}

async function fullExtract() {
  await extractSilasReinagelStyles();
  await generateMergedStyleTemplate();
}

fullExtract().then(() => console.log('Done')).catch((error) => console.error('Error:', error));
