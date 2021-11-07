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
	styleUrl: 'styles/beautify-chinese-study.css',
	shadow: true
})
export class MaterialBeautifyChineseStudy {
	/**
	 * Recognized hanzi typoes: 'simplified' | 'traditional'
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

	private processCardContentByCardType(): void {
		switch (this.getCardType()) {
			case 'secondary-recognition':
				//this.processTraditionalCardType();
				break;
			case 'secondary-sentence':
				//this.processTraditionalSentenceCardType();
				break;
			case 'tones':
				//this.processTonesCardType();
				break;
			case 'writing':
				//this.processWritingCardType();
				break;
			case 'meaning':
				//this.processMeaningCardType();
				break;
			case 'audio':
				//this.processAudioCardType();
				break;
			case 'sentence':
			default:
				//this.processSentenceCardType();
				break;
		}
	};

	private createPhonic(phonicType: PhoneticType, phonicValue: string): string {
		const isPinyin = (value: string): boolean => toBoolean(value.search(/^[a-zA-Z0-9\s]*$/));
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
		
		
		template =
			<div id='anki-background'>
				<material-beautify-card class={ this.cardType }
					orientation={ this.getCardOrientation() }
					primary-vocab={ this.getPrimaryCharacter() } 
					secondary-vocab={ this.getSecondaryCharacter() }
					vocab-phonic={ this.phonic }
					sentence={ this.getPrimaryCharacterSentence() }
					secondary-sentence={ this.getSecondaryCharacterSentence() }
					sentence-phonic={ this.sentencePhonic }
					type={ this.cardType } 
					meaning={ this.getMeaning() }
					sentence-meaning={ this.getSentenceMeaning() }
					primary-hanzi-type={ this.primaryHanziType.trim().toLowerCase() }/>
			</div>
		;
		return template;
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
	 *  Returns a tree of components that are rendered to the DOM at runtime.
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
		this.processCardContentByCardType();
		if (this.getCardType() === 'writing' && this.getCardOrientation() === 'answer') {
			this.createStrokeOrderCharacter();
		}
	}
}