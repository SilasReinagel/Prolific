import { extractStyle } from './extractStyle';

describe('extractStyle', () => {
  it('should extract the tone from a blog post', async () => {
    const blogText = "This is a very optimistic blog post that aims to uplift the reader's spirit.";
    
    const styleTemplate = await extractStyle(blogText);
    
    expect(styleTemplate).toContain("optimistic");
    expect(styleTemplate).toContain("uplift");
  }, 90000);
});
