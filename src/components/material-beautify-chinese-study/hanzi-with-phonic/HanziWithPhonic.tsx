import { h, Component, Prop, Fragment, Element } from "@stencil/core";
import { JSXBase, Watch } from "@stencil/core/internal";

@Component({
	tag: 'material-beautify-hanzi-with-phonic',
	styleUrl: '../styles/hanzi-with-phonic.css',
	shadow: true
})
export class HanziWithPhonic {

	@Element()
	private element: HTMLElement;

	@Prop()
	public hanzi: string;
	@Prop()
	public phonic: string;
	@Prop()
	public orientation: string;
	@Prop()
	public idForStyles: string;
	@Prop()
	public phonicOrientation: string;

	private _content: JSXBase.HTMLAttributes<HTMLDivElement>;

	private _dictionaryLink: string;

	private _isPhonicPinyin: boolean;

	protected getContent() {
		return this._content;
	}

	protected getDictionaryLink() {
		return this._dictionaryLink;
	}
	protected setDictionaryLink() {
		this._dictionaryLink = `http://www.hanzii.net/search/word/${this.hanzi}`;
		if (navigator.userAgent.indexOf("Mobile") > 0) {
			this._dictionaryLink = `plecoapi://x-callback-url/df?hw=${this.hanzi}`;
		}
	}

	private setIsPhonicPinyin(): void {
		const containsLettersCaseInsensitive: RegExp = new RegExp(/[a-zA-Z]/);
		const regEx: RegExp = new RegExp(containsLettersCaseInsensitive.source);
		this._isPhonicPinyin = regEx.test(this.phonic);
	}

	private getIsPhonicPinyin(): boolean {
		return this._isPhonicPinyin;
	}

	protected getHanziWithoutPunctuation(): Array<string> {
		return this.hanzi
			.split('')
			.filter(char => /\p{Script=Han}/u.test(char));
	}

	private getVerticalNeutralPhonics(): Array<string> {
		let phonics = this.phonic.split(',');
		for (let i = 0; i < phonics.length; i++) {
			const lastItem = phonics[i].slice(-1);
			let deltaPhonic = phonics[i].split('');
			if (lastItem === '˙') {
				deltaPhonic.splice(0, 0, lastItem);
				deltaPhonic.pop();
			}
			phonics[i] = deltaPhonic.join('');
		}
		return phonics;
	}

	/**
	 * This method is used it is just not called directly like the IDE may think it should be
	 */
	@Watch('orientation')
	private showItems() {
		const isHorizontal = this.getIsPhonicPinyin() ?
			true :
			this.phonicOrientation == 'over' ? true : false;
		const hideClass = isHorizontal ? 'no-show-horizontal' : 'no-show-vertical';
		const fadeInClass = isHorizontal ? 'fade-in-horizontal' : 'fade-in-vertical';

		const primaryItems = this.element.shadowRoot.querySelectorAll('#primary-item-phonic');
		Array.from(primaryItems).forEach((el) => {
			el.className = el.className.replace(hideClass, fadeInClass);
		});
		const secondaryItems = this.element.shadowRoot.querySelectorAll('#secondary-item-phonic');
		Array.from(secondaryItems).forEach((el) => {
			el.className = el.className.replace(hideClass, fadeInClass);
		});
	}

	render() {
		this.setDictionaryLink();
		this.setIsPhonicPinyin();

		const hanzisWithoutPunctuation: Array<string> = this.getHanziWithoutPunctuation();
		const buildVerticalPhonicStructure: boolean = this.phonicOrientation === 'next-to' && 
			!this.getIsPhonicPinyin() && 
			this.phonic.split(',').length === hanzisWithoutPunctuation.length;

		class HanziAndPhonic {
			character: string;
			phonic: string;
		}

		if (buildVerticalPhonicStructure) {
			const phonics = this.getVerticalNeutralPhonics();
			let hanziAndPhonics: HanziAndPhonic[] = [];

			for (let index = 0; index < hanzisWithoutPunctuation.length; index++) {
				let hanziAndPhonic: HanziAndPhonic = new HanziAndPhonic();
				hanziAndPhonic.character = hanzisWithoutPunctuation[index];
				hanziAndPhonic.phonic = phonics[index];
				hanziAndPhonics.push(hanziAndPhonic);
			}

			this._content =
				<table class='table-center'>
					<tbody>
						<a id='dictionary-link' href={this.getDictionaryLink()}>
							<tr>
								{
									hanziAndPhonics.map((x: HanziAndPhonic) => {
										return <Fragment>
												<td id='primary-item'>
													{x.character}
												</td>
												<td id={this.idForStyles + '-phonic'} class='no-show-vertical vertical-phonic'>
													{
														x.phonic.split('').map((y: string, index: number) => {
															let displayY = y;
															if (x.phonic.length - 2 === index && 
																(x.phonic.slice(-1) === 'ˊ' || x.phonic.slice(-1) === 'ˇ' || x.phonic.slice(-1) === 'ˋ')
															) {
																displayY = y + x.phonic.slice(-1);
															} else if (y === 'ˊ' || y === 'ˇ' || y === 'ˋ') {
																return '';
															}
															return <Fragment>
																	<span>{displayY}</span>
																	<br />
																</Fragment>
															;
														})
													}
												</td>
											</Fragment>
										;
									})
								}
							</tr>
						</a>
					</tbody>
				</table>
				;
		} else {
			const phonics: Array<string> = this.phonic.split(',');
			let hanziAndPhonics: HanziAndPhonic[] = [];
			for (let index = 0; index < hanzisWithoutPunctuation.length; index++) {
				let hanziAndPhonic: HanziAndPhonic = new HanziAndPhonic();
				hanziAndPhonic.character = hanzisWithoutPunctuation[index];
				hanziAndPhonic.phonic = phonics[index];
				hanziAndPhonics.push(hanziAndPhonic);
			}

			this._content =
				<a id='dictionary-link' href={this.getDictionaryLink()}>
					<ruby id={this.idForStyles}>
						{
							hanziAndPhonics.map((x: HanziAndPhonic) => {
								return <Fragment>
										<div id='hanzi-with-ruby'>
											{x.character}
										</div>
										<rp>(</rp>
										<rt id={this.idForStyles + '-phonic'} class='no-show-horizontal horizontal-phonic'>
											{x.phonic}
										</rt>
										<rp>)</rp>
									</Fragment>
								;
							})
						}
					</ruby>
				</a>
			;

		}
		return this.getContent();
	}
}