import { newE2EPage } from '@stencil/core/testing';

describe('material-beautify-chinese-study', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<material-beautify-chinese-study></material-beautify-chinese-study>');

    const element = await page.find('material-beautify-chinese-study');
    expect(element).toHaveClass('hydrated');
  });
});
