/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { DisplayType } from "./enums/DisplayType";
export { DisplayType } from "./enums/DisplayType";
export namespace Components {
    interface MaterialBeautifyCard {
        "meaning": string;
        "orientation": string;
        "phonicOrientation": string;
        "primaryHanziType": string;
        "primaryVocab": string;
        "secondarySentence": string;
        "secondaryVocab": string;
        "sentence": string;
        "sentenceMeaning": string;
        "sentencePhonic": string;
        "type": string;
        "vocabPhonic": string;
    }
    interface MaterialBeautifyChineseStudy {
        /**
          * Recognized card orientations: `question` | `answer`
         */
        "cardOrientation": string;
        /**
          * Recognized card types: `recognition` | `sentence` | `tones` | `writing` | `audio` | `secondary-sentence` | `secondary-recognition`
         */
        "cardType": string;
        /**
          * Option to always generate secondary character values and phonic values
         */
        "forceAutoGeneration": boolean;
        "getVersion": () => Promise<string>;
        /**
          * All English language words allowed
         */
        "meaning": string;
        /**
          * Most forms of numbered pinyin allowed
         */
        "numberedPinyin": string;
        /**
          * Recognized phonic orientations: `over` | `next-to`
         */
        "phonicOrientation": string;
        /**
          * Recognized phonics: `pinyin` | `zhuyin`
         */
        "preferredPhonic": string;
        /**
          * All characters allowed
         */
        "primaryCharacter": string;
        /**
          * All characters allowed
         */
        "primaryCharacterSentence": string;
        /**
          * Recognized hanzi typoes: 'simplified' | 'traditional'
         */
        "primaryHanziType": string;
        /**
          * All characters allowed
         */
        "secondaryCharacter": string;
        /**
          * All characters allowed
         */
        "secondaryCharacterSentence": string;
        /**
          * All English language words allowed
         */
        "sentenceMeaning": string;
        /**
          * Most forms of numbered pinyin allowed
         */
        "sentenceNumberedPinyin": string;
    }
    interface MaterialBeautifyContent {
        "meaning": string;
        "orientation": string;
        "phonic": string;
        "phonicOrientation": string;
        "secondarySentence": string;
        "secondaryVocab": string;
        "sentence": string;
        "sentenceMeaning": string;
        "sentencePhonic": string;
        "type": string;
        "vocab": string;
    }
    interface MaterialBeautifyHanziWithPhonic {
        "alternativeHanzi": string;
        "alternativePhonic": string;
        "displayType": DisplayType;
        "hanzi": string;
        "idForStyles": string;
        "orientation": string;
        "phonic": string;
        "phonicOrientation": string;
    }
    interface MaterialBeautifyMeaning {
        "idForStyles": string;
        "meaning": string;
        "orientation": string;
    }
    interface MaterialBeautifyType {
        "cardType": string;
        "primaryHanziType": string;
    }
    interface MaterialBeautifyWriting {
        "hanzi": string;
    }
}
declare global {
    interface HTMLMaterialBeautifyCardElement extends Components.MaterialBeautifyCard, HTMLStencilElement {
    }
    var HTMLMaterialBeautifyCardElement: {
        prototype: HTMLMaterialBeautifyCardElement;
        new (): HTMLMaterialBeautifyCardElement;
    };
    interface HTMLMaterialBeautifyChineseStudyElement extends Components.MaterialBeautifyChineseStudy, HTMLStencilElement {
    }
    var HTMLMaterialBeautifyChineseStudyElement: {
        prototype: HTMLMaterialBeautifyChineseStudyElement;
        new (): HTMLMaterialBeautifyChineseStudyElement;
    };
    interface HTMLMaterialBeautifyContentElement extends Components.MaterialBeautifyContent, HTMLStencilElement {
    }
    var HTMLMaterialBeautifyContentElement: {
        prototype: HTMLMaterialBeautifyContentElement;
        new (): HTMLMaterialBeautifyContentElement;
    };
    interface HTMLMaterialBeautifyHanziWithPhonicElement extends Components.MaterialBeautifyHanziWithPhonic, HTMLStencilElement {
    }
    var HTMLMaterialBeautifyHanziWithPhonicElement: {
        prototype: HTMLMaterialBeautifyHanziWithPhonicElement;
        new (): HTMLMaterialBeautifyHanziWithPhonicElement;
    };
    interface HTMLMaterialBeautifyMeaningElement extends Components.MaterialBeautifyMeaning, HTMLStencilElement {
    }
    var HTMLMaterialBeautifyMeaningElement: {
        prototype: HTMLMaterialBeautifyMeaningElement;
        new (): HTMLMaterialBeautifyMeaningElement;
    };
    interface HTMLMaterialBeautifyTypeElement extends Components.MaterialBeautifyType, HTMLStencilElement {
    }
    var HTMLMaterialBeautifyTypeElement: {
        prototype: HTMLMaterialBeautifyTypeElement;
        new (): HTMLMaterialBeautifyTypeElement;
    };
    interface HTMLMaterialBeautifyWritingElement extends Components.MaterialBeautifyWriting, HTMLStencilElement {
    }
    var HTMLMaterialBeautifyWritingElement: {
        prototype: HTMLMaterialBeautifyWritingElement;
        new (): HTMLMaterialBeautifyWritingElement;
    };
    interface HTMLElementTagNameMap {
        "material-beautify-card": HTMLMaterialBeautifyCardElement;
        "material-beautify-chinese-study": HTMLMaterialBeautifyChineseStudyElement;
        "material-beautify-content": HTMLMaterialBeautifyContentElement;
        "material-beautify-hanzi-with-phonic": HTMLMaterialBeautifyHanziWithPhonicElement;
        "material-beautify-meaning": HTMLMaterialBeautifyMeaningElement;
        "material-beautify-type": HTMLMaterialBeautifyTypeElement;
        "material-beautify-writing": HTMLMaterialBeautifyWritingElement;
    }
}
declare namespace LocalJSX {
    interface MaterialBeautifyCard {
        "meaning"?: string;
        "orientation"?: string;
        "phonicOrientation"?: string;
        "primaryHanziType"?: string;
        "primaryVocab"?: string;
        "secondarySentence"?: string;
        "secondaryVocab"?: string;
        "sentence"?: string;
        "sentenceMeaning"?: string;
        "sentencePhonic"?: string;
        "type"?: string;
        "vocabPhonic"?: string;
    }
    interface MaterialBeautifyChineseStudy {
        /**
          * Recognized card orientations: `question` | `answer`
         */
        "cardOrientation"?: string;
        /**
          * Recognized card types: `recognition` | `sentence` | `tones` | `writing` | `audio` | `secondary-sentence` | `secondary-recognition`
         */
        "cardType"?: string;
        /**
          * Option to always generate secondary character values and phonic values
         */
        "forceAutoGeneration"?: boolean;
        /**
          * All English language words allowed
         */
        "meaning"?: string;
        /**
          * Most forms of numbered pinyin allowed
         */
        "numberedPinyin"?: string;
        /**
          * Recognized phonic orientations: `over` | `next-to`
         */
        "phonicOrientation"?: string;
        /**
          * Recognized phonics: `pinyin` | `zhuyin`
         */
        "preferredPhonic"?: string;
        /**
          * All characters allowed
         */
        "primaryCharacter"?: string;
        /**
          * All characters allowed
         */
        "primaryCharacterSentence"?: string;
        /**
          * Recognized hanzi typoes: 'simplified' | 'traditional'
         */
        "primaryHanziType"?: string;
        /**
          * All characters allowed
         */
        "secondaryCharacter"?: string;
        /**
          * All characters allowed
         */
        "secondaryCharacterSentence"?: string;
        /**
          * All English language words allowed
         */
        "sentenceMeaning"?: string;
        /**
          * Most forms of numbered pinyin allowed
         */
        "sentenceNumberedPinyin"?: string;
    }
    interface MaterialBeautifyContent {
        "meaning"?: string;
        "orientation"?: string;
        "phonic"?: string;
        "phonicOrientation"?: string;
        "secondarySentence"?: string;
        "secondaryVocab"?: string;
        "sentence"?: string;
        "sentenceMeaning"?: string;
        "sentencePhonic"?: string;
        "type"?: string;
        "vocab"?: string;
    }
    interface MaterialBeautifyHanziWithPhonic {
        "alternativeHanzi"?: string;
        "alternativePhonic"?: string;
        "displayType"?: DisplayType;
        "hanzi"?: string;
        "idForStyles"?: string;
        "orientation"?: string;
        "phonic"?: string;
        "phonicOrientation"?: string;
    }
    interface MaterialBeautifyMeaning {
        "idForStyles"?: string;
        "meaning"?: string;
        "orientation"?: string;
    }
    interface MaterialBeautifyType {
        "cardType"?: string;
        "primaryHanziType"?: string;
    }
    interface MaterialBeautifyWriting {
        "hanzi"?: string;
    }
    interface IntrinsicElements {
        "material-beautify-card": MaterialBeautifyCard;
        "material-beautify-chinese-study": MaterialBeautifyChineseStudy;
        "material-beautify-content": MaterialBeautifyContent;
        "material-beautify-hanzi-with-phonic": MaterialBeautifyHanziWithPhonic;
        "material-beautify-meaning": MaterialBeautifyMeaning;
        "material-beautify-type": MaterialBeautifyType;
        "material-beautify-writing": MaterialBeautifyWriting;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "material-beautify-card": LocalJSX.MaterialBeautifyCard & JSXBase.HTMLAttributes<HTMLMaterialBeautifyCardElement>;
            "material-beautify-chinese-study": LocalJSX.MaterialBeautifyChineseStudy & JSXBase.HTMLAttributes<HTMLMaterialBeautifyChineseStudyElement>;
            "material-beautify-content": LocalJSX.MaterialBeautifyContent & JSXBase.HTMLAttributes<HTMLMaterialBeautifyContentElement>;
            "material-beautify-hanzi-with-phonic": LocalJSX.MaterialBeautifyHanziWithPhonic & JSXBase.HTMLAttributes<HTMLMaterialBeautifyHanziWithPhonicElement>;
            "material-beautify-meaning": LocalJSX.MaterialBeautifyMeaning & JSXBase.HTMLAttributes<HTMLMaterialBeautifyMeaningElement>;
            "material-beautify-type": LocalJSX.MaterialBeautifyType & JSXBase.HTMLAttributes<HTMLMaterialBeautifyTypeElement>;
            "material-beautify-writing": LocalJSX.MaterialBeautifyWriting & JSXBase.HTMLAttributes<HTMLMaterialBeautifyWritingElement>;
        }
    }
}
