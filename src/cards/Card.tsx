import { h } from '@stencil/core';
import * as OpenCC from 'opencc-js';
import { HanziType } from '../enums/HanziType';

abstract class Card {
	private _primaryVocab: string;ß
    private _secondaryVocab: string;
    private _primarySentence: string;
    private _secondarySentence: string;
    private _vocabDefinition: string;
    private _sentenceDefinition: string;
    private _vocabPhonic: string;
    private _sentencePhonic: string;
    private _orientation: string;
    private _forceAutoGeneration: boolean = false;
    private _primaryHanziType: string = 'simplified';
    private _conversionConfig: object = { from: 'cn', to: 'tw' };
    private _html: HTMLElement;

    private isEmptyStringBlankStringNullOrUndefined = (value: String): boolean => value === null || value === undefined || value === "" || value.trim().length == 0;

    constructor(primeVocab: string, primeSent: string, vocabDef: string, sentDef: string, orient: string) {
        this.primaryVocab = primeVocab;
        this.primarySentence = primeSent;
        this.vocabDefinition = vocabDef;
        this.sentenceDefinition = sentDef;
        this.orientation = orient;
        this.setHtml();
    }

    protected get primaryVocab(): string {
        if (!this.isEmptyStringBlankStringNullOrUndefined(this._primaryVocab)) {
			return this._primaryVocab.trim();
		}
		return "";
    }
    protected set primaryVocab(value: string) {
        this._primaryVocab = value;
    }
    protected get secondaryVocab(): string {
        if (!this.isEmptyStringBlankStringNullOrUndefined(this._secondaryVocab) && !this.forceAutoGeneration) {
			return this._secondaryVocab.trim();
		}

		const converter = OpenCC.Converter(this.conversionConfig);
		return converter(this.primaryVocab);
    }
    protected set secondaryVocab(value: string) {
        this._secondaryVocab = value;
    }
    protected get primarySentence(): string {
        if (!this.isEmptyStringBlankStringNullOrUndefined(this._primarySentence)) {
			return this._primarySentence.trim();
		}
		return "";
    }
    protected set primarySentence(value: string) {
        this._primarySentence = value;
    }
    protected get secondarySentence(): string {
        return this._secondarySentence;
    }
    protected set secondarySentence(value: string) {
        this._secondarySentence = value;
    }
    protected get vocabDefinition(): string {
        return this._vocabDefinition;
    }
    protected set vocabDefinition(value: string) {
        this._vocabDefinition = value;
    }
    protected get sentenceDefinition(): string {
        return this._sentenceDefinition;
    }
    protected set sentenceDefinition(value: string) {
        this._sentenceDefinition = value;
    }
    protected get vocabPhonic(): string {
        return this._vocabPhonic;
    }
    protected set vocabPhonic(value: string) {
        this._vocabPhonic = value;
    }
    protected get sentencePhonic(): string {
        return this._sentencePhonic;
    }
    protected set sentencePhonic(value: string) {
        this._sentencePhonic = value;
    }
    protected get orientation(): string {
        return this._orientation;
    }
    protected set orientation(value: string) {
        this._orientation = value;
    }
    protected get forceAutoGeneration(): boolean {
        return this._forceAutoGeneration;
    }
    protected get primaryHanziType(): string {
        return this._primaryHanziType;
    }
    protected set primaryHanziType(value: string) {
		switch (value.trim().toLowerCase()) {
			case 'traditional':
				this._primaryHanziType = HanziType.TRADITIONAL;
				break;
			case 'simplified':
			default:
				this._primaryHanziType = HanziType.SIMPLIFIED;
				break;
		}
    }
    protected get conversionConfig(): object {
        if (this.getHanziType() === HanziType.TRADITIONAL) {
			this._conversionConfig = { from: 'tw', to: 'cn' };
		}
        return this._conversionConfig;
    }
    protected set conversionConfig(value: object) {
        this._conversionConfig = value;
    }
    public get html(): HTMLElement {
        return this._html;
    }
    private setHtml() {
        const plecoLink: string = `plecoapi://x-callback-url/df?hw=${ this.primaryVocab }`;
        const content: HTMLElement = 
			<div id='chinese-card-content'>
				<p>
					<ruby>
						<a id='pleco-link' href={ plecoLink }>
							<div id='primary-hanzi-primary-element'>{ this.primaryVocab }</div>
							<div id='secondary-hanzi-primary-element'>{ this.secondaryVocab }</div>
						</a>
						<rt id='phonetic'>{ this.vocabPhonic }</rt>
					</ruby>
				</p>
				<div id='sentence'>
					<ruby>
						<div id='primary-hanzi-sentence'>{ this.primarySentence }</div>
						<div id='secondary-hanzi-sentence'>{ this.secondarySentence }</div>
						<rt id='sentence-phonetic'>{ this.sentencePhonic }</rt>
					</ruby>
				</div>
				<div id='english'>
					<p id='single-word-meaning'>{ this.vocabDefinition }</p>
					<p id='sentence-meaning'>{ this.sentenceDefinition }</p>
				</div>
				<div id='stroke-order'></div>
				<div id='primary-hanzi-secondary-element'>{ this.primaryVocab }</div>
				<div id='secondary-hanzi-secondary-element'>{ this.secondaryVocab }</div>
				<div id='audio'></div>
			</div>
		;

        this._html = content;
    }
    protected get primaryHanziPrimaryElement(): HTMLElement {
        return this.html.querySelector('#primary-hanzi-primary-element');
    }
    protected get secondaryHanziPrimaryElement(): HTMLElement {
        return this.html.querySelector('#secondary-hanzi-primary-element');
    }
    protected get primaryHanziSecondaryElement(): HTMLElement {
        return this.html.querySelector('#primary-hanzi-secondary-element');
    }
    protected get secondaryHanziSecondaryElement(): HTMLElement {
        return this.html.querySelector('#secondary-hanzi-secondary-element');
    }
    protected get wordMeaningElement(): HTMLElement {
        return this.html.querySelector('#single-word-meaning');
    }
    protected get sentenceMeaningElement(): HTMLElement {
        return this.html.querySelector('#sentence-meaning');
    }
    protected get phoneticElement(): HTMLElement {
        return this.html.querySelector('#phonetic');
    }
    protected get sentencePhoneticElement(): HTMLElement {
        return this.html.querySelector('#sentence-phonetic');
    }
    protected get primarySentenceElement(): HTMLElement {
        return this.html.querySelector('#primary-hanzi-sentence');
    }
    protected get secondarySentenceElement(): HTMLElement {
        return this.html.querySelector('#secondary-hanzi-sentence');
    }
    protected get audioAnimationElement(): HTMLElement {
        return this.html.querySelector('#audio');
    }

    public getHanziType(): HanziType {
		let hanziType: HanziType;
		switch (this.primaryHanziType.trim().toLowerCase()) {
			case 'traditional':
				hanziType = HanziType.TRADITIONAL;
				break;
			case 'simplified':
			default:
				hanziType = HanziType.SIMPLIFIED;
				break;
		}
		return hanziType;
	}

    protected processAppropriateElements(): void {
        //each child member will give their own logic for this method
    }
}

export default Card;