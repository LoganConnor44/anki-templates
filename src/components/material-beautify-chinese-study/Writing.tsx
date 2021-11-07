import { h, Component, Prop, Element } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";
import HanziWriter from 'hanzi-writer';

@Component({
	tag: 'material-beautify-writing',
    shadow: true
})
export class Writing {
    @Prop()
	public hanzi: string;
    @Prop()
	public phonic: string;

    @Element() 
    private element: HTMLElement;

    private _content: JSXBase.HTMLAttributes<HTMLDivElement>;

    protected getContent() {
        return this._content;
    }

    protected setContent() {
        this._content =
            <div id='stroke-order'></div>
        ;
    }

    private createStrokeOrderCharacter(): void {
		let delayBetweenAnimations: number = 500;
		let characters: Array<string> = this.hanzi.split('');
		let drawingArea: HTMLElement = this.element.shadowRoot.querySelector('#stroke-order');
		while (drawingArea.firstChild) {
			drawingArea.removeChild(drawingArea.firstChild);
		}
		let strokeOrderCharacters: Array<any> = [];

		for (var i = 0; i < characters.length; i++) {
			let idName = 'character-' + i;
			let node = document.createElement('div');
			node.id = idName;
			drawingArea.appendChild(node);

			let strokeOrderCharacter = HanziWriter.create(
				node,
				characters[i], {
					strokeColor: '#000000',
					width: 50,
					height: 50,
					padding: 1,
					delayBetweenStrokes: 500,
				}
			);
			strokeOrderCharacters.push(strokeOrderCharacter);
		}

		const animateNextCharacter = (current: number, hanziCharacters: Array<any>) => {
			const currentCharacter: any = hanziCharacters[current];
			const nextId: number = current + 1;
			const nextCharacter: any = hanziCharacters[nextId];
			const nextNextId: number = current + 2;
			const nextNextCharacter: any = hanziCharacters[nextNextId];
			const isLastCharacter = () => nextCharacter === undefined;
			const isNextCharacterTheLastCharacter = () => nextNextCharacter === undefined;

			setTimeout(() => {
				if (isLastCharacter()) {
					currentCharacter.animateCharacter();
				} else {
					if (isNextCharacterTheLastCharacter()) {
						nextCharacter.animateCharacter();
					} else {
						nextCharacter.animateCharacter({
							onComplete: () => animateNextCharacter(nextId, hanziCharacters)
						});
					}
				}
			}, delayBetweenAnimations);
		};

		const animateFirstCharacterOnly = () => {
			let firstCharacter: any = strokeOrderCharacters[0];	
			firstCharacter.animateCharacter({
				onComplete: () => animateNextCharacter(0, strokeOrderCharacters)
			});
		};

		setTimeout(() => {
			animateFirstCharacterOnly()
		}, delayBetweenAnimations + delayBetweenAnimations);
	};

    componentDidRender() {
        this.createStrokeOrderCharacter();
    }

    render() {
        this.setContent();
        return this.getContent();
    }
}