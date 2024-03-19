import fetchAndExtractText from './getWebBasicText';

describe('getWebBasicText', () => {
  it('should fetch the webpage content and extract the text', async () => {    
    const text = await fetchAndExtractText('https://www.yegor256.com/2024/02/06/research-flow.html');

    expect(text).toContain("Say, you are a student, and I’m your teacher. Your task is to conduct an experiment or a study and then write a research paper about it. You can do it on your own and then present me with the results in the end. Sometimes it may work, but most probably it won’t. I will have many comments, suggestions, and plain simple disagreements with your research questions, results, or conclusions.");
  });
});
