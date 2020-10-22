import Tone from '../enums/Tone';
import Phonetic from './Phonetic';

class Vowel extends Phonetic {
	private letter: string;
	public constructor(letter: string) {
		super();
		this.letter = letter;
	}
	public getVowel(): string {
		return this.letter;
	}
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
}

export default Vowel;