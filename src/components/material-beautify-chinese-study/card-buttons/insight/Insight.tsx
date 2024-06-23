import { h, Component, Prop } from '@stencil/core';
import { JSXBase, Listen } from '@stencil/core/internal';
// import { GoogleGenerativeAI } from '@google/generative-ai';

@Component({
	tag: 'material-beautify-insight',
	styleUrl: '../../styles/card-insight.css',
	shadow: true,
})
export class CardInsight {
	@Prop()
	public contentForInsight: string;

	private _content: JSXBase.HTMLAttributes<HTMLDivElement>;

	protected getContent() {
		return this._content;
	}

	protected setContent() {
		this._content = <div onTouchStart={() => {}}>insight</div>;
	}

	@Listen('click')
	protected handleClick() {
		console.log('clicked!');
		// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
		// const model = genAI.getGenerativeModel({
		// 	model: 'gemini-1.5-flash',
		// 	systemInstruction:
		// 		'You are a Mandarin tutor. Give answers as concisely as possible. Do not provide phonics for characters or explanations of punctuation marks. Render the response as an html table so it can be viewed on a webpage in a modern, minimalist manner.',
		// });
		// const prompt = 'Give a literal translation for each major word in this sentence - provide parts of speech if necessary: ' + this.sentence;
		// const contentResult = await model.generateContent(prompt);
		// const response = await contentResult.response;
		// console.log(response.text());
	}

	render() {
		this.setContent();
		return this.getContent();
	}
}
