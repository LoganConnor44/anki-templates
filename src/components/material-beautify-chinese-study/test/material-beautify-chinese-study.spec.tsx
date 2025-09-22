import { newSpecPage } from '@stencil/core/testing';
import { MaterialBeautifyChineseStudy } from '../beautify-chinese-study';
import { Card } from '../card/Card';
import { CardContent } from '../card-content/CardContent';

describe('material-beautify-chinese-study', () => {
	beforeEach(() => {
		process.env.GOOGLE_API_KEY = '';
	});

	it('should render a recognition card with expected attributes', async () => {
    const page = await newSpecPage({
            components: [MaterialBeautifyChineseStudy, Card, CardContent],
			html: `<material-beautify-chinese-study primary-character='天气'
						meaning='weather'
						primary-character-sentence='今天天气很好。'
						sentence-meaning='The weather today is good.' />`,
		});
		await page.waitForChanges();

    const card = page.root.shadowRoot.querySelector('material-beautify-card') as any;
		expect(card).not.toBeNull();
		expect(card.getAttribute('class')).toBe('recognition');
    expect(card.orientation).toBe('question');
		expect(card.getAttribute('primary-vocab')).toBe('天气');
		expect(card.getAttribute('sentence-meaning')).toBe('The weather today is good.');
		expect(card.getAttribute('sentence-phonic')).toContain('jīn');
		expect(card.getAttribute('sentence-phonic')).toContain('hǎo');
		expect(card.hasAttribute('gemini-api-key')).toBe(false);
	});

	it('should set the top level attributes', async () => {
    const page = await newSpecPage({
            components: [MaterialBeautifyChineseStudy, Card, CardContent],
			html: `<material-beautify-chinese-study primary-character='天气'
					meaning='weather'
					primary-character-sentence='今天天气很好。'
					sentence-meaning='The weather today is good.' />`,
		});
		await page.waitForChanges();

		const beautifyChineseStudy = page.root;

		const primaryCharacter = beautifyChineseStudy.getAttribute('primary-character');
		const meaning = beautifyChineseStudy.getAttribute('meaning');
		const sentence = beautifyChineseStudy.getAttribute('primary-character-sentence');

		expect(primaryCharacter).toEqual('天气');
		expect(meaning).toEqual('weather');
		expect(sentence).toEqual('今天天气很好。');
	});

	it('converts provided sentence numbered pinyin when auto generation is disabled', async () => {
		const page = await newSpecPage({
			components: [MaterialBeautifyChineseStudy],
			html: `<material-beautify-chinese-study
				card-type="sentence"
				primary-character='你好'
				primary-character-sentence='你好'
				preferred-phonic='pinyin'
				sentence-numbered-pinyin='ni3 hao3'
			/>`,
		});
		await page.waitForChanges();

		const instance = page.rootInstance as MaterialBeautifyChineseStudy;
		const sentencePhonicState = instance.sentencePhonic.join(',');

		expect(sentencePhonicState).toContain('nǐ');
		expect(sentencePhonicState).toContain('hǎo');
	});

	it('ignores provided sentence numbered pinyin when force auto generation is enabled', async () => {
		const page = await newSpecPage({
			components: [MaterialBeautifyChineseStudy],
			html: `<material-beautify-chinese-study
				card-type="sentence"
				primary-character='你好'
				primary-character-sentence='你好'
				preferred-phonic='pinyin'
				sentence-numbered-pinyin='la1'
			/>`,
		});
		await page.waitForChanges();

		let instance = page.rootInstance as MaterialBeautifyChineseStudy;
		let sentencePhonicState = instance.sentencePhonic.join(',');
		expect(sentencePhonicState).toContain('lā');

		page.root.setAttribute('force-auto-generation', 'true');
		await page.waitForChanges();

		instance = page.rootInstance as MaterialBeautifyChineseStudy;
		sentencePhonicState = instance.sentencePhonic.join(',');

		expect(sentencePhonicState).not.toContain('lā');
		expect(sentencePhonicState).toContain('nǐ');
		expect(sentencePhonicState).toContain('hǎo');
	});

	it('generates zhuyin when preferred phonic is zhuyin', async () => {
		const page = await newSpecPage({
			components: [MaterialBeautifyChineseStudy],
			html: `<material-beautify-chinese-study
				card-type="recognition"
				primary-character='你好'
				numbered-pinyin='ni3 hao3'
				preferred-phonic='zhuyin'
			/>`,
		});
		await page.waitForChanges();

		const instance = page.rootInstance as MaterialBeautifyChineseStudy;
		const vocabPhonic = instance.phonic.join(',');

		expect(vocabPhonic).toContain('ㄋㄧˇ');
		expect(vocabPhonic).toContain('ㄏㄠˇ');
	});


	it('produces tone card with both vocab and sentence phonics', async () => {
		const page = await newSpecPage({
			components: [MaterialBeautifyChineseStudy],
			html: `<material-beautify-chinese-study
				card-type="tones"
				primary-character='你好'
				primary-character-sentence='你好'
				sentence-meaning='Hello.'
			/>`,
		});
		await page.waitForChanges();

		const instance = page.rootInstance as MaterialBeautifyChineseStudy;
		expect(instance.phonic.length).toBeGreaterThan(0);
		expect(instance.sentencePhonic.length).toBeGreaterThan(0);

    const card = page.root.shadowRoot.querySelector('material-beautify-card');
    expect(card).not.toBeNull();
    expect(card.getAttribute('class')).toBe('tones');
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
