import Tone from "../enums/Tone";

class AccentedVowel {
	private letter: string;
	protected tone: Tone;

	/**
	 * Represents a single vowel and exposes its tone-marked variant for pinyin.
	 *
	 * @param letter string The base vowel to accent (a|e|i|o|u).
	 */
	public constructor(letter: string) {
		this.letter = letter;
	}
	/**
	 * Returns the base vowel without any tone.
	 */
	public getVowel(): string {
		return this.letter;
	}
	/**
	 * Returns the vowel with the currently assigned tone mark.
	 */
	public getVowelWithTone(): string {
		switch (this.letter) {
			case 'a': {
				switch (this.tone) {
					case Tone.FIRST : {
						return 'ā';
					}
					case Tone.SECOND : {
						return 'á';
					}
					case Tone.THIRD : {
						return 'ǎ';
					}
					case Tone.FORTH : {
						return 'à';
					}
					case Tone.NEUTRAL : {
						return this.letter;
					}
				}
			}
			case 'e': {
				switch (this.tone) {
					case Tone.FIRST : {
						return 'ē';
					}
					case Tone.SECOND : {
						return 'é';
					}
					case Tone.THIRD : {
						return 'ě';
					}
					case Tone.FORTH : {
						return 'è';
					}
					case Tone.NEUTRAL : {
						return this.letter;
					}
				}
			}
			case 'i': {
				switch (this.tone) {
					case Tone.FIRST : {
						return 'ī';
					}
					case Tone.SECOND : {
						return 'í';
					}
					case Tone.THIRD : {
						return 'ǐ';
					}
					case Tone.FORTH : {
						return 'ì';
					}
					case Tone.NEUTRAL : {
						return this.letter;
					}
				}
			}
			case 'o': {
				switch (this.tone) {
					case Tone.FIRST : {
						return 'ō';
					}
					case Tone.SECOND : {
						return 'ó';
					}
					case Tone.THIRD : {
						return 'ǒ';
					}
					case Tone.FORTH : {
						return 'ò';
					}
					case Tone.NEUTRAL : {
						return this.letter;
					}
				}
			}
			case 'u': {
				switch (this.tone) {
					case Tone.FIRST : {
						return 'ū';
					}
					case Tone.SECOND : {
						return 'ú';
					}
					case Tone.THIRD : {
						return 'ǔ';
					}
					case Tone.FORTH : {
						return 'ù';
					}
					case Tone.NEUTRAL : {
						return this.letter;
					}
				}
			}
		}
	}
	
	/**
	 * Sets the tone number (1-4, or neutral) used when generating accented vowels.
	 *
	 * @param number number The numeric tone to apply to this vowel.
	 */
	public setTone(number: number): void {
		switch(number) {
			case 1:  {
				this.tone = Tone.FIRST;
				break;
			}
			case 2:  {
				this.tone = Tone.SECOND;
				break;
			}
			case 3:  {
				this.tone = Tone.THIRD
				break;
			}
			case 4:  {
				this.tone = Tone.FORTH;
				break;
			}
			default: {
				this.tone = Tone.NEUTRAL;
				break;
			}
		}
	}
}

export default AccentedVowel;
