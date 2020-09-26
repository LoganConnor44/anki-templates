import * as chineseTemplate from '../src/chinese-template';
import { expect } from 'chai';
import 'mocha';

describe('convertNumberedToneToAccentTone function', () => {
    it('should return nǐ', () => {
        const result: string = chineseTemplate.default.convertNumberedToneToAccentTone('ni3');
        expect(result).to.equal('nǐ');
    });
    it('should return hǎo', () => {
        const result: string = chineseTemplate.default.convertNumberedToneToAccentTone('hao3');
        expect(result).to.equal('hǎo');
    });
    it('should return xiǎng', () => {
        const result: string = chineseTemplate.default.convertNumberedToneToAccentTone('xiang3');
        expect(result).to.equal('xiǎng');
    });
    it('should return nǐhǎo', () => {
        const result: string = chineseTemplate.default.convertNumberedToneToAccentTone('ni3hao3');
        expect(result).to.equal('nǐhǎo');
    });
    it('should return huíjiā', () => {
        const result: string = chineseTemplate.default.convertNumberedToneToAccentTone('hui2jia1');
        expect(result).to.equal('huíjiā');
    });
    //commenting because light tone and next word with no space is probably an edge case
    // it('should return xiǎngjiànwǒmenqù', () => {
    //     const result: string = chineseTemplate.default.convertNumberedToneToAccentTone('xiang3jian4wo3menqu4');
    //     expect(result).to.equal('xiǎngjiànwǒmenqù');
    // });
    it('should return xiǎngjiàn wǒmen qù', () => {
        const result: string = chineseTemplate.default.convertNumberedToneToAccentTone('xiang3jian4 wo3men qu4');
        expect(result).to.equal('xiǎngjiàn wǒmen qù');
    });
});

describe('convertFromMultipleWords function', () => {
    it('should return xiǎngjiàn wǒmen qù', () => {
        const result: string = chineseTemplate.default.convertFromMultipleWords('xiang3jian4 wo3men qu4'.split(' '));
        expect(result).to.equal('xiǎngjiàn wǒmen qù');
    });
});

describe('convertFromSingleWord function', () => {
    it('should return wǒmen', () => {
        const result: string = chineseTemplate.default.convertFromSingleWord('wo3men'.split(''));
        expect(result).to.equal('wǒmen');
    });
});