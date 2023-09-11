import { newSpecPage } from '@stencil/core/testing';
import { MaterialBeautifyChineseStudy } from '../beautify-chinese-study';

describe('material-beautify-chinese-study', () => {
	it('should render', async () => {
		const page = await newSpecPage({
			components: [MaterialBeautifyChineseStudy],
			html: `<material-beautify-chinese-study primary-character='天气'
						meaning='weather'
						primary-character-sentence='今天天气很好。'
						sentence-meaning='The weather today is good.' />`,
		});
		expect(page.root).toEqualHtml(`
			<material-beautify-chinese-study primary-character='天气'
				meaning='weather'
				primary-character-sentence='今天天气很好。'
				sentence-meaning='The weather today is good.'>
				<mock:shadow-root>
					<div id="anki-background">
						<material-beautify-card class="recognition"
						meaning="weather"
						orientation="question"
						phonic-orientation="next-to"
						primary-hanzi-type="simplified"
						primary-vocab="天气"
						secondary-sentence="今天天氣很好。"
						secondary-vocab="天氣"
						sentence="今天天气很好。"
						sentence-meaning="The weather today is good."
						sentence-phonic="jīn,tiān,tiān,qì,hěn,hǎo,"
						type="recognition"
						vocab-phonic="tiān,qì"></material-beautify-card>
					</div>
				</mock:shadow-root>
			</material-beautify-chinese-study>
    	`);
	});

	it('should set the top level attributes', async () => {
		const page = await newSpecPage({
			components: [MaterialBeautifyChineseStudy],
			html: `<material-beautify-chinese-study primary-character='天气'
					meaning='weather'
					primary-character-sentence='今天天气很好。'
					sentence-meaning='The weather today is good.' />`,
		});

		const beautifyChineseStudy = page.root;

		const primaryCharacter = beautifyChineseStudy.getAttribute('primary-character');
		const meaning = beautifyChineseStudy.getAttribute('meaning');
		const sentence = beautifyChineseStudy.getAttribute('primary-character-sentence');

		expect(primaryCharacter).toEqual('天气');
		expect(meaning).toEqual('weather');
		expect(sentence).toEqual('今天天气很好。');
	});

	// it('should set the lower level attributes', async () => {
	// 	const page = await newSpecPage({
	// 		components: [MaterialBeautifyChineseStudy],
	// 		html: `<material-beautify-chinese-study primary-character='天气'
	// 				meaning='weather'
	// 				primary-character-sentence='今天天气很好。'
	// 				sentence-meaning='The weather today is good.' />`,
	// 	});

	// 	const beautifyCard = page.root.querySelector('material-beautify-card');

	// 	const secondaryCharacter = beautifyCard.getAttribute('secondary-character');
	// 	const secondarySentence = beautifyCard.getAttribute('secondary-sentence');

	// 	expect(secondaryCharacter).toEqual('天氣');
	// 	expect(secondarySentence).toEqual('今天天氣很好。');
	// });
});
