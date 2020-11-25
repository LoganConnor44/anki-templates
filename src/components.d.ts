/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MaterialBeautifyChineseStudy {
        "ankiDroidJs": string;
        /**
          * Recognized card orientations: `question` | `answer`
         */
        "cardOrientation": string;
        /**
          * Recognized card types: `recognition` | `traditional` | `tones` | `writing` | `meaning`
         */
        "cardType": string;
        /**
          * All English language words allowed
         */
        "meaning": string;
        /**
          * Most forms of numbered pinyin allowed
         */
        "numberedPinyin": string;
        /**
          * Recognized phonics: `pinyin` | `zhuyin`
         */
        "preferredPhonic": string;
        /**
          * All English language words allowed
         */
        "sentenceMeaning": string;
        /**
          * Most forms of numbered pinyin allowed
         */
        "sentenceNumberedPinyin": string;
        /**
          * All characters allowed
         */
        "simplified": string;
        /**
          * All characters allowed
         */
        "simplifiedSentence": string;
        /**
          * All characters allowed
         */
        "traditional": string;
        /**
          * All characters allowed
         */
        "traditionalSentence": string;
    }
}
declare global {
    interface HTMLMaterialBeautifyChineseStudyElement extends Components.MaterialBeautifyChineseStudy, HTMLStencilElement {
    }
    var HTMLMaterialBeautifyChineseStudyElement: {
        prototype: HTMLMaterialBeautifyChineseStudyElement;
        new (): HTMLMaterialBeautifyChineseStudyElement;
    };
    interface HTMLElementTagNameMap {
        "material-beautify-chinese-study": HTMLMaterialBeautifyChineseStudyElement;
    }
}
declare namespace LocalJSX {
    interface MaterialBeautifyChineseStudy {
        "ankiDroidJs"?: string;
        /**
          * Recognized card orientations: `question` | `answer`
         */
        "cardOrientation"?: string;
        /**
          * Recognized card types: `recognition` | `traditional` | `tones` | `writing` | `meaning`
         */
        "cardType"?: string;
        /**
          * All English language words allowed
         */
        "meaning"?: string;
        /**
          * Most forms of numbered pinyin allowed
         */
        "numberedPinyin"?: string;
        /**
          * Recognized phonics: `pinyin` | `zhuyin`
         */
        "preferredPhonic"?: string;
        /**
          * All English language words allowed
         */
        "sentenceMeaning"?: string;
        /**
          * Most forms of numbered pinyin allowed
         */
        "sentenceNumberedPinyin"?: string;
        /**
          * All characters allowed
         */
        "simplified"?: string;
        /**
          * All characters allowed
         */
        "simplifiedSentence"?: string;
        /**
          * All characters allowed
         */
        "traditional"?: string;
        /**
          * All characters allowed
         */
        "traditionalSentence"?: string;
    }
    interface IntrinsicElements {
        "material-beautify-chinese-study": MaterialBeautifyChineseStudy;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "material-beautify-chinese-study": LocalJSX.MaterialBeautifyChineseStudy & JSXBase.HTMLAttributes<HTMLMaterialBeautifyChineseStudyElement>;
        }
    }
}
