import { h, Component, Prop, Element } from '@stencil/core';
import { JSXBase, Listen } from '@stencil/core/internal';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GenerativeResults } from '../../card-table/GenerativeResults';

@Component({
	tag: 'material-beautify-insight',
	styleUrl: '../../styles/card-insight.scss',
	shadow: true,
})
export class CardInsight {
	@Element()
	private element: Element;
	@Prop()
	public contentForInsight: string = '';

	private _content: JSXBase.HTMLAttributes<HTMLDivElement>;

	componentDidLoad() {
		window.CSS.registerProperty({
			name: '--gradient-angle',
			syntax: '<angle>',
			inherits: false,
			initialValue: '0deg',
		});
	}

	protected getContent() {
		return this._content;
	}

	protected setContent() {
		this._content = (
			<div id="insight-container" onTouchStart={() => {}}>
				<div id="insight-content">
					<p id="button-text">insight</p>
				</div>
			</div>
		);
	}

	@Listen('click')
	protected async handleClick() {
		console.log('clicked!');
		const insightContent: HTMLDivElement = this.element.shadowRoot.querySelector('#insight-content');
		const classes: string = insightContent.className;
		if (!classes.includes('loading')) {
			insightContent.className += 'loading';
		}
		setTimeout(() => {
			const results = [
				{ term: '她说', translation: 'She said', partOfSpeech: 'verb phrase' },
				{ term: '现在', translation: 'now', partOfSpeech: 'adverb' },
				{ term: '世界', translation: 'world', partOfSpeech: 'noun' },
				{ term: '和平', translation: 'peace', partOfSpeech: 'noun' },
				{ term: '了', translation: 'indicates completion', partOfSpeech: 'particle' },
				{ term: '武术', translation: 'martial arts', partOfSpeech: 'noun' },
				{ term: '没用', translation: 'useless', partOfSpeech: 'adjective' },
				{ term: '应该', translation: 'should', partOfSpeech: 'modal verb' },
				{ term: '刻苦', translation: 'diligently', partOfSpeech: 'adverb' },
				{ term: '读书', translation: 'study', partOfSpeech: 'verb' },
				{ term: '才对', translation: "that's right", partOfSpeech: 'phrase' },
			];
			insightContent.innerHTML = '';

			const beautifyResults = document.createElement('material-beautify-ai-results');
			beautifyResults.generatedContent = JSON.stringify(results);
			insightContent.appendChild(beautifyResults);

			insightContent.className = insightContent.className.replace('loading', '');
		}, 2000);
	}
	// if (this.contentForInsight === '') {
	// 	return;
	// }

	// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
	// const model = genAI.getGenerativeModel({
	// 	model: 'gemini-1.5-flash',
	// 	systemInstruction:
	// 		'You are a Mandarin tutor. Give answers as concisely as possible. Do not provide phonics for characters or explanations of punctuation marks. Render the response as an html table so it can be viewed on a webpage in a modern, minimalist manner. Return results to me as a stringed json with this specification `interface TableRow {term: string; translation: string; partOfSpeech: string; } type TableData = TableRow[];`.',
	// });
	// const prompt = 'Give a literal translation for each major word in this sentence - provide parts of speech if necessary: ' + this.contentForInsight;
	// const contentResult = await model.generateContent(prompt);
	// const response = await contentResult.response;
	// const cleanedStringedJson: string = response.text().replace(/```json\n([\s\S]*?)\n```/g, '$1');
	// console.log(JSON.parse(cleanedStringedJson));

	render() {
		this.setContent();
		return this.getContent();
	}
}
