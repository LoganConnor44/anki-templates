import { newSpecPage } from '@stencil/core/testing';
import { MaterialBeautifyChineseStudy } from '../beautify-chinese-study';

describe('material-beautify-chinese-study', () => {
	it('should render', async () => {
		const page = await newSpecPage({
			components: [MaterialBeautifyChineseStudy],
			html: `<material-beautify-chinese-study primary-character='天气'
						meaning='weather' />`,
		});
		expect(page.root).toEqualHtml(`
			<material-beautify-chinese-study primary-character='天气' meaning='weather'>
				<mock:shadow-root>
				<div id="anki-background">
					<material-beautify-card class="recognition"
					meaning="weather"
					orientation="question"
					phonic-orientation="next-to"
					primary-hanzi-type="simplified"
					primary-vocab="天气"
					secondary-sentence=""
					secondary-vocab="天氣"
					sentence=""
					sentence-meaning=""
					sentence-phonic=""
					type="recognition"
					vocab-phonic="tiān,qì"></material-beautify-card>
				</div>
				</mock:shadow-root>
			</material-beautify-chinese-study>
    	`);
	});

	it('should set the provided attributes', async () => {
		const page = await newSpecPage({
			components: [MaterialBeautifyChineseStudy],
			html: `<material-beautify-chinese-study primary-character='刻苦'
						meaning='hardworking' />`,
		});

		const beautifyChineseStudy = page.root;
		const primaryCharacter = beautifyChineseStudy.getAttribute('primary-character');
		const meaning = beautifyChineseStudy.getAttribute('meaning');

		expect(primaryCharacter).toEqual('刻苦');
		expect(meaning).toEqual('hardworking');
	});
});
