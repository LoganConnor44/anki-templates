
import ChineseData from "./ChineseData";

class Recognition extends ChineseData {
	// constructor(primeVocab: string, primeSent: string, vocabDef: string, sentDef: string, orient: string) {
	// 	super(primeVocab, primeSent, vocabDef, sentDef, orient);
	// 	this.content = this.getMainElement();
	// }

	// protected processAppropriateElements(): void {
	// 	this.secondaryHanziPrimaryElement.style.display = 'none';
	// 	this.primaryHanziSecondaryElement.style.display = 'none';
	// 	this.secondaryHanziSecondaryElement.style.display = 'none';
	// 	this.secondarySentenceElement.style.display = 'none';
	// 	this.sentenceMeaningElement.style.display = 'none';

	// 	if (this.orientation === 'question') {
	// 		this.phoneticElement.style.display = 'none';
	// 		this.sentencePhoneticElement.style.display = 'none'
	// 		this.wordMeaningElement.style.display = 'none';
	// 	}
	// 	if (this.orientation === 'answer') {
	// 		this.phoneticElement.style.display = 'block';
	// 		this.wordMeaningElement.style.display = 'block';
	// 	}
	// }

	//private getMainElement() {
		// let mainElement: HTMLDivElement = document.createElement('div') as HTMLDivElement;
		// mainElement.id = 'chinese-card-content';
		// let paragraph: HTMLParagraphElement = document.createElement('p') as HTMLParagraphElement;

		// let ruby: HTMLElement = document.createElement('ruby') as HTMLElement;

		// let plecoLink: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
		// plecoLink.id = 'pleco-link';
		// plecoLink.href = `plecoapi://x-callback-url/df?hw=${ this.primaryVocab }`;

		// let hanziElement: HTMLDivElement = document.createElement('div') as HTMLDivElement;
		// hanziElement.id = 'primary-hanzi-primary-element';
		// hanziElement.innerText = this.primaryVocab;

		// plecoLink.appendChild(hanziElement);
		// ruby.appendChild(plecoLink);

		// let phonic: HTMLElement = document.createElement('rt') as HTMLElement;
		// phonic.id = 'phonetic';
		// phonic.innerText = this.vocabPhonic;

		// ruby.appendChild(phonic);
		// paragraph.appendChild(ruby);
		// mainElement.appendChild(paragraph);

		// this.mainHtmlElement = mainElement;

	// 	return 	<div id='chinese-card-content'>          
	// 				<p>
	// 					<ruby>
	// 						<a id='pleco-link' href=''>
	// 							<div id='primary-hanzi-primary-element'>{ this.primaryVocab }</div>
	// 						</a>
	// 						<rt id='phonetic'>{ this.vocabPhonic }</rt>
	// 					</ruby>
	// 				</p>
	// 			</div>;
	// }
}

export default Recognition;