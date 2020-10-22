import { Component, Host, h, Prop, Element } from '@stencil/core';
import PhoneticType from '../../enums/PhoneticType';
import Vowel from '../../phonetics/Vowel';
import Zhuyin from '../../phonetics/Zhuyin';
import HanziWriter  from 'hanzi-writer';

@Component({
	tag: 'material-beautify-chinese-study',
	styleUrl: 'material-beautify-chinese-study.css',
	shadow: true,
})
export class MaterialBeautifyChineseStudy {

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
	 * Recognized phonics: `pinyin` | `zhuyin`
	 */
	@Prop()
	preferredPhonic: string = 'pinyin';

	@Element()
	element: HTMLElement;

	getCardType(): string {
		if (this.cardType !== null) {
			this.cardType = this.cardType.toLowerCase().trim();
		}
		return this.cardType;
	}

	getCardOrientation() {
		if (this.cardOrientation !== null) {
			this.cardOrientation = this.cardOrientation.toLowerCase().trim();
		}
		return this.cardOrientation;
	}

	getSimplified() {
		if (this.simplified !== null) {
			this.simplified.trim();
		}
		return this.simplified;
	}

	getTraditional() {
		if (this.traditional !== null) {
			this.traditional.trim();
		}
		return this.traditional;
	}

	getMeaning() {
		if (this.meaning !== null) {
			this.meaning.trim();
		}
		return this.meaning;
	}

	getNumberedPinyin() {
		if (this.numberedPinyin !== null) {
			this.numberedPinyin.trim();
		}
		return this.numberedPinyin;
	}

	getPreferredPhonic() {
		if (this.preferredPhonic !== null) {
			this.preferredPhonic.trim();
		}
		return this.preferredPhonic;
	}

	getPinyin() {
		return this.createPhonic(PhoneticType.PINYIN, this.numberedPinyin);
	}

	getZhuyin() {
		return this.createPhonic(PhoneticType.ZHUYIN, this.numberedPinyin);
	}

	getPhonic() {
		let phonic;
		if (this.preferredPhonic === 'pinyin') {
			phonic = this.getPinyin();
		}
		if (this.preferredPhonic === 'zhuyin') {
			phonic = this.getZhuyin();
		}
		return phonic;
	}
	
	private setColourSchemes (questionType: string): void {
		let body: HTMLElement = this.element.shadowRoot.querySelector('#anki-background');
		let card: HTMLElement = this.element.shadowRoot.querySelector('#chinese-card');
		let cardType: HTMLElement = this.element.shadowRoot.querySelector('#chinese-card-type');
		let cardContent: HTMLElement = this.element.shadowRoot.querySelector('#chinese-card-content');
	
		switch (questionType) {
	
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
			let result: string = '';
			value = value.trim();
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
		const simplified: string = this.getSimplified();
		const phonic: string = this.getPhonic();
		const plecoLink: string = `plecoapi://x-callback-url/df?hw=${simplified}`;

		if (this.cardOrientation === 'question') {
			template =
				<div id='anki-background'>
					<div id='chinese-card'>
						<div id='chinese-card-content'>
							<p>
								<ruby>
									{simplified}
								</ruby>
							</p>
						</div>
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
						<div id='chinese-card-content'>
							<p>
								<ruby>
									<a href={plecoLink}>
										{simplified}
									</a>
									<rt id='phonetic-zhuyin'>
										{phonic}
									</rt>
								</ruby>
							</p>
						</div>
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
		const simplified: string = this.getSimplified();
		const traditional: string = this.getTraditional();
		const phonic: string = this.getPhonic();
		const plecoLink: string = `plecoapi://x-callback-url/df?hw=${traditional}`;


		if (this.cardOrientation === 'question') {
			template =
				<div id='anki-background'>
					<div id='chinese-card'>
						<div id='chinese-card-content'>
							<p>{traditional}</p>
						</div>
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
						<div id='chinese-card-content'>
							<p>
								<ruby>
									<a href={plecoLink}>
										{traditional}
									</a>
									<rt id='phonetic-zhuyin'>
										{phonic}
									</rt>
								</ruby>
							</p>
							<p>{simplified}</p>
						</div>
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
		const simplified: string = this.getSimplified();
		const phonic: string = this.getPhonic();
		const plecoLink: string = `plecoapi://x-callback-url/df?hw=${simplified}`;

		if (this.cardOrientation === 'question') {
			template =
				<div id='anki-background'>
					<div id='chinese-card'>
						<div id='chinese-card-content'>
							<p id='phonetic-zhuyin'>{phonic}</p>
						</div>
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
						<div id='chinese-card-content'>
							<p>
								<a href={plecoLink}>
									<div id='stroke-order'></div>
								</a>
								<br />
								<br />
							</p>
						</div>
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
		const simplified: string = this.getSimplified();
		const meaning: string = this.getMeaning();
		const plecoLink: string = `plecoapi://x-callback-url/df?hw=${simplified}`;

		if (this.cardOrientation === 'question') {
			template =
				<div id='anki-background'>
					<div id='chinese-card'>
						<div id='chinese-card-content'>
							<p>{simplified}</p>
						</div>
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
						<div id='chinese-card-content'>
							<p>
								<a href={plecoLink}>
									{simplified}
								</a>
								<br />
								<br />
								<p id='english-meaning'>{meaning}</p>
							</p>
						</div>
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
		const simplified: string = this.getSimplified();
		const phonic: string = this.getPhonic();
		const meaning: string = this.getMeaning();
		const plecoLink: string = `plecoapi://x-callback-url/df?hw=${simplified}`;

		if (this.cardOrientation === 'question') {
			template = 
				<div id='anki-background'>
					<div id='chinese-card'>
						<div id='chinese-card-content'>
							<p>{simplified}</p>
						</div>
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
						<div id='chinese-card-content'>
							<p>
								<ruby>
									<a href={plecoLink}>
										{simplified}
									</a>
									<rt class='phonetic-zhuyin'>
										{phonic}
									</rt>
								</ruby>
							</p>
							<p id="english-meaning">{meaning}</p>
						</div>
						<div id='chinese-card-type'>
							<p id="colour-scheme">{type}</p>
						</div>
					</div>
				</div>
			;
		}
		return template;
	}

	componentDidLoad() {
		this.setColourSchemes(this.getCardType());
		this.createStrokeOrderCharacter();
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
