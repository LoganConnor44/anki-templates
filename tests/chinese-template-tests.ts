import * as chineseTemplate from '../src/chinese-template';
import { expect } from 'chai';
import 'mocha';

describe('Testing Main Method hanziToPhoneticCharacters() Can Process Pinyin With No Spaces', () => {
    const ni3 = 'nǐ';
    it('should return ' + ni3, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(0, 'ni3');
        expect(result).to.equal(ni3);
    });

    const hao3 = 'hǎo';
    it('should return ' + hao3, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(0, 'hao3');
        expect(result).to.equal(hao3);
    });

    const xiang3 = 'xiǎng';
    it('should return ' + xiang3, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(0, 'xiang3');
        expect(result).to.equal(xiang3);
    });

    const ni3hao3 = 'nǐhǎo';
    it('should return ' + ni3hao3, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(0, 'ni3hao3');
        expect(result).to.equal(ni3hao3);
    });

    const hui2jia1 = 'huíjiā';
    it('should return ' + hui2jia1, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(0, 'hui2jia1');
        expect(result).to.equal(hui2jia1);
    });

    const wo3xiang3jian4ni3 = 'wǒxiǎngjiànnǐ';
    it('should return ' + wo3xiang3jian4ni3, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(0, 'wo3xiang3jian4ni3');
        expect(result).to.equal(wo3xiang3jian4ni3);
    });
});

describe('Testing Main Method hanziToPhoneticCharacters() Can Process Pinyin With Spaces', () => {
    const ni3_hao3 = 'nǐ hǎo';
    it('should return ' + ni3_hao3, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(0, 'ni3 hao3');
        expect(result).to.equal('nǐ hǎo');
    });

    const hui2_jia1 = 'huí jiā';
    it('should return ' + hui2_jia1, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(0, 'hui2 jia1');
        expect(result).to.equal('huí jiā');
    });

    const iamhisfriend = 'Wǒ shì tā de péngyou';
    it('should return ' + iamhisfriend, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(0, 'Wo3 shi4 ta1 de peng2you');
        expect(result).to.equal(iamhisfriend);
    });
});

describe('Testing Main Method hanziToPhoneticCharacters() Can Process Zhuyin With No Spaces', () => {
    const ni3 = 'ㄋㄧˇ';
    it('should return ' + ni3, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(1, 'ni3');
        expect(result).to.equal(ni3);
    });

    const hao3 = 'ㄏㄠˇ';
    it('should return ' + hao3, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(1, 'hao3');
        expect(result).to.equal(hao3);
    });

    const xiang3 = 'ㄒㄧㄤˇ';
    it('should return ' + xiang3, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(1, 'xiang3');
        expect(result).to.equal(xiang3);
    });

    const ni3hao3 = 'ㄋㄧˇㄏㄠˇ';
    it('should return ' + ni3hao3, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(1, 'ni3hao3');
        expect(result).to.equal(ni3hao3);
    });

    const hui2jia1 = 'ㄏㄨㄟˊㄐㄧㄚ';
    it('should return ' + hui2jia1, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(1, 'hui2jia1');
        expect(result).to.equal(hui2jia1);
    });

    const wo3xiang3jian4ni3 = 'ㄨㄛˇㄒㄧㄤˇㄐㄧㄢˋㄋㄧˇ';
    it('should return ' + wo3xiang3jian4ni3, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(1, 'wo3xiang3jian4ni3');
        expect(result).to.equal(wo3xiang3jian4ni3);
    });

    const ni3menzhong1wen2wo3hui2jia1 = 'ㄋㄧˇㄇㄣ˙ㄓㄨㄥㄨㄣˊㄨㄛˇㄏㄨㄟˊㄐㄧㄚ';
    it('should return ' + ni3menzhong1wen2wo3hui2jia1, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(1, 'ni3menzhong1wen2wo3hui2jia1');
        expect(result).to.equal(ni3menzhong1wen2wo3hui2jia1);
    });
});

describe('Testing Main Method hanziToPhoneticCharacters() Can Process Zhuyin With Spaces', () => {
    const ni3_hao3 = 'ㄋㄧˇ ㄏㄠˇ';
    it('should return ' + ni3_hao3, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(1, 'ni3 hao3');
        expect(result).to.equal(ni3_hao3);
    });

    const hui2_jia1 = 'ㄏㄨㄟˊ ㄐㄧㄚ';
    it('should return ' + hui2_jia1, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(1, 'hui2 jia1');
        expect(result).to.equal(hui2_jia1);
    });

    const iamhisfriend = 'ㄨㄛˇ ㄕˋ ㄊㄚ ㄉㄜ˙ ㄆㄥˊ ㄧㄡ˙';
    it('should return ' + iamhisfriend, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(1, 'Wo3 shi4 ta1 de peng2you');
        expect(result).to.equal(iamhisfriend);
    });

    const pleaseTellMeTheAnswer = 'ㄑㄧㄥˇ ㄍㄠˋㄙㄨ˙ㄨㄛˇ ㄉㄚˊㄢˋ';
    it('should return ' + pleaseTellMeTheAnswer, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(1, "Qing3 gao4su wo3 da2'an4.");
        expect(result).to.equal(pleaseTellMeTheAnswer);
    });
});

describe('Testing Convenience Function containsNumerics()', () => {
    const testValue: string = 'hello3';
    const expectation: boolean = true;
    it('should return ' + expectation, () => {
        const result: boolean = chineseTemplate.default.containsNumerics(testValue);
        expect(result).to.equal(expectation);
    });

    const testValue2: string = 'No numerics here.';
    const expectation2: boolean = false;
    it('should return ' + expectation2, () => {
        const result: boolean = chineseTemplate.default.containsNumerics(testValue2);
        expect(result).to.equal(expectation2);
    });
});

describe('Testing Convenience Function isPinyin()', () => {
    const testValue: string = 'hao3';
    const expectation: boolean = true;
    it('should return ' + expectation, () => {
        const result: boolean = chineseTemplate.default.isPinyin(testValue);
        expect(result).to.equal(expectation);
    });

    const testValue2: string = 'ㄋㄧˇ ㄏㄠˇ';
    const expectation2: boolean = false;
    it('should return ' + expectation2, () => {
        const result: boolean = chineseTemplate.default.isPinyin(testValue2);
        expect(result).to.equal(expectation2);
    });
});

describe('Testing Convenience Function parseTone()', () => {
    const emptyString: string = '';
    const spaceValue: string = ' ';
    const stringedFive: string = '5';
    const expectationLightTone: number = 5;

    it('should return ' + expectationLightTone, () => {
        const result: number = chineseTemplate.default.parseTone(emptyString);
        expect(result).to.equal(expectationLightTone);
    });
    it('should return ' + expectationLightTone, () => {
        const result: number = chineseTemplate.default.parseTone(spaceValue);
        expect(result).to.equal(expectationLightTone);
    });
    it('should return ' + expectationLightTone, () => {
        const result: number = chineseTemplate.default.parseTone(stringedFive);
        expect(result).to.equal(expectationLightTone);
    });

    const stringedOne: string = '1';
    const stringedTwo: string = '2';
    const stringedThree: string = '3';
    const stringedFour: string = '4';

    const expectationFirstTone: number = 1;
    const expectationSecondTone: number = 2;
    const expectationThirdTone: number = 3;
    const expectationFourthTone: number = 4;

    it('should return ' + expectationFirstTone, () => {
        const result: number = chineseTemplate.default.parseTone(stringedOne);
        expect(result).to.equal(expectationFirstTone);
    });
    it('should return ' + expectationSecondTone, () => {
        const result: number = chineseTemplate.default.parseTone(stringedTwo);
        expect(result).to.equal(expectationSecondTone);
    });
    it('should return ' + expectationThirdTone, () => {
        const result: number = chineseTemplate.default.parseTone(stringedThree);
        expect(result).to.equal(expectationThirdTone);
    });
    it('should return ' + expectationFourthTone, () => {
        const result: number = chineseTemplate.default.parseTone(stringedFour);
        expect(result).to.equal(expectationFourthTone);
    });
});

describe('Testing processNumberedPinyin() Removes Leading And Trailing Spaces', () => {
    const ni3_hao3 = 'nǐ hǎo';
    it('should return ' + ni3_hao3, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(0, '  ni3 hao3   ');
        expect(result).to.equal('nǐ hǎo');
    });

    const hui2_jia1 = 'huí jiā';
    it('should return ' + hui2_jia1, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(0, 'hui2 jia1     ');
        expect(result).to.equal('huí jiā');
    });

    const hui2jia1 = 'ㄏㄨㄟˊㄐㄧㄚ';
    it('should return ' + hui2jia1, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(1, '     hui2jia1');
        expect(result).to.equal(hui2jia1);
    });

    const wo3xiang3jian4ni3 = 'ㄨㄛˇㄒㄧㄤˇㄐㄧㄢˋㄋㄧˇ';
    it('should return ' + wo3xiang3jian4ni3, () => {
        const result: string = chineseTemplate.default.hanziToPhoneticCharacters(1, 'wo3xiang3jian4ni3');
        expect(result).to.equal(wo3xiang3jian4ni3);
    });
});

describe('Testing convertNumberedPinyinTo() Can Return Zhuyin And Pinyin', () => {
    const ni3_hao3 = 'nǐ hǎo';
    it('should return ' + ni3_hao3, () => {
        const result: string = chineseTemplate.default.convertNumberedPinyinTo(0, 'ni3 hao3');
        expect(result).to.equal(ni3_hao3);
    });

    const wo3xiang3jian4ni3 = 'ㄨㄛˇㄒㄧㄤˇㄐㄧㄢˋㄋㄧˇ';
    it('should return ' + wo3xiang3jian4ni3, () => {
        const result: string = chineseTemplate.default.convertNumberedPinyinTo(1, 'wo3xiang3jian4ni3');
        expect(result).to.equal(wo3xiang3jian4ni3);
    });
});

describe('Testing replaceNumberedRomanLettersWithZhuyin() Zhuyin Results', () => {
    const ni3 = 'ㄋㄧˇ';
    it('should return ' + ni3, () => {
        const result: string = chineseTemplate.default.replaceNumberedRomanLettersWithZhuyin('ni', 3);
        expect(result).to.equal(ni3);
    });

    const wo3xiang3jian4ni3 = 'ㄒㄧㄤ˙ㄐㄧㄢˋ';
    it('should return ' + wo3xiang3jian4ni3, () => {
        const result: string = chineseTemplate.default.replaceNumberedRomanLettersWithZhuyin('xiangjian', 4);
        expect(result).to.equal(wo3xiang3jian4ni3);
    });
});

describe('Testing setToneWithPossibleMalformedPinyinHandling() Results When Giving Malformed Pinyin', () => {
    const phonic = new chineseTemplate.default.Zhuyin('men');
    const letters: string = 'zhong';
    const tone: number = 1;
    const expectation: string = 'ㄇㄣ˙';
    const phonic2 = new chineseTemplate.default.Zhuyin('zhong');
    const letters2: string = '';
    const expectation2: string = 'ㄓㄨㄥ';

    it('should return ' + expectation, () => {
        chineseTemplate.default.setToneWithPossibleMalformedPinyinHandling(phonic, letters, tone);
        expect(phonic.getCharacterWithTone()).to.equal(expectation);
    });

    it('should return ' + expectation2, () => {
        chineseTemplate.default.setToneWithPossibleMalformedPinyinHandling(phonic2, letters2, tone);
        expect(phonic2.getCharacterWithTone()).to.equal(expectation2);
    });
});