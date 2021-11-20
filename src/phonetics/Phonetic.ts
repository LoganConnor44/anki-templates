import { PhoneticType } from '../enums/PhoneticType';
import AccentedVowel from './AccentedVowel';
import Zhuyin from './Zhuyin';

class Phonetic {
	constructor() {
	}

	private isPinyin(value: string): boolean {
		return this.toBoolean(value.search(/^[a-zA-Z0-9\s]*$/));
	}
	private parseTone(value: string): number {
		return value === ' ' || value === '' ? 5 : parseInt(value);
	}
	private toBoolean(value: number): boolean {
		return value >= 0 ? true : false;
	}

	private replaceVowelWithAccentedVowel(value: string, accentedVowel: AccentedVowel): string {
		const valueReversed: string = value.split('').reverse().join('');
		const valueWithAccentReversed: string = valueReversed.replace(
			accentedVowel.getVowel(),
			accentedVowel.getVowelWithTone()
		);
		return valueWithAccentReversed.split('').reverse().join('');
	}

	private createAppropriateVowelWithAccent(valueArray: Array<string>, toneNumber: number): AccentedVowel {
		let vowels: Array<AccentedVowel> = new Array<AccentedVowel>();
		vowels[0] = new AccentedVowel('a');
		vowels[1] = new AccentedVowel('e');
		vowels[2] = new AccentedVowel('i');
		vowels[3] = new AccentedVowel('o');
		vowels[4] = new AccentedVowel('u');
	
		let vowelToBeAccented: string = '';
		vowels.forEach(vowel => {
			valueArray.forEach((x: string) => {
				if (x === vowel.getVowel() && vowelToBeAccented === '') {
					vowelToBeAccented = vowel.getVowel();
				}
			});
		});
		const accentedVowel = new AccentedVowel(vowelToBeAccented);
		accentedVowel.setTone(toneNumber);
		return accentedVowel;
	}

	private retrieveVowelsBeforeNumber(value: string): Array<string> {
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
	}

	private replaceNumberWithAccentedVowel(value: string, toneNumber: number): string {
		const vowelsImmediatelyBeforeNumber: Array<string> = this.retrieveVowelsBeforeNumber(value);
		const vowelAccented: AccentedVowel = this.createAppropriateVowelWithAccent(vowelsImmediatelyBeforeNumber, toneNumber);
		return this.replaceVowelWithAccentedVowel(value, vowelAccented);
	}

	/**
		 * Sets the tone for a syllable even if a light tone syllable is right up against another valid toned syllable.
		 * 
		 * @param phonic Zhuyin The new zhuyin character converted from pinyin. 
		 * @param letters string The remaining pinyin letters after the zhuyin has been created.
		 * @param tone number The extracted tone number that should only be applied to the last zhuyin.
		 */
	private setToneWithPossibleMalformedPinyinHandling(phonic: Zhuyin, letters: string, tone: number): void {
		if (letters === '') {
			phonic.setTone(tone);
		} else {
			phonic.setTone(5);
		}
	}

	replaceNumberedRomanLettersWithZhuyin(letters: string, tone: number): string {
		let returnValue: string = '';
		const maxIterations = 25;
		let iterationCounter = 1;
		while (letters !== '' && iterationCounter < maxIterations) {
			for (let i = letters.length; i > -1; i--) {
				const phonic: Zhuyin = new Zhuyin(letters.substring(0, i).toLowerCase());
				if (phonic.getCharacter() !== undefined) {
					letters = letters.substring(phonic.getPinyin().length);
					this.setToneWithPossibleMalformedPinyinHandling(phonic, letters, tone);
					returnValue += phonic.getCharacterWithTone();
					break;
				}
			}
			iterationCounter++;
		}
		return returnValue;
	}

	convertNumberedPinyinTo(phoneticType: PhoneticType, value: string): Array<string> {
		let phonics: Array<string> = [];
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
			const tone: number = this.parseTone(results[2]);
			const spaceCharacter: string = results[3];
			let phonic: string;
			if (phoneticType === PhoneticType.ZHUYIN) {
				phonic = this.replaceNumberedRomanLettersWithZhuyin(romanLetters, tone);
			}
			if (phoneticType === PhoneticType.PINYIN) {
				phonic = this.replaceNumberWithAccentedVowel(romanLetters, tone);
			}
			phonics.push(phonic + spaceCharacter);
		}
		return phonics;
	}

	private hanziToPhoneticCharacters(phoneticType: PhoneticType, value: string): Array<string> {
		if (value === undefined || value === null || value === '') {
			return [];
		}
		
		let result: Array<string> = [];
		value = value.trim().toLowerCase();
		value = value.replace(/[',。，《》.!?]/g, '');
		if (this.isPinyin(value)) {
			result = this.convertNumberedPinyinTo(phoneticType, value);
		}
		return result;
	}

	public create(phonicType: PhoneticType, phonicValue: string) {
		return this.hanziToPhoneticCharacters(phonicType, phonicValue);
	}
}

export default Phonetic;