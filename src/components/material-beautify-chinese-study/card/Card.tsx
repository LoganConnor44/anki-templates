import { h, Prop, Component, Host } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';

@Component({
	tag: 'material-beautify-card',
	styleUrl: '../styles/card.css',
	shadow: true,
})
export class Card {
	@Prop()
	public primaryVocab: string;
	@Prop()
	public secondaryVocab: string;
	@Prop()
	public vocabPhonic: string;
	@Prop()
	public sentence: string;
	@Prop()
	public secondarySentence: string;
	@Prop()
	public sentencePhonic: string;
	@Prop()
	public type: string;
	@Prop()
	public orientation: string;
	@Prop()
	public meaning: string;
	@Prop()
	public sentenceMeaning: string;
	@Prop()
	public primaryHanziType: string;
	@Prop()
	public phonicOrientation: string;
	@Prop()
	public geminiApiKey: string;

	private _content: JSXBase.HTMLAttributes<HTMLDivElement>;

	protected getContent() {
		return this._content;
	}
	protected setContent() {
		this._content = (
			<Host>
				<material-beautify-content
					class={this.type.toLowerCase()}
					vocab={this.primaryVocab}
					secondary-vocab={this.secondaryVocab}
					phonic={this.vocabPhonic}
					sentence={this.sentence}
					secondary-sentence={this.secondarySentence}
					sentence-phonic={this.sentencePhonic}
					orientation={this.orientation}
					meaning={this.meaning}
					sentence-meaning={this.sentenceMeaning}
					type={this.type}
					phonic-orientation={this.phonicOrientation}
				/>
				<material-beautify-type class={this.type.toLowerCase()} card-type={this.type} primary-hanzi-type={this.primaryHanziType} />
				{this.geminiApiKey !== '' && this.orientation === 'answer' && <material-beautify-insight contentForInsight={this.sentence} gemini-api-key={this.geminiApiKey} />}
			</Host>
		);
	}

	public render() {
		this.setContent();
		return this.getContent();
	}
}
