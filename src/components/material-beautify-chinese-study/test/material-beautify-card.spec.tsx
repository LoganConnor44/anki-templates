import { newSpecPage } from '@stencil/core/testing';
import { Card } from '../card/Card';

describe('material-beautify-chinese-study', () => {
	it('should render', async () => {
		const page = await newSpecPage({
			components: [Card],
			html: `<material-beautify-card type="recognition"
                    primary-vocab="刻苦"
                    secondary-vocab="刻苦"
                    vocab-phonic="ㄎㄜˋ,ㄎㄨˇ"
                    secondary-sentence="她說現在世界和平了，武術沒用了，應該刻苦讀書才對！"
                    sentence-phonic="ㄊㄚ,ㄕㄨㄛ,ㄒㄧㄢˋ,ㄗㄞˋ,ㄕˋ,ㄐㄧㄝˋ,ㄏㄜˊ,ㄆㄧㄥˊ,ㄌㄜ˙,,ㄨˇ,ㄕㄨˋ,ㄇㄟˊ,ㄩㄥˋ,ㄌㄜ˙,,ㄧㄥˋ,ㄍㄞ,ㄎㄜˋ,ㄎㄨˇ,ㄉㄨˊ,ㄕㄨ,ㄘㄞˊ,ㄉㄨㄟˋ,"
                    sentence-meaning="She says that now the world is peaceful and there's no use for martial arts, that we be hardworking students."
                    primary-hanzi-type="simplified"
                    phonic-orientation="next-to"
                    orientation="question" />`,
		});
		expect(page.root).toEqualHtml(`
            <material-beautify-card type="recognition"
                primary-vocab="刻苦"
                secondary-vocab="刻苦"
                vocab-phonic="ㄎㄜˋ,ㄎㄨˇ"
                secondary-sentence="她說現在世界和平了，武術沒用了，應該刻苦讀書才對！"
                sentence-phonic="ㄊㄚ,ㄕㄨㄛ,ㄒㄧㄢˋ,ㄗㄞˋ,ㄕˋ,ㄐㄧㄝˋ,ㄏㄜˊ,ㄆㄧㄥˊ,ㄌㄜ˙,,ㄨˇ,ㄕㄨˋ,ㄇㄟˊ,ㄩㄥˋ,ㄌㄜ˙,,ㄧㄥˋ,ㄍㄞ,ㄎㄜˋ,ㄎㄨˇ,ㄉㄨˊ,ㄕㄨ,ㄘㄞˊ,ㄉㄨㄟˋ,"
                sentence-meaning="She says that now the world is peaceful and there's no use for martial arts, that we be hardworking students."
                primary-hanzi-type="simplified"
                phonic-orientation="next-to"
                orientation="question">
				<mock:shadow-root>
                    <material-beautify-content class="recognition"
                        vocab="刻苦"
                        secondary-vocab="刻苦"
                        phonic="ㄎㄜˋ,ㄎㄨˇ"
                        secondary-sentence="她說現在世界和平了，武術沒用了，應該刻苦讀書才對！"
                        sentence-meaning="She says that now the world is peaceful and there's no use for martial arts, that we be hardworking students."
                        sentence-phonic="ㄊㄚ,ㄕㄨㄛ,ㄒㄧㄢˋ,ㄗㄞˋ,ㄕˋ,ㄐㄧㄝˋ,ㄏㄜˊ,ㄆㄧㄥˊ,ㄌㄜ˙,,ㄨˇ,ㄕㄨˋ,ㄇㄟˊ,ㄩㄥˋ,ㄌㄜ˙,,ㄧㄥˋ,ㄍㄞ,ㄎㄜˋ,ㄎㄨˇ,ㄉㄨˊ,ㄕㄨ,ㄘㄞˊ,ㄉㄨㄟˋ,"
                        phonic-orientation="next-to"
                        type="recognition"
                        orientation="question"></material-beautify-content>
                    <material-beautify-type class="recognition"
                        card-type="recognition"
                        primary-hanzi-type="simplified"></material-beautify-type>
                </mock:shadow-root>
			</material-beautify-card>
    	`);
	});

	// it('should set the top level attributes', async () => {
	// 	const page = await newSpecPage({
	// 		components: [MaterialBeautifyChineseStudy],
	// 		html: `<material-beautify-chinese-study primary-character='天气'
	// 				meaning='weather'
	// 				primary-character-sentence='今天天气很好。'
	// 				sentence-meaning='The weather today is good.' />`,
	// 	});

	// 	const beautifyChineseStudy = page.root;

	// 	const primaryCharacter = beautifyChineseStudy.getAttribute('primary-character');
	// 	const meaning = beautifyChineseStudy.getAttribute('meaning');
	// 	const sentence = beautifyChineseStudy.getAttribute('primary-character-sentence');

	// 	expect(primaryCharacter).toEqual('天气');
	// 	expect(meaning).toEqual('weather');
	// 	expect(sentence).toEqual('今天天气很好。');
	// });

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
