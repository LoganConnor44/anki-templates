import Card from "./Card";

class Recognition extends Card {
	constructor(primeVocab: string, primeSent: string, vocabDef: string, sentDef: string, orient: string) {
		super(primeVocab, primeSent, vocabDef, sentDef, orient);
		this.processAppropriateElements();
	}

	protected processAppropriateElements(): void {
		console.log(this.html);
		this.secondaryHanziPrimaryElement.style.display = 'none';
		this.primaryHanziSecondaryElement.style.display = 'none';
		this.secondaryHanziSecondaryElement.style.display = 'none';
		this.secondarySentenceElement.style.display = 'none';
		this.sentenceMeaningElement.style.display = 'none';

		if (this.orientation === 'question') {
			this.phoneticElement.style.display = 'none';
			this.sentencePhoneticElement.style.display = 'none'
			this.wordMeaningElement.style.display = 'none';
		}
		if (this.orientation === 'answer') {
			this.phoneticElement.style.display = 'block';
			this.wordMeaningElement.style.display = 'block';
		}
	}
}

export default Recognition;