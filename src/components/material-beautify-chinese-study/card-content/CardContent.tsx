import { h, Component, Prop, Host, Element } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import HanziWriter from 'hanzi-writer';
import { DisplayType } from '../../../enums/DisplayType';

@Component({
	tag: 'material-beautify-content',
	styleUrl: '../styles/card-content.css',
	shadow: true,
})
export class CardContent {
	@Prop()
	public vocab: string;
	@Prop()
	public secondaryVocab: string;
	@Prop()
	public phonic: string;
	@Prop()
	public sentence: string;
	@Prop()
	public secondarySentence: string;
	@Prop()
	public sentencePhonic: string;
	@Prop()
	public orientation: string;
	@Prop()
	public meaning: string;
	@Prop()
	public sentenceMeaning: string;
	@Prop()
	public type: string;
	@Prop()
	public phonicOrientation: string;

	@Element()
	private element: HTMLElement;

	private _content: JSXBase.HTMLAttributes<HTMLDivElement>;
	private _phonic: JSXBase.HTMLAttributes<HTMLDivElement>;

	protected getContent() {
		return this._content;
	}

	protected setWriting() {
		if (this.orientation === 'question') {
			this._content = (
				<Host>
					<material-beautify-hanzi-with-phonic
						hanzi={this.vocab}
						phonic={this.phonic}
						idForStyles="phonic-only"
						orientation={this.orientation}
						display-type={DisplayType.PRIMARY}
						phonic-orientation={this.phonicOrientation}
					/>
				</Host>
			);
		} else {
			this._content = <material-beautify-writing hanzi={this.vocab} />;
		}
	}

	protected setSecondarySentence() {
		this._content = (
			<Host>
				<material-beautify-hanzi-with-phonic
					hanzi={this.secondarySentence}
					phonic={this.sentencePhonic}
					orientation={this.orientation}
					phonic-orientation={this.phonicOrientation}
					display-type={DisplayType.PRIMARY}
					idForStyles="primary-item"
				/>
				<hr />
				{this.orientation === 'answer' && (
					<material-beautify-hanzi-with-phonic
						hanzi={this.sentence}
						phonic={this.sentencePhonic}
						orientation={this.orientation}
						phonic-orientation={this.phonicOrientation}
						display-type={DisplayType.SECONDARY}
						idForStyles="primary-item"
					/>
				)}
				<material-beautify-meaning meaning={this.sentenceMeaning} orientation={this.orientation} display-type={DisplayType.SECONDARY} idForStyles="sentence" />
			</Host>
		);
	}

	protected setSecondaryRecognition() {
		this._content = (
			<Host>
				<material-beautify-hanzi-with-phonic
					hanzi={this.secondaryVocab}
					phonic={this.phonic}
					idForStyles="primary-item"
					orientation={this.orientation}
					display-type={DisplayType.PRIMARY}
					phonic-orientation={this.phonicOrientation}
				/>
				<hr />
				<material-beautify-hanzi-with-phonic
					hanzi={this.secondarySentence}
					alternativeHanzi={this.vocab}
					phonic={this.sentencePhonic}
					alternativePhonic={this.phonic}
					idForStyles="secondary-item"
					orientation={this.orientation}
					display-type={DisplayType.SECONDARY}
					phonic-orientation={this.phonicOrientation}
				/>
				<material-beautify-meaning meaning={this.meaning} orientation={this.orientation} idForStyles="vocabulary" />
			</Host>
		);
	}

	protected setAudio() {
		if (this.orientation === 'question') {
			this._content = (
				<Host>
					<div class="audio-line-spinner">
						<div class="music-bar 1"></div>
						<div class="music-bar 2"></div>
						<div class="music-bar 3"></div>
						<div class="music-bar 4"></div>
						<div class="music-bar 5"></div>
						<div class="music-bar 6"></div>
						<div class="music-bar 7"></div>
						<div class="music-bar 8"></div>
						<div class="music-bar 9"></div>
						<div class="music-bar 10"></div>
					</div>
				</Host>
			);
		} else {
			this._content = (
				<Host>
					<material-beautify-hanzi-with-phonic
						hanzi={this.sentence}
						phonic={this.sentencePhonic}
						idForStyles="primary-item"
						orientation={this.orientation}
						phonic-orientation={this.phonicOrientation}
					/>
				</Host>
			);
		}
	}

	protected setSentence() {
		this._content = (
			<Host>
				<material-beautify-hanzi-with-phonic
					hanzi={this.sentence}
					phonic={this.sentencePhonic}
					idForStyles="primary-item"
					orientation={this.orientation}
					display-type={DisplayType.PRIMARY}
					phonic-orientation={this.phonicOrientation}
				/>

				<material-beautify-meaning meaning={this.sentenceMeaning} orientation={this.orientation} display-type={DisplayType.SECONDARY} idForStyles="sentence" />
			</Host>
		);
	}

	protected setTones() {
		this._content = (
			<Host>
				<material-beautify-hanzi-with-phonic
					hanzi={this.vocab}
					phonic={this.phonic}
					idForStyles="primary-item"
					orientation={this.orientation}
					display-type={DisplayType.PRIMARY}
					phonic-orientation={this.phonicOrientation}
				/>
				<hr />
				<material-beautify-hanzi-with-phonic
					hanzi={this.sentence}
					phonic={this.sentencePhonic}
					idForStyles="secondary-item"
					orientation={this.orientation}
					display-type={DisplayType.SECONDARY}
					phonic-orientation={this.phonicOrientation}
				/>
				<material-beautify-meaning meaning={this.sentenceMeaning} orientation={this.orientation} idForStyles="sentence" />
			</Host>
		);
	}

	protected setRecognition() {
		this._content = (
			<Host>
				<material-beautify-hanzi-with-phonic
					hanzi={this.vocab}
					phonic={this.phonic}
					orientation={this.orientation}
					phonic-orientation={this.phonicOrientation}
					display-type={DisplayType.PRIMARY}
					idForStyles="primary-item"
				/>
				<hr />
				<material-beautify-hanzi-with-phonic
					hanzi={this.sentence}
					phonic={this.sentencePhonic}
					orientation={this.orientation}
					phonic-orientation={this.phonicOrientation}
					display-type={DisplayType.SECONDARY}
					idForStyles="secondary-item"
				/>
				<material-beautify-meaning meaning={this.meaning} orientation={this.orientation} idForStyles="vocabulary" />
			</Host>
		);
	}

	protected getPhonic() {
		return this._phonic;
	}
	protected setPhonic() {
		this._phonic = <rt id="phonetic">{this.phonic}</rt>;
	}

	/**
	 * Creates and animates stroke order diagrams for the current `vocab`.
	 */
	private createStrokeOrderCharacter(): void {
		let delayBetweenAnimations: number = 500;
		let characters: Array<string> = this.vocab.split('');
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

			let strokeOrderCharacter = HanziWriter.create(node, characters[i], {
				strokeColor: '#000000',
				width: 50,
				height: 50,
				padding: 1,
				delayBetweenStrokes: 500,
			});
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
							onComplete: () => animateNextCharacter(nextId, hanziCharacters),
						});
					}
				}
			}, delayBetweenAnimations);
		};

		const animateFirstCharacterOnly = () => {
			let firstCharacter: any = strokeOrderCharacters[0];
			firstCharacter.animateCharacter({
				onComplete: () => animateNextCharacter(0, strokeOrderCharacters),
			});
		};

		setTimeout(() => {
			animateFirstCharacterOnly();
		}, delayBetweenAnimations + delayBetweenAnimations);
	}

	/**
	 * Selects and renders the appropriate content layout based on the card `type`.
	 */
	private processCardContent() {
		switch (this.type.toLowerCase()) {
			case 'secondary-recognition':
				this.setSecondaryRecognition();
				break;
			case 'secondary-sentence':
				this.setSecondarySentence();
				break;
			case 'audio':
				this.setAudio();
				break;
			case 'tones':
				this.setTones();
				break;
			case 'sentence':
				this.setSentence();
				break;
			case 'writing':
				this.setWriting();
				break;
			case 'recognition':
			default:
				this.setRecognition();
				break;
		}
	}

	render() {
		this.setPhonic();
		this.processCardContent();

		return this.getContent();
	}

	componentDidRender() {
		if (this.type.toLowerCase() === 'writing' && this.orientation === 'answer') {
			this.createStrokeOrderCharacter();
		}
	}
}
