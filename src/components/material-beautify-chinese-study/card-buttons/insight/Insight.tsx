import { h, Component, Prop, Element } from '@stencil/core';
import { JSXBase, Listen } from '@stencil/core/internal';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
	@Prop()
	public geminiApiKey: string;

	private _content: JSXBase.HTMLAttributes<HTMLDivElement>;

	/**
	 * Registers CSS custom property used by the animated gradient border.
	 */
	componentDidLoad() {
		try {
			window.CSS.registerProperty({
				name: '--gradient-angle',
				syntax: '<angle>',
				inherits: false,
				initialValue: '0deg',
			});
		} catch (error) {}
	}

	protected getContent() {
		return this._content;
	}

	protected setContent() {
		this._content = (
			<div id="insight-container" class="tappable" onTouchStart={() => {}}>
				<div id="insight-content">
					<p id="button-text">insight</p>
				</div>
			</div>
		);
	}

	/**
	 * Handles toggling the insight UI and fetching AI-generated results.
	 */
	@Listen('click')
	protected async handleClick() {
		const insightContent: HTMLDivElement = this.element.shadowRoot.querySelector('#insight-content');
		const hasGenerativeContent = (collection: HTMLCollection): boolean => {
			return Array.from(collection)
				.map((child: Element) => {
					if (child.tagName === 'P') {
						return false;
					}
					return true;
				})
				.find(x => x);
		};
		if (hasGenerativeContent(insightContent.children)) {
			while (insightContent.firstChild) {
				insightContent.removeChild(insightContent.firstChild);
			}
			let button: HTMLElement = document.createElement('p');
			button.id = 'button-text';
			button.innerText = 'insight';
			insightContent.appendChild(button);
			return;
		}

		const classes: string = insightContent.className;
		if (!classes.includes('loading')) {
			insightContent.className += 'loading';
		}

		const beautifyResults = document.createElement('material-beautify-ai-results');
		const genAI = new GoogleGenerativeAI(this.geminiApiKey);
		const model = genAI.getGenerativeModel({
			model: 'gemini-1.5-flash',
			systemInstruction:
				'You are a Mandarin tutor. Give answers as concisely as possible. Do not provide phonics for characters or explanations of punctuation marks. Render the response as an html table so it can be viewed on a webpage in a modern, minimalist manner. Return results to me as a stringed json with this specification `interface TableRow {term: string; translation: string; partOfSpeech: string; } type TableData = TableRow[];`.',
		});
		const prompt = 'Give a literal translation for each major word in this sentence - provide parts of speech if necessary: ' + this.contentForInsight;
		const contentResult = await model.generateContent(prompt);
		const response = await contentResult.response;
		insightContent.innerHTML = '';
		const cleanedStringedJson: string = response.text().replace(/```json\n([\s\S]*?)\n```/g, '$1');
		const results = JSON.parse(cleanedStringedJson);
		// setTimeout(() => {
		// 	const results = [
		// 		{ term: '她说', translation: 'She said', partOfSpeech: 'verb phrase' },
		// 		{ term: '现在', translation: 'now', partOfSpeech: 'adverb' },
		// 		{ term: '世界', translation: 'world', partOfSpeech: 'noun' },
		// 		{ term: '和平', translation: 'peace', partOfSpeech: 'noun' },
		// 		{ term: '了', translation: 'indicates completion', partOfSpeech: 'particle' },
		// 		{ term: '武术', translation: 'martial arts', partOfSpeech: 'noun' },
		// 		{ term: '没用', translation: 'useless', partOfSpeech: 'adjective' },
		// 		{ term: '应该', translation: 'should', partOfSpeech: 'modal verb' },
		// 		{ term: '刻苦', translation: 'diligently', partOfSpeech: 'adverb' },
		// 		{ term: '读书', translation: 'study', partOfSpeech: 'verb' },
		// 		{ term: '才对', translation: "that's right", partOfSpeech: 'phrase' },
		// 	];
		// }, 2000);
		beautifyResults.generatedContent = JSON.stringify(results);
		insightContent.appendChild(beautifyResults);

		insightContent.className = insightContent.className.replace('loading', 'unload');
	}

	render() {
		this.setContent();
		return this.getContent();
	}
}
