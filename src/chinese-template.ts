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

class Zhuyin {

}

let vowels: Vowel[] = new Array<Vowel>();
vowels[0] = new Vowel('a');
vowels[1] = new Vowel('e');
vowels[2] = new Vowel('i');
vowels[3] = new Vowel('o');
vowels[4] = new Vowel('u');

const isPinyin = (value: string): boolean => toBoolean(value.search(/^[a-zA-Z0-9\s]*$/));
const toBoolean = (value: number): boolean => value >= 0 ? true : false;


const processPinyin = (value: string): string => {
    value = value.trim();
    return convertNumberedPinyinToAccented(value);
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

const createAppropriateVowelWitchAccent = (valueArray: Array<string>, toneNumber: number): Vowel => {
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

const replaceVowelWithAccentedVowel = (value: string, accentedVowel: Vowel): string => {
    const valueReversed: string = value.split('').reverse().join('');
    const valueWithAccentReversed: string = valueReversed.replace(
        accentedVowel.getVowel(),
        accentedVowel.getVowelWithTone()
    );
    return valueWithAccentReversed.split('').reverse().join('');
};

const replaceNumberWithAccentedVowel = (value: string, toneNumber: number): string => {
    const vowelsImmediatelyBeforeNumber: Array<string> = retrieveVowelsBeforeNumber(value);
    const vowelAccented: Vowel = createAppropriateVowelWitchAccent(vowelsImmediatelyBeforeNumber, toneNumber);
    return replaceVowelWithAccentedVowel(value, vowelAccented);
};

const convertNumberedPinyinToAccented = (value: string): string => {
    let convertedValue: string = '';
    const minimumOneOrMaxSixLettersCaseInsensitive: RegExp = new RegExp(/([a-zA-Z]{1,6})/);
    const numbersOneThroughFive: RegExp = new RegExp(/([1-5])/);
    const zeroOrOneSpaceCharacter: RegExp = new RegExp(/(\s*)/);
    const finalRegEx: RegExp = new RegExp(
        minimumOneOrMaxSixLettersCaseInsensitive.source +
        numbersOneThroughFive.source +
        zeroOrOneSpaceCharacter.source
    );
    let results: RegExpExecArray;
    while ((results = finalRegEx.exec(value)) !== null) {
        value = value.substr(results.index + results[0].length);
        const originalText: string = results[0];
        const romanLetters: string = results[1];
        const tone: number = parseInt(results[2]);
        const spaceCharacter: string = results[3];
        const accentedSyllable: string = replaceNumberWithAccentedVowel(romanLetters, tone);
        convertedValue += accentedSyllable + spaceCharacter;
    }
    return convertedValue;
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
    processPinyin
};