enum HanziType {
    SIMPLIFIED,
    TRADITIONAL,
    SIMPLIFIED_AND_TRADITIONAL
}

enum Tone {
    FIRST,
    SECOND,
    THIRD,
    FORTH,
    NEUTRAL
}

class Vowel {
    private letter: string;
    private tone: Tone;
    constructor(letter: string) {
        this.letter = letter;
    }
    setTone(number: number): void {
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
    getVowel(): string {
        return this.letter;
    }
    getVowelWithTone(): string {
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

let vowels: Vowel[] = new Array<Vowel>();
vowels[0] = new Vowel('a');
vowels[1] = new Vowel('e');
vowels[2] = new Vowel('i');
vowels[3] = new Vowel('o');
vowels[4] = new Vowel('u');

const isPinyin = (value: string): boolean => toBoolean(value.search(/^[a-zA-Z0-9\s]*$/));
const containsNumeric = (value: string): boolean => toBoolean(value.search(/\d/));
const containsSpace = (value: string): boolean => toBoolean(value.search(/^(.*\s.*){1,}$/));
const toBoolean = (value: number): boolean => value >= 0 ? true : false;

const convertFromSyllable = (arrayOfLettersNumber: string[]): string => {
    let vowelToBeAccented: string = '';
    vowels.forEach(vowel => {
        arrayOfLettersNumber.forEach((letter: string) => {
            if (letter === vowel.getVowel() && vowelToBeAccented === '') {
                vowelToBeAccented = vowel.getVowel();
            }
        });
    });
    const wholeWordAgain: string = arrayOfLettersNumber.join('');
    const toneNumber: number = parseInt(wholeWordAgain.substring(wholeWordAgain.length - 1));
    const vowelAccented: Vowel = new Vowel(vowelToBeAccented);
    vowelAccented.setTone(toneNumber);
    const valueWithAccentAndNumber: string = wholeWordAgain.replace(
        vowelToBeAccented,
        vowelAccented.getVowelWithTone()
    );
    const valueWithOutNumber: string = valueWithAccentAndNumber.replace(toneNumber.toString(), '');
    return valueWithOutNumber;
};

const separateSyllables = (arrayOfLettersNumber: string[]): string[] => {
    let syllables: string[] = new Array<string>();
    let startIndex = 0;
    for (let i = 0; i < arrayOfLettersNumber.length; i++) {
        if (containsNumeric(arrayOfLettersNumber[i]) ||  arrayOfLettersNumber.length - 1 === i) {
            const syllable = arrayOfLettersNumber.slice(startIndex, i + 1).join('');
            syllables.push(syllable);
            startIndex = i + 1;
        }
    }
    return syllables;
}

const convertFromSingleWord = (arrayOfLettersNumber: string[]): string => {
    let converted = '';
    const syllables = separateSyllables(arrayOfLettersNumber)
    syllables.forEach(syllable => {
        converted += convertFromSyllable(syllable.split(''));
    });
    return converted;
}

const convertFromMultipleWords = (arrayOfWords: string[]): string => {
    let convertedValueArray: string[] = new Array<string>();
    arrayOfWords.forEach(word => {
        if (convertedValueArray.length > 0) {
            convertedValueArray.push(' ');
        }
        convertedValueArray.push(convertFromSingleWord(word.split('')));
    });
    return convertedValueArray.join('');
};

const convertNumberedToneToAccentTone = (value: string): string => {
    let converted: string = '';
    let separator: string = '';
    if (containsSpace(value)) {
        separator = ' ';
    }
    const arrayOfValue: string[] = value.split(separator);

    if (separator === ' ') {
        converted = convertFromMultipleWords(arrayOfValue);
    } else {
        converted = convertFromSingleWord(arrayOfValue);
    }

    return converted;
};

const processPinyin = (value: string): string => {
    value = value.toLowerCase();
    value = value.trim();
    return convertNumberedToneToAccentTone(value);
};

const hanziToPhoneticCharacters = (value: string): string => {
    let result: string = '';
    if (isPinyin(value)) {
        result = processPinyin(value);
    } else {

    }
    return result;
};

// exports for unit tests
export default {
    hanziToPhoneticCharacters,
    processPinyin,
    convertNumberedToneToAccentTone,
    convertFromMultipleWords,
    convertFromSingleWord,
    separateSyllables,
    convertFromSyllable
};