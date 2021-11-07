import { newSpecPage } from '@stencil/core/testing';
import { MaterialBeautifyChineseStudy } from '../beautify-chinese-study';

describe('material-beautify-chinese-study', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MaterialBeautifyChineseStudy],
      html: `<material-beautify-chinese-study></material-beautify-chinese-study>`,
    });
    expect(page.root).toEqualHtml(`
      <material-beautify-chinese-study>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </material-beautify-chinese-study>
    `);
  });
});
