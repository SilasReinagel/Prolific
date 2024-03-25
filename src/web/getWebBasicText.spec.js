import fetchAndExtractText from './getWebBasicText';

describe('getWebBasicText', () => {
  it('should fetch the webpage content and extract the text', async () => {    
    const text = await fetchAndExtractText('https://www.yegor256.com/2024/02/06/research-flow.html');

    expect(text).toContain("Say, you are a student, and I’m your teacher. Your task is to conduct an experiment or a study and then write a research paper about it. You can do it on your own and then present me with the results in the end. Sometimes it may work, but most probably it won’t. I will have many comments, suggestions, and plain simple disagreements with your research questions, results, or conclusions.");
  });

  it('search wikipedia', async () => {
    const text = await fetchAndExtractText('https://en.wikipedia.org/wiki/Internal_combustion_engine')

    expect(text).toContain("An internal combustion engine (ICE or IC engine) is a heat engine in which the combustion of a fuel occurs with an oxidizer (usually air) in a combustion chamber that is an integral part of the working fluid flow circuit. In an internal combustion engine, the expansion of the high-temperature and high-pressure gases produced by combustion applies direct force to some component of the engine. The force is typically applied to pistons (piston engine), turbine blades (gas turbine), a rotor (Wankel engine), or a nozzle (jet engine). This force moves the component over a distance, transforming chemical energy into kinetic energy which is used to propel, move or power whatever the engine is attached to.")
  })
});


