import { Component, Host, h, Prop, State, FunctionalComponent, Element, Method } from '@stencil/core';
import { PhoneticType } from '../../enums/PhoneticType';
import { HanziType } from '../../enums/HanziType';
import * as OpenCC from 'opencc-js';
import pinyin from 'pinyin';
import Phonetic from '../../phonetics/Phonetic';
import { version } from '../../../package.json';

@Component({
	tag: 'material-beautify-chinese-study',
	styleUrl: 'styles/beautify-chinese-study.css',
	shadow: true,
})
export class MaterialBeautifyChineseStudy {
	/**
	 * Recognized hanzi typoes: 'simplified' | 'traditional'
	 */
	@Prop()
	public primaryHanziType: string = 'simplified';
	/**
	 *	Recognized card types: `recognition` | `sentence` | `tones` | `writing` | `audio` | `secondary-sentence` | `secondary-recognition`
	 */
	@Prop()
	public cardType: string = 'recognition';
	/**
	 * Recognized card orientations: `question` | `answer`
	 */
	@Prop()
	public cardOrientation: string = 'question';
	/**
	 * All characters allowed
	 */
	@Prop()
	public primaryCharacter: string;
	/**
	 * All characters allowed
	 */
	@Prop()
	public primaryCharacterSentence: string;
	/**
	 * All characters allowed
	 */
	@Prop()
	public secondaryCharacter: string;
	/**
	 * All characters allowed
	 */
	@Prop()
	public secondaryCharacterSentence: string;
	/**
	 * All English language words allowed
	 */
	@Prop()
	public meaning: string;
	/**
	 * All English language words allowed
	 */
	@Prop()
	public sentenceMeaning: string;
	/**
	 * Most forms of numbered pinyin allowed
	 */
	@Prop()
	public numberedPinyin: string;
	/**
	 * Most forms of numbered pinyin allowed
	 */
	@Prop()
	public sentenceNumberedPinyin: string;
	/**
	 * Recognized phonics: `pinyin` | `zhuyin`
	 */
	@Prop()
	public preferredPhonic: string = 'pinyin';
	/**
	 * Option to always generate secondary character values and phonic values
	 */
	@Prop()
	public forceAutoGeneration: boolean = false;
	/**
	 * Recognized phonic orientations: `over` | `next-to`
	 */
	@Prop()
	public phonicOrientation: string = 'next-to';
	/**
	 * If AI generated insights are wanted a gemini API key must be provided
	 */
	@Prop()
	public geminiApiKey: string = process.env.GOOGLE_API_KEY || '';

	@State()
	public phonic: Array<string> = [];
	@State()
	public sentencePhonic: Array<string> = [];
	@State()
	public generatedTraditional: string = '';
	@State()
	public generatedTraditionalSentence: string = '';

	private conversionConfig: object = { from: 'cn', to: 'tw' };

	@Element()
	private element: HTMLElement;

	private template: HTMLElement;
	private phonetic: Phonetic = new Phonetic();

	@Method()
	public async getVersion(): Promise<string> {
		return version;
	}

	private isEmptyStringBlankStringNullOrUndefined = (value: String): boolean => value === null || value === undefined || value === '' || value.trim().length == 0;

	/**
	 * Normalizes the `cardOrientation` prop.
	 */
	private getCardOrientation(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.cardOrientation)) {
			return this.cardOrientation.toLowerCase().trim();
		}
		return '';
	}

	private getPrimaryCharacter(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.primaryCharacter)) {
			return this.primaryCharacter.trim();
		}
		return '';
	}

	private getPrimaryCharacterSentence(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.primaryCharacterSentence)) {
			return this.primaryCharacterSentence.trim();
		}
		return '';
	}

	private getSecondaryCharacter(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.secondaryCharacter) && !this.forceAutoGeneration) {
			return this.secondaryCharacter.trim();
		}

		const converter = OpenCC.Converter(this.getConversionConfig());
		return converter(this.getPrimaryCharacter());
	}

	private getSecondaryCharacterSentence(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.secondaryCharacterSentence) && !this.forceAutoGeneration) {
			return this.secondaryCharacterSentence.trim();
		}

		const converter = OpenCC.Converter(this.getConversionConfig());
		return converter(this.getPrimaryCharacterSentence());
	}

	private getMeaning(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.meaning)) {
			return this.meaning.trim();
		}
		return '';
	}

	private getSentenceMeaning(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.sentenceMeaning)) {
			return this.sentenceMeaning.trim();
		}
		return '';
	}

	/**
	 * Generates numbered pinyin for the primary character string.
	 *
	 * @param this.primaryCharacter string The source hanzi to romanize.
	 */
	private getNumberedPinyin(): Array<string> {
		return pinyin(this.getPrimaryCharacter(), {
			style: pinyin.STYLE_TONE2,
		}).flat();
	}

	/**
	 * Generates numbered pinyin for the sentence, ensuring a trailing neutral tone when needed.
	 *
	 * @param this.primaryCharacterSentence string The sentence hanzi to romanize.
	 */
	private getSentenceNumberedPinyin(): Array<string> {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.sentenceNumberedPinyin)) {
			return [];
		}

		const isLetter: RegExp = /[A-Za-z]/g;
		const regExIsLetter: RegExp = new RegExp(isLetter.source);

		return pinyin(this.getPrimaryCharacterSentence(), { style: pinyin.STYLE_TONE2 }).map((x: Array<string>) => {
			// Append '5' if the last char is a letter
			if (regExIsLetter.test(x[0].slice(-1))) {
				x[0] += '5';
			}
			return x[0]; // Extract the string, so final result is string[]
		});
	}

	private getPreferredPhonic(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.preferredPhonic)) {
			return this.preferredPhonic.trim();
		}
		return '';
	}

	/**
	 * Converts numbered pinyin into accented pinyin.
	 *
	 * @param value Array<string> The numbered pinyin split into characters.
	 */
	private getPinyin(value: Array<string>): Array<string> {
		return this.phonetic.create(PhoneticType.PINYIN, value);
	}

	/**
	 * Converts numbered pinyin into zhuyin.
	 *
	 * @param value Array<string> The numbered pinyin split into characters.
	 */
	private getZhuyin(value: Array<string>): Array<string> {
		return this.phonetic.create(PhoneticType.ZHUYIN, value);
	}

	/**
	 * Routes conversion to the preferred phonetic system.
	 *
	 * @param value Array<string> The numbered pinyin split into characters.
	 */
	private getPhonic(value: Array<string>): Array<string> {
		if (this.getPreferredPhonic() === 'pinyin') {
			return this.getPinyin(value);
		}
		if (this.getPreferredPhonic() === 'zhuyin') {
			return this.getZhuyin(value);
		}
		return [];
	}

	private getHanziType(): HanziType {
		let hanziType: HanziType;
		switch (this.primaryHanziType.trim().toLowerCase()) {
			case 'traditional':
				hanziType = HanziType.TRADITIONAL;
				break;
			case 'simplified':
			default:
				hanziType = HanziType.SIMPLIFIED;
				break;
		}
		return hanziType;
	}

	private getConversionConfig(): object {
		if (this.getHanziType() === HanziType.TRADITIONAL) {
			this.conversionConfig = { from: 'tw', to: 'cn' };
		}
		return this.conversionConfig;
	}

	private createCard(): HTMLElement {
		const template: HTMLElement = (
			<div id="anki-background">
				<material-beautify-card
					class={this.cardType}
					orientation={this.getCardOrientation()}
					primary-vocab={this.getPrimaryCharacter()}
					secondary-vocab={this.getSecondaryCharacter()}
					vocab-phonic={this.phonic.join(',')}
					sentence={this.getPrimaryCharacterSentence()}
					secondary-sentence={this.getSecondaryCharacterSentence()}
					sentence-phonic={this.sentencePhonic.join(',')}
					type={this.cardType}
					meaning={this.getMeaning()}
					sentence-meaning={this.getSentenceMeaning()}
					primary-hanzi-type={this.primaryHanziType.trim().toLowerCase()}
					phonic-orientation={this.phonicOrientation}
					gemini-api-key={this.geminiApiKey}
				/>
			</div>
		);
		return template;
	}

	/**
	 * Called every time the component is connected to the DOM.
	 */
	public connectedCallback(): void {
		this.phonic = this.getPhonic(this.getNumberedPinyin());
		this.sentencePhonic = this.getPhonic(this.getSentenceNumberedPinyin());
		this.generatedTraditional = this.getSecondaryCharacter();
		this.generatedTraditionalSentence = this.getSecondaryCharacterSentence();
		this.template = this.createCard();
	}

	public render(): FunctionalComponent {
		return <Host>{this.template}</Host>;
	}

	public componentDidUpdate() {
		let card = this.element.shadowRoot.querySelector('material-beautify-card');
		card.setAttribute('orientation', this.getCardOrientation());
	}
}
