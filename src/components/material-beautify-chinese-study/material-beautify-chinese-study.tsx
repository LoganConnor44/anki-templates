import { Component, Host, h, Prop, Element, State, FunctionalComponent } from '@stencil/core';
import { PhoneticType } from '../../enums/PhoneticType';
import { HanziType } from '../../enums/HanziType';
import Vowel from '../../phonetics/Vowel';
import Zhuyin from '../../phonetics/Zhuyin';
import HanziWriter from 'hanzi-writer';
import * as OpenCC from 'opencc-js';
import * as PinyinGenerator from 'pinyin';

@Component({
	tag: 'material-beautify-chinese-study',
	styleUrl: 'material-beautify-chinese-study.css',
	shadow: true,
})
export class MaterialBeautifyChineseStudy {

	/**
	 * Recognized hanzi typoes: `simplified` | `traditional`
	 */
	@Prop()
	public primaryHanziType: string = 'simplified';
	/**
	 *	Recognized card types: `recognition` | `sentence` | `tones` | `writing` | `meaning` | `audio` | `secondary-sentence` | `secondary-recognition`
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

	@State()
	public phonic: string = '';
	@State()
	public sentencePhonic: string = '';
	@State()
	public generatedTraditional: string = '';
	@State()
	public generatedTraditionalSentence: string = '';

	@Element()
	private element: HTMLElement;

	private conversionConfig: object = { from: 'cn', to: 'tw' };
	private template: HTMLElement;

	private getPrimaryHanziPrimaryElement = (): HTMLElement => this.element.shadowRoot.querySelector('#primary-hanzi-primary-element');
	private getSecondaryHanziPrimaryElement = (): HTMLElement => this.element.shadowRoot.querySelector('#secondary-hanzi-primary-element');
	private getPrimaryHanziSecondaryElement = (): HTMLElement => this.element.shadowRoot.querySelector('#primary-hanzi-secondary-element');
	private getSecondaryHanziSecondaryElement = (): HTMLElement => this.element.shadowRoot.querySelector('#secondary-hanzi-secondary-element');
	private getWordMeaningElement = (): HTMLElement => this.element.shadowRoot.querySelector('#single-word-meaning');
	private getSentenceMeaningElement = (): HTMLElement => this.element.shadowRoot.querySelector('#sentence-meaning');
	private getPhoneticElement = (): HTMLElement => this.element.shadowRoot.querySelector('#phonetic');
	private getSentencePhoneticElement = (): HTMLElement => this.element.shadowRoot.querySelector('#sentence-phonetic');
	private getPrimarySentenceElement = (): HTMLElement => this.element.shadowRoot.querySelector('#primary-hanzi-sentence');
	private getSecondarySentenceElement = (): HTMLElement => this.element.shadowRoot.querySelector('#secondary-hanzi-sentence');
	private getAudioAnimationElement = (): HTMLElement => this.element.shadowRoot.querySelector('#audio');
	private isEmptyStringBlankStringNullOrUndefined = (value: String): boolean => value === null || value === undefined || value === "" || value.trim().length == 0;

	public getCardType(): string {
		return this.cardType.toLowerCase().trim();
	}

	public getCardOrientation(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.cardOrientation)) {
			return this.cardOrientation.toLowerCase().trim();
		}
		return "";
	}

	public getPrimaryCharacter(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.primaryCharacter)) {
			return this.primaryCharacter.trim();
		}
		return "";
	}

	public getPrimaryCharacterSentence(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.primaryCharacterSentence)) {
			return this.primaryCharacterSentence.trim();
		}
		return "";
	}

	public getSecondaryCharacter(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.secondaryCharacter) && !this.forceAutoGeneration) {
			return this.secondaryCharacter.trim();
		}

		const converter = OpenCC.Converter(this.getConversionConfig());
		return converter(this.getPrimaryCharacter());
	}

	public getSecondaryCharacterSentence(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.secondaryCharacterSentence) && !this.forceAutoGeneration) {
			return this.secondaryCharacterSentence.trim();
		}

		const converter = OpenCC.Converter(this.getConversionConfig());
		return converter(this.getPrimaryCharacterSentence());
	}

	public getMeaning(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.meaning)) {
			return this.meaning.trim();
		}
		return "";
	}

	public getSentenceMeaning(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.sentenceMeaning)) {
			return this.sentenceMeaning.trim();
		}
		return "";
	}

	public getNumberedPinyin(): string {
		return PinyinGenerator.default(
			this.getPrimaryCharacter(),
			{ style: PinyinGenerator.STYLE_TONE2 }
		).join("");
	}

	public getSentenceNumberedPinyin(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.sentenceNumberedPinyin)) {
			return this.sentenceNumberedPinyin.trim();
		}
		return PinyinGenerator.default(
			this.getPrimaryCharacterSentence(),
			{ style: PinyinGenerator.STYLE_TONE2 }
		).join("");
	}

	public getPreferredPhonic(): string {
		if (!this.isEmptyStringBlankStringNullOrUndefined(this.preferredPhonic)) {
			return this.preferredPhonic.trim();
		}
		return "";
	}

	public getPinyin(value: string): string {
		return this.createPhonic(PhoneticType.PINYIN, value);
	}

	public getZhuyin(value: string): string {
		return this.createPhonic(PhoneticType.ZHUYIN, value);
	}

	public getPhonic(value: string): string {
		if (this.getPreferredPhonic() === 'pinyin') {
			return this.getPinyin(value);
		}
		if (this.getPreferredPhonic() === 'zhuyin') {
			return this.getZhuyin(value);
		}
		return "";
	}

	public getHanziType(): HanziType {
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

	public getConversionConfig(): object {
		if (this.getHanziType() === HanziType.TRADITIONAL) {
			this.conversionConfig = { from: 'tw', to: 'cn' };
		}
		return this.conversionConfig;
	}
	
	/**
	 * Sets the color scheme based on the current card type.
	 */
	private setColourSchemes (): void {
		let body: HTMLElement = this.element.shadowRoot.querySelector('#anki-background');
		let card: HTMLElement = this.element.shadowRoot.querySelector('#chinese-card');
		let cardType: HTMLElement = this.element.shadowRoot.querySelector('#chinese-card-type');
		let cardContent: HTMLElement = this.element.shadowRoot.querySelector('#chinese-card-content');
	
		switch (this.getCardType()) {
			case 'secondary-recognition':
			case 'secondary-sentence':
				var darkest = '#264653';
				var darker = '#2A9D8F';
				var neutral = '#E76F51';
				var brighter = '#F4A261';
				var brightest = '#E9C46A';
	
				body.style.backgroundColor = darker;
	
				card.style.color = darkest;
				card.style.backgroundColor = brightest;
				card.style.boxShadow = '0px 0px 30px ' + darkest;
	
				cardType.style.color = brightest;
				cardType.style.backgroundColor = neutral;
	
				cardContent.style.textShadow = '2px 2px ' + brighter;
	
				break;
	
			case 'tones':
				var darkest = '#073B4C';
				var darkestRBG = 'rgb(7, 59, 76, 0.2)';
				var darker = '#118AB2';
				var neutral = '#EF476F';
				var brighter = '#06D6A0';
				var brightest = '#FFD166';
				//var brightestRBG = 'rgb(255, 209, 102, 0.5)';
	
				body.style.backgroundColor = darker;
	
				card.style.color = darkest;
				card.style.backgroundColor = brighter;
				card.style.boxShadow = '0px 0px 30px ' + darkest;
	
				cardType.style.color = brightest;
				cardType.style.backgroundColor = neutral;
	
				cardContent.style.textShadow = '2px 2px ' + darkestRBG;
	
				break;
			
			case 'writing':
				var darkest = '#0B132B';
				var darkestRBG = 'rgb(11, 19, 43, 0.3)';
				var darker = '#1C2541';
				var neutral = '#3A506B';
				var brighter = '#5BC0BE';
				var brightest = '#6FFFE9';
	
				body.style.backgroundColor = darker;
	
				card.style.color = darker;
				card.style.backgroundColor = brightest;
				card.style.boxShadow = '0px 0px 30px ' + darkest;
	
				cardType.style.color = brighter;
				cardType.style.backgroundColor = neutral;
	
				cardContent.style.textShadow = '1.5px 1.5px ' + darkestRBG;
	
				break;

			case 'recognition':
				var darkest = '#1D3557';
				var darkestRGB = 'rgb(29, 53, 87, 0.3)'
				var darker = '#E63946';
				var neutral = '#457B9D';
				var brighter = '#A8DADC';
				var brightest = '#F1FAEE';
	
				body.style.backgroundColor = neutral;
	
				card.style.color = brighter;
				card.style.backgroundColor = darker;
				card.style.boxShadow = '0px 0px 30px ' + darkest;
	
				cardType.style.color = darkest;
				cardType.style.backgroundColor = brighter;
	
				cardContent.style.textShadow = '2px 2px ' + darkestRGB;
	
				break;

			case 'meaning':
				var darkest = '#555B6E';
				var darker = '#89B0AE';
				var neutral = '#FFD6BA';
				var brighter = '#BEE3DB';
				var brightest = '#FAF9F9';
				var brightestRGB = 'rgb(250, 249, 249, 0.5)';
	
				body.style.backgroundColor = darker;
	
				card.style.color = darkest;
				card.style.backgroundColor = neutral;
				card.style.boxShadow = '0px 0px 30px ' + darkest;
	
				cardType.style.color = brightest;
				cardType.style.backgroundColor = darkest;
	
				cardContent.style.textShadow = '2px 2px ' + brightestRGB
	
				break;

			case 'sentence':
				var black = '#000000';
				var darkest = '#3A0CA3';
				var darkestRBG = 'rgb(58, 12, 163, 0.3)';
				var darker = '#7209B7';
				var neutral = '#4361EE';
				var brighter = '#4CC9F0';
				var brightest = '#F72585';
	
				body.style.backgroundColor = darker;
	
				card.style.color = black;
				card.style.backgroundColor = brightest;
				card.style.boxShadow = '0px 0px 30px ' + darkest;
	
				cardType.style.color = brightest;
				cardType.style.backgroundColor = neutral;
	
				cardContent.style.textShadow = '2px 2px ' + darkestRBG;
		
				break;

			case 'audio':
				var black = '#000000';
				var blackRgb = 'rgb(0, 0, 0, 0.8)';
				var darkest = '#352D39';
				var darkestRBG = 'rgb(53, 45, 57, 0.3)';
				var darker = '#6D435A';
				var neutral = '#FF6978';
				var brighter = '#B1EDE8';
				var brighterRgb = 'rgb(177, 237, 232, 0.3)';
				var brightest = '#FFFCF9';
	
				body.style.backgroundColor = darkest;
	
				card.style.color = darkest;
				card.style.backgroundColor = neutral;
				card.style.boxShadow = '0px 0px 30px ' + blackRgb;
	
				cardType.style.color = brightest;
				cardType.style.backgroundColor = darker;
	
				cardContent.style.textShadow = '2px 2px ' + brighterRgb;
		
				break;
			
			default:
				break;
		}
	};

	private processTonesCardType(): void {
		let traditionalHanziPrimary: HTMLElement = this.getSecondaryHanziPrimaryElement();
		let traditionalHanziSecondary: HTMLElement = this.getSecondaryHanziSecondaryElement();
		let wordMeaning: HTMLElement = this.getWordMeaningElement();
		let simplifiedHanziSecondary: HTMLElement = this.getPrimaryHanziSecondaryElement();
		let phonetic: HTMLElement = this.getPhoneticElement();
		let sentencePhonetic: HTMLElement = this.getSentencePhoneticElement();
		let traditionalSentence: HTMLElement = this.getSecondarySentenceElement();
		let sentenceMeaning: HTMLElement = this.getSentenceMeaningElement();

		traditionalHanziPrimary.style.display = 'none';
		simplifiedHanziSecondary.style.display = 'none';
		traditionalHanziSecondary.style.display = 'none';
		wordMeaning.style.display = 'none';
		traditionalSentence.style.display = 'none';
		sentenceMeaning.style.display = 'none';

		if (this.getCardOrientation() === 'question') {
			phonetic.style.display = 'none';
			sentencePhonetic.style.display = 'none'
		}
		if (this.getCardOrientation() === 'answer') {
			phonetic.style.display = 'block';
		}
	}

	private processRecognitionCardType(): void {
		let traditionalHanziPrimary: HTMLElement = this.getSecondaryHanziPrimaryElement();
		let traditionalHanziSecondary: HTMLElement = this.getSecondaryHanziSecondaryElement();
		let wordMeaning: HTMLElement = this.getWordMeaningElement();
		let simplifiedHanziSecondary: HTMLElement = this.getPrimaryHanziSecondaryElement();
		let phonetic: HTMLElement = this.getPhoneticElement();
		let sentencePhonetic: HTMLElement = this.getSentencePhoneticElement();
		let traditionalSentence: HTMLElement = this.getSecondarySentenceElement();
		let sentenceMeaning: HTMLElement = this.getSentenceMeaningElement();

		traditionalHanziPrimary.style.display = 'none';
		simplifiedHanziSecondary.style.display = 'none';
		traditionalHanziSecondary.style.display = 'none';
		traditionalSentence.style.display = 'none';
		sentenceMeaning.style.display = 'none';

		if (this.getCardOrientation() === 'question') {
			phonetic.style.display = 'none';
			sentencePhonetic.style.display = 'none'
			wordMeaning.style.display = 'none';
		}
		if (this.getCardOrientation() === 'answer') {
			phonetic.style.display = 'block';
			wordMeaning.style.display = 'block';
		}
	}

	private processWritingCardType(): void {
		let traditionalHanziPrimary: HTMLElement = this.getSecondaryHanziPrimaryElement();
		let simplifiedHanziPrimary: HTMLElement = this.getPrimaryHanziPrimaryElement();
		let traditionalHanziSecondary: HTMLElement = this.getSecondaryHanziSecondaryElement();
		let wordMeaning: HTMLElement = this.getWordMeaningElement();
		let simplifiedHanziSecondary: HTMLElement = this.getPrimaryHanziSecondaryElement();
		let phonetic: HTMLElement = this.getPhoneticElement();
		let sentencePhonetic: HTMLElement = this.getSentencePhoneticElement();
		let traditionalSentence: HTMLElement = this.getSecondarySentenceElement();
		let sentenceMeaning: HTMLElement = this.getSentenceMeaningElement();
		let simplifiedSentence: HTMLElement = this.getPrimarySentenceElement();

		simplifiedHanziPrimary.style.display = 'none';
		traditionalHanziPrimary.style.display = 'none';
		wordMeaning.style.display = 'none';
		traditionalHanziSecondary.style.display = 'none';
		simplifiedHanziSecondary.style.display = 'none';
		simplifiedSentence.style.display = 'none';
		traditionalSentence.style.display = 'none';
		sentenceMeaning.style.display = 'none';

		if (this.getCardOrientation() === 'question') {
			phonetic.style.fontSize = 'xx-large';
		}
		if (this.getCardOrientation() === 'answer') {
			phonetic.style.display = 'none';
			sentencePhonetic.style.display = 'none';
		}
	}

	private processTraditionalCardType(): void {
		let simplifiedHanziPrimary: HTMLElement = this.getPrimaryHanziPrimaryElement();
		let traditionalHanziSecondary: HTMLElement = this.getSecondaryHanziSecondaryElement();
		let wordMeaning: HTMLElement = this.getWordMeaningElement();
		let simplifiedHanziSecondary: HTMLElement = this.getPrimaryHanziSecondaryElement();
		let phonetic: HTMLElement = this.getPhoneticElement();
		let sentencePhonetic: HTMLElement = this.getSentencePhoneticElement();
		let traditionalSentence: HTMLElement = this.getSecondarySentenceElement();
		let sentenceMeaning: HTMLElement = this.getSentenceMeaningElement();
		let simplifiedSentence: HTMLElement = this.getPrimarySentenceElement();

		const doesTradSentHaveValue: boolean = traditionalSentence.innerHTML !== '';

		if (doesTradSentHaveValue) {
			simplifiedSentence.style.display = 'none';
		}

		simplifiedHanziPrimary.style.display = 'none';
		wordMeaning.style.display = 'none';
		traditionalHanziSecondary.style.display = 'none';
		sentencePhonetic.style.display = 'none';
		
		if (this.getCardOrientation() === 'question') {
			phonetic.style.display = 'none';
			wordMeaning.style.display = 'none';
			traditionalHanziSecondary.style.display = 'none';
			simplifiedHanziSecondary.style.display = 'none';
			sentenceMeaning.style.display = 'none';
		}
		if (this.getCardOrientation() === 'answer') {
			phonetic.style.display = 'block';
			simplifiedHanziSecondary.style.display = 'block';
		}
	}

	private processTraditionalSentenceCardType(): void {
		let traditionalHanziPrimary: HTMLElement = this.getSecondaryHanziPrimaryElement();
		let simplifiedHanziPrimary: HTMLElement = this.getPrimaryHanziPrimaryElement();
		let traditionalHanziSecondary: HTMLElement = this.getSecondaryHanziSecondaryElement();
		let wordMeaning: HTMLElement = this.getWordMeaningElement();
		let sentenceMeaning: HTMLElement = this.getSentenceMeaningElement();
		let simplifiedHanziSecondary: HTMLElement = this.getPrimaryHanziSecondaryElement();
		let phonetic: HTMLElement = this.getPhoneticElement();
		let sentencePhonetic: HTMLElement = this.getSentencePhoneticElement();
		let traditionalSentence: HTMLElement = this.getSecondarySentenceElement();
		let simplifiedSentence: HTMLElement = this.getPrimarySentenceElement();

		traditionalHanziPrimary.style.display = 'none';
		simplifiedHanziPrimary.style.display = 'none';
		simplifiedHanziSecondary.style.display = 'none';
		traditionalHanziSecondary.style.display = 'none';
		traditionalSentence.style.fontSize = 'xx-large';
		simplifiedSentence.style.display = 'none';
		wordMeaning.style.display = 'none';
		phonetic.style.display = 'none';

		if (this.getCardOrientation() === 'question') {
			sentencePhonetic.style.display = 'none';
			sentenceMeaning.style.display = 'none';
		}
		if (this.getCardOrientation() === 'answer') {
			sentencePhonetic.style.display = 'block';
			sentenceMeaning.style.display = 'block';
			simplifiedSentence.style.display = 'block';
		}
	}

	private processMeaningCardType(): void {
		let traditionalHanziPrimary: HTMLElement = this.getSecondaryHanziPrimaryElement();
		let traditionalHanziSecondary: HTMLElement = this.getSecondaryHanziSecondaryElement();
		let wordMeaning: HTMLElement = this.getWordMeaningElement();
		let simplifiedHanziSecondary: HTMLElement = this.getPrimaryHanziSecondaryElement();
		let phonetic: HTMLElement = this.getPhoneticElement();
		let sentencePhonetic: HTMLElement = this.getSentencePhoneticElement();
		let traditionalSentence: HTMLElement = this.getSecondarySentenceElement();
		let sentenceMeaning: HTMLElement = this.getSentenceMeaningElement();
		
		traditionalHanziPrimary.style.display = 'none';
		simplifiedHanziSecondary.style.display = 'none';
		traditionalHanziSecondary.style.display = 'none';
		traditionalSentence.style.display = 'none';

		if (this.getCardOrientation() === 'question') {
			phonetic.style.display = 'none';
			sentencePhonetic.style.display = 'none';
			wordMeaning.style.display = 'none';
			sentenceMeaning.style.display = 'none';
		}
		if (this.getCardOrientation() === 'answer') {
			phonetic.style.display = 'block';
			wordMeaning.style.display = 'block';
		}
	}

	private processSentenceCardType(): void {
		let traditionalHanziPrimary: HTMLElement = this.getSecondaryHanziPrimaryElement();
		let simplifiedHanziPrimary: HTMLElement = this.getPrimaryHanziPrimaryElement();
		let traditionalHanziSecondary: HTMLElement = this.getSecondaryHanziSecondaryElement();
		let wordMeaning: HTMLElement = this.getWordMeaningElement();
		let sentenceMeaning: HTMLElement = this.getSentenceMeaningElement();
		let simplifiedHanziSecondary: HTMLElement = this.getPrimaryHanziSecondaryElement();
		let phonetic: HTMLElement = this.getPhoneticElement();
		let sentencePhonetic: HTMLElement = this.getSentencePhoneticElement();
		let traditionalSentence: HTMLElement = this.getSecondarySentenceElement();
		let simplifiedSentence: HTMLElement = this.getPrimarySentenceElement();

		traditionalHanziPrimary.style.display = 'none';
		simplifiedHanziPrimary.style.display = 'none';
		simplifiedHanziSecondary.style.display = 'none';
		traditionalHanziSecondary.style.display = 'none';
		traditionalSentence.style.display = 'none';
		simplifiedSentence.style.fontSize = 'xx-large';
		wordMeaning.style.display = 'none';
		phonetic.style.display = 'none';

		if (this.getCardOrientation() === 'question') {
			sentencePhonetic.style.display = 'none';
			sentenceMeaning.style.display = 'none';
		}
		if (this.getCardOrientation() === 'answer') {
			sentencePhonetic.style.display = 'block';
			sentenceMeaning.style.display = 'block';
		}
	}

	private processAudioCardType(): void {
		let traditionalHanziPrimary: HTMLElement = this.getSecondaryHanziPrimaryElement();
		let simplifiedHanziPrimary: HTMLElement = this.getPrimaryHanziPrimaryElement();
		let traditionalHanziSecondary: HTMLElement = this.getSecondaryHanziSecondaryElement();
		let wordMeaning: HTMLElement = this.getWordMeaningElement();
		let sentenceMeaning: HTMLElement = this.getSentenceMeaningElement();
		let simplifiedHanziSecondary: HTMLElement = this.getPrimaryHanziSecondaryElement();
		let phonetic: HTMLElement = this.getPhoneticElement();
		let sentencePhonetic: HTMLElement = this.getSentencePhoneticElement();
		let traditionalSentence: HTMLElement = this.getSecondarySentenceElement();
		let simplifiedSentence: HTMLElement = this.getPrimarySentenceElement();
		let audioAnimation: HTMLElement = this.getAudioAnimationElement();

		traditionalHanziPrimary.style.display = 'none';
		simplifiedHanziPrimary.style.display = 'none';
		simplifiedHanziSecondary.style.display = 'none';
		traditionalHanziSecondary.style.display = 'none';
		traditionalSentence.style.display = 'none';
		simplifiedSentence.style.display = 'none';
		wordMeaning.style.display = 'none';
		phonetic.style.display = 'none';
		sentencePhonetic.style.display = 'none';
		sentenceMeaning.style.display = 'none';

		if (this.getCardOrientation() === 'question') {
			const availableAnimations: string[] = [
				'echo-spinner',
				'audio-line-spinner'
			];
			const randomAnimation: string = availableAnimations[Math.floor(Math.random() * availableAnimations.length)];
			console.log(randomAnimation);
			if (randomAnimation === 'audio-line-spinner') {
				for (var i = 1; i <= 5; i++) {
					let rectangle = document.createElement('div');
					rectangle.classList.add('rect' + i);
					audioAnimation.appendChild(rectangle);
				}
			}
			audioAnimation.className = randomAnimation;
		}
		if (this.getCardOrientation() === 'answer') {
			sentencePhonetic.style.display = 'block';
			simplifiedSentence.style.display = 'block';
			simplifiedSentence.style.fontSize = 'x-large';
			sentenceMeaning.style.display = 'block';
		}
	}

	private processCardContentByCardType(): void {
		switch (this.getCardType()) {
			case 'secondary-recognition':
				this.processTraditionalCardType();
				break;
			case 'secondary-sentence':
				this.processTraditionalSentenceCardType();
				break;
			case 'tones':
				this.processTonesCardType();
				break;
			case 'writing':
				this.processWritingCardType();
				break;
			case 'recognition':
				this.processRecognitionCardType();
				break;
			case 'meaning':
				this.processMeaningCardType();
				break;
			case 'sentence':
				this.processSentenceCardType();
				break;
			case 'audio':
				this.processAudioCardType();
				break;
		}
	};

	private createPhonic(phonicType: PhoneticType, phonicValue: string): string {
		const isPinyin = (value: string): boolean => toBoolean(value.search(/^[a-zA-Z0-9\s]*$/));
		//const containsNumerics = (value: string): boolean => toBoolean(value.search(/\d/));
		const parseTone = (value: string): number => value === ' ' || value === '' ? 5 : parseInt(value);
		const toBoolean = (value: number): boolean => value >= 0 ? true : false;
		
		const replaceVowelWithAccentedVowel = (value: string, accentedVowel: Vowel): string => {
			const valueReversed: string = value.split('').reverse().join('');
			const valueWithAccentReversed: string = valueReversed.replace(
				accentedVowel.getVowel(),
				accentedVowel.getVowelWithTone()
			);
			return valueWithAccentReversed.split('').reverse().join('');
		};
		
		const createAppropriateVowelWithAccent = (valueArray: Array<string>, toneNumber: number): Vowel => {
			let vowels: Vowel[] = new Array<Vowel>();
			vowels[0] = new Vowel('a');
			vowels[1] = new Vowel('e');
			vowels[2] = new Vowel('i');
			vowels[3] = new Vowel('o');
			vowels[4] = new Vowel('u');
		
			let vowelToBeAccented: string = '';
			vowels.forEach(vowel => {
				valueArray.forEach((x: string) => {
					if (x === vowel.getVowel() && vowelToBeAccented === '') {
						vowelToBeAccented = vowel.getVowel();
					}
				});
			});
			const accentedVowel = new Vowel(vowelToBeAccented);
			accentedVowel.setTone(toneNumber);
			return accentedVowel;
		};
		
		const retrieveVowelsBeforeNumber = (value: string): Array<string> => {
			const vowelPattern = /([a|e|i|o|u])/i;
			const regEx = new RegExp(vowelPattern);
			const valueArrayReversed = value.split('').reverse();
			let vowelsPresent: Array<string> = new Array<string>();
			let initialConsonantsPassed: boolean = false;
			valueArrayReversed.forEach(x => {
				if (vowelsPresent.length > 0) {
					initialConsonantsPassed = true;
				}
				if (regEx.test(x) || !initialConsonantsPassed) {
					vowelsPresent.push(x);
				}
			});
			return vowelsPresent.reverse();
		};
		
		const replaceNumberWithAccentedVowel = (value: string, toneNumber: number): string => {
			const vowelsImmediatelyBeforeNumber: Array<string> = retrieveVowelsBeforeNumber(value);
			const vowelAccented: Vowel = createAppropriateVowelWithAccent(vowelsImmediatelyBeforeNumber, toneNumber);
			return replaceVowelWithAccentedVowel(value, vowelAccented);
		};
		
		/**
		 * Sets the tone for a syllable even if a light tone syllable is right up against another valid toned syllable.
		 * 
		 * @param phonic Zhuyin The new zhuyin character converted from pinyin. 
		 * @param letters string The remaining pinyin letters after the zhuyin has been created.
		 * @param tone number The extracted tone number that should only be applied to the last zhuyin.
		 */
		const setToneWithPossibleMalformedPinyinHandling = (phonic: Zhuyin, letters: string, tone: number): void => {
			if (letters === '') {
				phonic.setTone(tone);
			} else {
				phonic.setTone(5);
			}
		};
		
		const replaceNumberedRomanLettersWithZhuyin = (letters: string, tone: number): string => {
			let returnValue: string = '';
			const maxIterations = 25;
			let iterationCounter = 1;
			while (letters !== '' && iterationCounter < maxIterations) {
				for (let i = letters.length; i > -1; i--) {
					const phonic = new Zhuyin(letters.substring(0, i).toLowerCase());
					if (phonic.getCharacter() !== undefined) {
						letters = letters.substring(phonic.getPinyin().length);
						setToneWithPossibleMalformedPinyinHandling(phonic, letters, tone);
						returnValue += phonic.getCharacterWithTone();
						break;
					}
				}
				iterationCounter++;
			}
			return returnValue;
		};
		
		const convertNumberedPinyinTo = (phoneticType: PhoneticType, value: string): string => {
			let convertedValue: string = '';
			const minimumOneLetterCaseInsensitive: RegExp = new RegExp(/([a-zA-Z]{1,})/);
			const numbersOneThroughFiveOrSpaceIndicatingLightTone: RegExp = new RegExp(/([1-5]|\s*)/);
			const zeroOrOneSpaceCharacterNonToneRelated: RegExp = new RegExp(/(\s*)/);
			const finalRegEx: RegExp = new RegExp(
				minimumOneLetterCaseInsensitive.source +
				numbersOneThroughFiveOrSpaceIndicatingLightTone.source +
				zeroOrOneSpaceCharacterNonToneRelated.source
			);
			let results: RegExpExecArray;
			while ((results = finalRegEx.exec(value)) !== null) {
				value = value.substring(results.index + results[0].length);
				//const originalText: string = results[0];
				const romanLetters: string = results[1];
				const tone: number = parseTone(results[2]);
				const spaceCharacter: string = results[3];
				let phonic: Zhuyin | string;
				if (phoneticType === PhoneticType.ZHUYIN) {
					phonic = replaceNumberedRomanLettersWithZhuyin(romanLetters, tone);
				}
				if (phoneticType === PhoneticType.PINYIN) {
					phonic = replaceNumberWithAccentedVowel(romanLetters, tone);
				}
				convertedValue += phonic + spaceCharacter;
			}
			return convertedValue;
		};
		
		const processNumberedPinyin = (phoneticType: PhoneticType, value: string): string => {
			return convertNumberedPinyinTo(phoneticType, value);
		};
		
		const hanziToPhoneticCharacters = (phoneticType: PhoneticType, value: string): string => {
			if (value === undefined || value === null || value === '') {
				return '';
			}
			
			let result: string = '';
			value = value.trim().toLowerCase();
			value = value.replace(/[',。，《》.!?]/g, '');
			if (isPinyin(value)) {
				result = processNumberedPinyin(phoneticType, value);
			}
			return result;
		};

		return hanziToPhoneticCharacters(phonicType, phonicValue);
	}

	private createStrokeOrderCharacter(): void {
		let delayBetweenAnimations: number = 500;
		let characters: Array<string> = this.primaryCharacter.split('');
		let drawingArea: HTMLElement = this.element.shadowRoot.querySelector('#stroke-order');
		while (drawingArea.firstChild) {
			drawingArea.removeChild(drawingArea.firstChild);
		}
		let strokeOrderCharacters: Array<any> = [];

		for (var i = 0; i < characters.length; i++) {
			let idName = 'character-' + i;
			let node = document.createElement('div');
			node.id = idName;
			drawingArea.appendChild(node);

			let strokeOrderCharacter = HanziWriter.create(
				node,
				characters[i], {
					strokeColor: '#000000',
					width: 50,
					height: 50,
					padding: 1,
					delayBetweenStrokes: 500,
				}
			);
			strokeOrderCharacters.push(strokeOrderCharacter);
		}

		const animateNextCharacter = (current: number, hanziCharacters: Array<any>) => {
			const currentCharacter: any = hanziCharacters[current];
			const nextId: number = current + 1;
			const nextCharacter: any = hanziCharacters[nextId];
			const nextNextId: number = current + 2;
			const nextNextCharacter: any = hanziCharacters[nextNextId];
			const isLastCharacter = () => nextCharacter === undefined;
			const isNextCharacterTheLastCharacter = () => nextNextCharacter === undefined;

			setTimeout(() => {
				if (isLastCharacter()) {
					currentCharacter.animateCharacter();
				} else {
					if (isNextCharacterTheLastCharacter()) {
						nextCharacter.animateCharacter();
					} else {
						nextCharacter.animateCharacter({
							onComplete: () => animateNextCharacter(nextId, hanziCharacters)
						});
					}
				}
			}, delayBetweenAnimations);
		};

		const animateFirstCharacterOnly = () => {
			let firstCharacter: any = strokeOrderCharacters[0];	
			firstCharacter.animateCharacter({
				onComplete: () => animateNextCharacter(0, strokeOrderCharacters)
			});
		};

		setTimeout(() => {
			animateFirstCharacterOnly()
		}, delayBetweenAnimations + delayBetweenAnimations);
	};

	private createCard(): HTMLElement {
		let template: HTMLElement;
		let secondaryText: string;
		let type: string = this.getCardType()
			.toUpperCase()
			.trim();
		if (this.getCardType().indexOf('secondary') >= 0) {
			for (var enumMember in HanziType) {
				if (this.getHanziType() !== enumMember) {
					secondaryText = enumMember;
				}
			}
			type = this.getCardType()
				.toUpperCase()
				.replace('SECONDARY', secondaryText)
				.replace('-', ' ')
				.replace('RECOGNITION', '')
				.trim();
		}
		
		if (this.cardOrientation === 'question') {
			template = 
				<div id='anki-background'>
					<div id='chinese-card'>
						{this.createCardContent()}
						<div id='chinese-card-type'>
							<p id='colour-scheme'>{ type }</p>
						</div>
					</div>
				</div>
			;
		}
		if (this.cardOrientation === 'answer') {
			template =
				<div id='anki-background'>
					<div id='chinese-card'>
						{this.createCardContent()}
						<div id='chinese-card-type'>
							<p id="colour-scheme">{ type }</p>
						</div>
					</div>
				</div>
			;
		}
		return template;
	}

	private createCardContent(): HTMLElement {
		const plecoLink: string = `plecoapi://x-callback-url/df?hw=${this.getPrimaryCharacter()}`;

		const content: HTMLElement = 
			<div id='chinese-card-content'>
				<p>
					<ruby>
						<a id='pleco-link' href={ plecoLink }>
							<div id='primary-hanzi-primary-element'>{this.getPrimaryCharacter()}</div>
							<div id='secondary-hanzi-primary-element'>{ this.generatedTraditional }</div>
						</a>
						<rt id='phonetic'>{ this.phonic }</rt>
					</ruby>
				</p>
				<div id='sentence'>
					<ruby>
						<div id='primary-hanzi-sentence'>{this.getPrimaryCharacterSentence()}</div>
						<div id='secondary-hanzi-sentence'>{ this.generatedTraditionalSentence }</div>
						<rt id='sentence-phonetic'>{ this.sentencePhonic }</rt>
					</ruby>
				</div>
				<div id='english'>
					<p id='single-word-meaning'>{this.getMeaning()}</p>
					<p id='sentence-meaning'>{this.getSentenceMeaning()}</p>
				</div>
				<div id='stroke-order'></div>
				<div id='primary-hanzi-secondary-element'>{this.getPrimaryCharacter()}</div>
				<div id='secondary-hanzi-secondary-element'>{ this.generatedTraditional }</div>
				<div id='audio'></div>
			</div>
		;
		return content;
	}

	/**
	 * Called every time the component is connected to the DOM.
	 */
	connectedCallback(): void {
		this.phonic = this.getPhonic(this.getNumberedPinyin());
		this.sentencePhonic = this.getPhonic(this.getSentenceNumberedPinyin());
		this.generatedTraditional = this.getSecondaryCharacter();
		this.generatedTraditionalSentence = this.getSecondaryCharacterSentence();
		this.template = this.createCard();
	}

	/**
	 * Returns a tree of components that are rendered to the DOM at runtime.
	 * 
	 * @returns FunctionalComponent<HostAttributes>
	 */
	public render(): FunctionalComponent {
		return (
			<Host>
				{ this.template }
			</Host>
		);
	}

	/**
	 * Called after every `render()`.
	 */
	 public componentDidRender(): void {
		this.setColourSchemes();
		this.processCardContentByCardType();
		if (this.getCardType() === 'writing' && this.getCardOrientation() === 'answer') {
			this.createStrokeOrderCharacter();
		}
	}
}
