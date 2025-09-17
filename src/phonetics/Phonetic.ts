import { PhoneticType } from '../enums/PhoneticType';
import AccentedVowel from './AccentedVowel';
import Zhuyin from './Zhuyin';

class Phonetic {
	/**
	 * Core utilities for converting numbered pinyin into pinyin with accents or zhuyin.
	 */
	constructor() {
	}

	/**
	 * Parses a tone value from text, mapping blank/space to neutral tone (5).
	 *
	 * @param value string The raw tone input, like '1'-'5' or a space.
	 */
	private parseTone(value: string): number {
		return value === ' ' || value === '' ? 5 : parseInt(value);
	}

	/**
	 * Replaces the target vowel in a syllable with its accented equivalent.
	 *
	 * @param value string The original pinyin letters to modify.
	 * @param accentedVowel AccentedVowel The vowel/tone combination to insert.
	 */
	private replaceVowelWithAccentedVowel(value: string, accentedVowel: AccentedVowel): string {
		const valueReversed: string = value.split('').reverse().join('');
		const valueWithAccentReversed: string = valueReversed.replace(
			accentedVowel.getVowel(),
			accentedVowel.getVowelWithTone()
		);
		return valueWithAccentReversed.split('').reverse().join('');
	}

	/**
	 * Chooses which vowel to accent based on pinyin rules and assigns the tone.
	 *
	 * @param valueArray Array<string> The letters preceding the tone number.
	 * @param toneNumber number The numeric tone to apply (1-4, 5 for neutral).
	 */
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

	/**
	 * Retrieves the contiguous vowel cluster immediately before the tone number.
	 *
	 * @param value string The numbered pinyin syllable (e.g., "hao3").
	 */
	private retrieveVowelsBeforeNumber(value: string): Array<string> {
		const vowelPattern = /([aeiou])/i;
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

	/**
	 * Converts numbered pinyin syllable to accented pinyin by replacing the target vowel.
	 *
	 * @param value string The numbered pinyin letters like 'hao3'.
	 * @param toneNumber number The parsed tone number to apply to the syllable.
	 */
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

	/**
	 * Converts romanized letters into zhuyin characters for a syllable sequence.
	 *
	 * @param letters string The remaining numbered pinyin letters to convert.
	 * @param tone number The tone number to apply to the final syllable in sequence.
	 */
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

	/**
	 * Converts a chunk of numbered pinyin into the requested phonetic representation.
	 *
	 * @param phoneticType PhoneticType The target phonetic system to convert to.
	 * @param value string The chunk of numbered pinyin to be converted.
	 */
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

	/**
	 * Converts a mixed array of characters and punctuation into phonetic strings.
	 *
	 * @param phoneticType PhoneticType The target phonetic system to convert to.
	 * @param value Array<string> The source characters split into an array.
	 */
	private toPhoneticCharacters(phoneticType: PhoneticType, value: Array<string>): Array<string> {
		if (value === undefined || value === null || value.length === 0) {
			return [];
		}
		
		let result: Array<string> = [];
		const isNotLetterOrDigit: RegExp = new RegExp(/[^a-zA-Z0-9]/g);
		const regEx: RegExp = new RegExp(isNotLetterOrDigit.source);
		const indexOfSpecialCharacter: Array<number> = value.reduce((acc: Array<number>, x: string, idx: number) => {
			if (regEx.test(x)) {
				acc.push(idx);
			}
			return acc;
		}, []);
		if (indexOfSpecialCharacter.length === 0) {
			result = this.convertNumberedPinyinTo(phoneticType, value.join(''));
		} else {
			let pointer = 0;
			while (pointer < value.length) {
				const end = indexOfSpecialCharacter[0] !== undefined ?
					indexOfSpecialCharacter[0] + 1 :
					value.length;
				const chunk = this.convertNumberedPinyinTo(phoneticType, value.slice(pointer, end).join(''));
				chunk.map(x => result.push(x));
				result.splice(indexOfSpecialCharacter[0], 0, '');
				indexOfSpecialCharacter.shift();
				pointer = end;
			}
		}
		return result;
	}

	/**
	 * Creates phonetic strings from numbered pinyin for the configured target type.
	 *
	 * @param phonicType PhoneticType The output phonetic system.
	 * @param phonicValue Array<string> The input numbered pinyin split into chars.
	 */
	public create(phonicType: PhoneticType, phonicValue: Array<string>) {
		return this.toPhoneticCharacters(phonicType, phonicValue);
	}
}

export default Phonetic;
