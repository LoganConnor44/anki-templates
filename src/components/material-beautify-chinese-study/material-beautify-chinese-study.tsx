import { Component, Host, h, Prop, Element } from '@stencil/core';
import PhoneticType from '../../enums/PhoneticType';
import Vowel from '../../phonetics/Vowel';
import Zhuyin from '../../phonetics/Zhuyin';
import HanziWriter  from 'hanzi-writer';

interface api {
	buttonAnswerEase1: Function,
	buttonAnswerEase2: Function,
	buttonAnswerEase3: Function,
	buttonAnswerEase4: Function,
	buttonAnswerEase5: Function
};

@Component({
	tag: 'material-beautify-chinese-study',
	styleUrl: 'material-beautify-chinese-study.css',
	shadow: true,
})
export class MaterialBeautifyChineseStudy {

	
	private _ankiApi: api;

	@Prop()
	ankiDroidJs: string;

	/**
	 *	Recognized card types: `recognition` | `traditional` | `tones` | `writing` | `meaning`
	 */
	@Prop() 
	cardType: string;
	/**
	 * Recognized card orientations: `question` | `answer`
	 */
	@Prop() 
	cardOrientation: string;
	/**
	 * All characters allowed
	 */
	@Prop() 
	simplified: string;
	/**
	 * All characters allowed
	 */
	@Prop() 
	simplifiedSentence: string;
	/**
	 * All characters allowed
	 */
	@Prop() 
	traditionalSentence: string;
	/**
	 * All characters allowed
	 */
	@Prop() 
	traditional: string;
	/**
	 * All English language words allowed
	 */
	@Prop()
	meaning: string;
	/**
	 * Most forms of numbered pinyin allowed
	 */
	@Prop()
	numberedPinyin: string;
	/**
	 * Most forms of numbered pinyin allowed
	 */
	@Prop()
	sentenceNumberedPinyin: string;
	/**
	 * Recognized phonics: `pinyin` | `zhuyin`
	 */
	@Prop()
	preferredPhonic: string = 'pinyin';

	@Element()
	element: HTMLElement;

	get ankiApi(): any {
		return this._ankiApi;
	}

	set ankiApi(value: any) {
		if (this.ankiDroidJs !== null && this.ankiDroidJs !== undefined) {
			this._ankiApi = JSON.parse(value);
		} 
	}

	getCardType(): string {
		if (this.cardType !== null && this.cardType !== undefined) {
			this.cardType = this.cardType.toLowerCase().trim();
		}
		return this.cardType;
	}

	getCardOrientation() {
		if (this.cardOrientation !== null && this.cardOrientation !== undefined) {
			this.cardOrientation = this.cardOrientation.toLowerCase().trim();
		}
		return this.cardOrientation;
	}

	getSimplified() {
		if (this.simplified !== null && this.simplified !== undefined) {
			this.simplified.trim();
		}
		return this.simplified;
	}

	getSimplifiedSentence() {
		if (this.simplifiedSentence !== null && this.simplifiedSentence !== undefined) {
			this.simplifiedSentence.trim();
		}
		return this.simplifiedSentence;
	}

	getTraditionalSentence() {
		if (this.traditionalSentence !== null && this.traditionalSentence !== undefined) {
			this.traditionalSentence.trim();
		}
		return this.traditionalSentence;
	}

	getTraditional() {
		if (this.traditional !== null && this.traditional !== undefined) {
			this.traditional.trim();
		}
		return this.traditional;
	}

	getMeaning() {
		if (this.meaning !== null && this.meaning !== undefined) {
			this.meaning.trim();
		}
		return this.meaning;
	}

	getNumberedPinyin() {
		if (this.numberedPinyin !== null && this.numberedPinyin !== undefined) {
			this.numberedPinyin.trim();
		}
		return this.numberedPinyin;
	}

	getSentenceNumberedPinyin() {
		if (this.sentenceNumberedPinyin !== null && this.sentenceNumberedPinyin !== undefined) {
			this.sentenceNumberedPinyin.trim();
		}
		return this.sentenceNumberedPinyin;
	}

	getPreferredPhonic() {
		if (this.preferredPhonic !== null && this.preferredPhonic !== undefined) {
			this.preferredPhonic.trim();
		}
		return this.preferredPhonic;
	}

	getPinyin() {
		return this.createPhonic(PhoneticType.PINYIN, this.numberedPinyin);
	}

	getZhuyin(value: string) {
		return this.createPhonic(PhoneticType.ZHUYIN, value);
	}

	getPhonic(value: string) {
		let phonic;
		if (this.preferredPhonic === 'pinyin') {
			phonic = this.getPinyin();
		}
		if (this.preferredPhonic === 'zhuyin') {
			phonic = this.getZhuyin(value);
		}
		return phonic;
	}
	
	private setColourSchemes (): void {
		let body: HTMLElement = this.element.shadowRoot.querySelector('#anki-background');
		let card: HTMLElement = this.element.shadowRoot.querySelector('#chinese-card');
		let cardType: HTMLElement = this.element.shadowRoot.querySelector('#chinese-card-type');
		let cardContent: HTMLElement = this.element.shadowRoot.querySelector('#chinese-card-content');
	
		switch (this.getCardType()) {
	
			case 'traditional':
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
				var darkest = '#3A0CA3';
				var darkestRBG = 'rgb(58, 12, 163, 0.3)';
				var darker = '#7209B7';
				var neutral = '#4361EE';
				var brighter = '#4CC9F0';
				var brightest = '#F72585';
	
				body.style.backgroundColor = darker;
	
				card.style.color = brighter;
				card.style.backgroundColor = brightest;
				card.style.boxShadow = '0px 0px 30px ' + darkest;
	
				cardType.style.color = brighter;
				cardType.style.backgroundColor = neutral;
	
				cardContent.style.textShadow = '2px 2px ' + darkestRBG;
	
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
		}
	};

	private setTonesDivsToInvisible(): void {
		let traditionalHanziPrimary: HTMLElement = this.element.shadowRoot.querySelector('#traditional-hanzi-primary');
		let traditionalHanziSecondary: HTMLElement = this.element.shadowRoot.querySelector('#traditional-hanzi-secondary');
		let meaning: HTMLElement = this.element.shadowRoot.querySelector('#english-meaning');
		let simplifiedHanziSecondary: HTMLElement = this.element.shadowRoot.querySelector('#simplified-hanzi-secondary');
		let phonetic: HTMLElement = this.element.shadowRoot.querySelector('#phonetic');
		let sentencePhonetic: HTMLElement = this.element.shadowRoot.querySelector('#sentence-phonetic');

		traditionalHanziPrimary.style.display = 'none';
		simplifiedHanziSecondary.style.display = 'none';
		traditionalHanziSecondary.style.display = 'none';
		meaning.style.display = 'none';

		if (this.getCardOrientation() === 'question') {
			phonetic.style.display = 'none';
			sentencePhonetic.style.display = 'none'
		}
		if (this.getCardOrientation() === 'answer') {
			phonetic.style.display = 'block';
		}
	}

	private setRecognitionDivsToInvisible(): void {
		let traditionalHanziPrimary: HTMLElement = this.element.shadowRoot.querySelector('#traditional-hanzi-primary');
		let traditionalHanziSecondary: HTMLElement = this.element.shadowRoot.querySelector('#traditional-hanzi-secondary');
		let meaning: HTMLElement = this.element.shadowRoot.querySelector('#english-meaning');
		let simplifiedHanziSecondary: HTMLElement = this.element.shadowRoot.querySelector('#simplified-hanzi-secondary');
		let phonetic: HTMLElement = this.element.shadowRoot.querySelector('#phonetic');
		let sentencePhonetic: HTMLElement = this.element.shadowRoot.querySelector('#sentence-phonetic');

		traditionalHanziPrimary.style.display = 'none';
		simplifiedHanziSecondary.style.display = 'none';
		traditionalHanziSecondary.style.display = 'none';

		if (this.getCardOrientation() === 'question') {
			phonetic.style.display = 'none';
			sentencePhonetic.style.display = 'none'
			meaning.style.display = 'none';
		}
		if (this.getCardOrientation() === 'answer') {
			phonetic.style.display = 'block';
			meaning.style.display = 'block';
		}
	}

	private setWritingDivsToInvisible(): void {
		let traditionalHanziPrimary: HTMLElement = this.element.shadowRoot.querySelector('#traditional-hanzi-primary');
		let simplifiedHanziPrimary: HTMLElement = this.element.shadowRoot.querySelector('#simplified-hanzi-primary');
		let traditionalHanziSecondary: HTMLElement = this.element.shadowRoot.querySelector('#traditional-hanzi-secondary');
		let meaning: HTMLElement = this.element.shadowRoot.querySelector('#english-meaning');
		let simplifiedHanziSecondary: HTMLElement = this.element.shadowRoot.querySelector('#simplified-hanzi-secondary');
		let phonetic: HTMLElement = this.element.shadowRoot.querySelector('#phonetic');
		let sentencePhonetic: HTMLElement = this.element.shadowRoot.querySelector('#sentence-phonetic');
		let simplifiedSentence: HTMLElement = this.element.shadowRoot.querySelector('#simplified-hanzi-sentence');
		let traditionalSentence: HTMLElement = this.element.shadowRoot.querySelector('#traditional-hanzi-sentence');

		simplifiedHanziPrimary.style.display = 'none';
		traditionalHanziPrimary.style.display = 'none';
		meaning.style.display = 'none';
		traditionalHanziSecondary.style.display = 'none';
		simplifiedHanziSecondary.style.display = 'none';
		simplifiedSentence.style.display = 'none';
		traditionalSentence.style.display = 'none';

		if (this.getCardOrientation() === 'question') {
			phonetic.style.fontSize = 'xx-large';
		}
		if (this.getCardOrientation() === 'answer') {
			phonetic.style.display = 'none';
			sentencePhonetic.style.display = 'none';
		}
	}

	private setTraditionalDivsToInvisible(): void {
		let simplifiedHanziPrimary: HTMLElement = this.element.shadowRoot.querySelector('#simplified-hanzi-primary');
		let traditionalHanziSecondary: HTMLElement = this.element.shadowRoot.querySelector('#traditional-hanzi-secondary');
		let meaning: HTMLElement = this.element.shadowRoot.querySelector('#english-meaning');
		let simplifiedHanziSecondary: HTMLElement = this.element.shadowRoot.querySelector('#simplified-hanzi-secondary');
		let phonetic: HTMLElement = this.element.shadowRoot.querySelector('#phonetic');

		simplifiedHanziPrimary.style.display = 'none';
		meaning.style.display = 'none';
		traditionalHanziSecondary.style.display = 'none';
		
		if (this.getCardOrientation() === 'question') {
			phonetic.style.display = 'none';
			meaning.style.display = 'none';
			traditionalHanziSecondary.style.display = 'none';
			simplifiedHanziSecondary.style.display = 'none';
		}
		if (this.getCardOrientation() === 'answer') {
			phonetic.style.display = 'block';
			simplifiedHanziSecondary.style.display = 'block';
		}
	}

	private setMeaningDivsToInvisible(): void {
		let traditionalHanziPrimary: HTMLElement = this.element.shadowRoot.querySelector('#traditional-hanzi-primary');
		let traditionalHanziSecondary: HTMLElement = this.element.shadowRoot.querySelector('#traditional-hanzi-secondary');
		let meaning: HTMLElement = this.element.shadowRoot.querySelector('#english-meaning');
		let simplifiedHanziSecondary: HTMLElement = this.element.shadowRoot.querySelector('#simplified-hanzi-secondary');
		let phonetic: HTMLElement = this.element.shadowRoot.querySelector('#phonetic');
		let sentencePhonetic: HTMLElement = this.element.shadowRoot.querySelector('#sentence-phonetic');

		traditionalHanziPrimary.style.display = 'none';
		simplifiedHanziSecondary.style.display = 'none';
		traditionalHanziSecondary.style.display = 'none';

		if (this.getCardOrientation() === 'question') {
			phonetic.style.display = 'none';
			sentencePhonetic.style.display = 'none';
			meaning.style.display = 'none';
		}
		if (this.getCardOrientation() === 'answer') {
			phonetic.style.display = 'block';
			meaning.style.display = 'block';
		}
	}

	private setDivsThatNeedToBeInvisible(): void {
		switch (this.getCardType()) {
			case 'traditional':
				this.setTraditionalDivsToInvisible();
				break;
	
			case 'tones':
				this.setTonesDivsToInvisible();
				break;
			
			case 'writing':
				this.setWritingDivsToInvisible();
				break;

			case 'recognition':
				this.setRecognitionDivsToInvisible();
				break;

			case 'meaning':
				this.setMeaningDivsToInvisible();
				break;
		}
	};

	private createPhonic(phonicType: PhoneticType, phonicValue: string) {
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
			value = value.replace(/['.!?]/g, '');
			if (isPinyin(value)) {
				result = processNumberedPinyin(phoneticType, value);
			}
			return result;
		};

		return hanziToPhoneticCharacters(phonicType, phonicValue);
	}

	createStrokeOrderCharacter() {
		let delayBetweenAnimations: number = 500;
		let characters: Array<string> = this.simplified.split('');
		let drawingArea: HTMLElement = this.element.shadowRoot.querySelector('#stroke-order');
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

	createTonesCardType(): HTMLElement {
		let template: HTMLElement;
		const type: string = this.getCardType().toUpperCase();

		if (this.cardOrientation === 'question') {
			template =
				<div id='anki-background'>
					<div id='chinese-card'>
						{this.createCardContent()}
						<div id='chinese-card-type'>
							<p id='colour-scheme'>{type}</p>
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
							<p id='colour-scheme'>{type}</p>
						</div>
					</div>
				</div>
			;
		}
		return template;
	}

	createTraditionalCardType(): HTMLElement {
		let template: HTMLElement;
		const type: string = this.getCardType().toUpperCase();

		if (this.cardOrientation === 'question') {
			template =
				<div id='anki-background'>
					<div id='chinese-card'>
						{this.createCardContent()}
						<div id='chinese-card-type'>
							<p id='colour-scheme'>{type}</p>
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
							<p id="colour-scheme">{type}</p>
						</div>
					</div>
				</div>
			;
		}
		return template;
	}

	createWritingCardType(): HTMLElement {
		let template: HTMLElement;
		const type: string = this.getCardType().toUpperCase();

		if (this.cardOrientation === 'question') {
			template =
				<div id='anki-background'>
					<div id='chinese-card'>
						{this.createCardContent()}
						<div id='chinese-card-type'>
							<p id='colour-scheme'>{type}</p>
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
							<p id='colour-scheme'>{type}</p>
						</div>
					</div>
				</div>
			;
		}
		return template;
	}

	createMeaningCardType(): HTMLElement {
		let template: HTMLElement;
		const type: string = this.getCardType().toUpperCase();

		if (this.cardOrientation === 'question') {
			template =
				<div id='anki-background'>
					<div id='chinese-card'>
						{this.createCardContent()}
						<div id='chinese-card-type'>
							<p id='colour-scheme'>{type}</p>
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
							<p id='colour-scheme'>{type}</p>
						</div>
					</div>
				</div>
			;
		}
		return template;
	}

	createRegonitionCardType(): HTMLElement {
		let template: HTMLElement;
		const type: string = this.getCardType().toUpperCase();

		if (this.cardOrientation === 'question') {
			template = 
				<div id='anki-background'>
					<div id='chinese-card'>
						{this.createCardContent()}
						<div id='chinese-card-type'>
							<p id='colour-scheme'>{type}</p>
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
							<p id="colour-scheme">{type}</p>
						</div>
					</div>
				</div>
			;
		}
		return template;
	}

	createAnswerButtons(): HTMLElement {
		const buttons: HTMLElement = 
			<div id='beautify-buttons'>
				<button id='beautify-again'>again</button>
				<button id='beautify-hard'>hard</button>
				<button id='beautify-good'>good</button>
				<button id='beautify-easy'>easy</button>
			</div>
		;
		return buttons;
	}

	createCardContent(): HTMLElement {
		const plecoLink: string = `plecoapi://x-callback-url/df?hw=${this.getSimplified()}`;

		const content: HTMLElement = 
			<div id='chinese-card-content'>
				<p>
					<ruby>
						<a id='pleco-link' href={plecoLink}>
							<div id='simplified-hanzi-primary'>{this.getSimplified()}</div>
							<div id='traditional-hanzi-primary'>{this.getTraditional()}</div>
						</a>
						<rt id='phonetic'>
							{this.getPhonic(this.getNumberedPinyin())}
						</rt>
					</ruby>
				</p>
				<div id='sentence'>
					<ruby>
						<div id='simplified-hanzi-sentence'>{this.getSimplifiedSentence()}</div>
						<div id='traditional-hanzi-sentence'>{this.getTraditionalSentence()}</div>
						<rt id='sentence-phonetic'>{this.getPhonic(this.getSentenceNumberedPinyin())}</rt>
					</ruby>
				</div>
				<p id='english-meaning'>{this.getMeaning()}</p>
				<div id='stroke-order'></div>
				<div id='simplified-hanzi-secondary'>{this.getSimplified()}</div>
				<div id='traditional-hanzi-secondary'>{this.getTraditional()}</div>
			</div>
		;
		return content;
	}

	defineCustomButtons() {
		if (this.cardOrientation === 'answer') {
			let beautifyAgain = this.element.shadowRoot.querySelector('#beautify-again');
			beautifyAgain.setAttribute('onclick', 'buttonAnswerEase1()');

			let beautifyHard = this.element.shadowRoot.querySelector('#beautify-hard');
			beautifyHard.setAttribute('onclick', 'buttonAnswerEase2()');

			let beautifyGood = this.element.shadowRoot.querySelector('#beautify-good');
			beautifyGood.setAttribute('onclick', 'buttonAnswerEase3()');

			let beautifyEasy = this.element.shadowRoot.querySelector('#beautify-easy');
			beautifyEasy.setAttribute('onclick', 'buttonAnswerEase4()');
		}
	}

	componentDidLoad() {
		this.setColourSchemes();
		if (this.getCardType() === 'writing' && this.getCardOrientation() == 'answer') {
			this.createStrokeOrderCharacter();
		}
		if (this.ankiDroidJs !== undefined) {
			this.ankiApi = this.ankiDroidJs;
			//this.defineCustomButtons();
		} else {
			console.log('ankidriodjs is null');
		}
	}

	componentDidRender() {
		this.setDivsThatNeedToBeInvisible();
		if (this.getCardType() === 'writing' && this.getCardOrientation() == 'answer') {
			this.createStrokeOrderCharacter();
		}
	}

	render() {
		let template: HTMLElement;
		
		switch(this.getCardType()) {
			case 'recognition' :
				template = this.createRegonitionCardType();
				break;
			case 'traditional' :
				template = this.createTraditionalCardType();
				break;
			case 'tones' : 
				template = this.createTonesCardType();
				break;
			case 'meaning' :
				template = this.createMeaningCardType();
				break;
			case 'writing' :
				template = this.createWritingCardType();
				break;
		}
		
		return (
			<Host>
				{template}
			</Host>
		);
	}
}
