import { h, Component, Prop } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { HanziType } from '../../../enums/HanziType';

@Component({
	tag: 'material-beautify-type',
	styleUrl: '../styles/card-type.css',
	shadow: true,
})
export class CardType {
	@Prop()
	public cardType: string;
	@Prop()
	public primaryHanziType: string;

	private _content: JSXBase.HTMLAttributes<HTMLDivElement>;
	private _type: JSXBase.HTMLAttributes<HTMLParagraphElement>;

	protected getContent() {
		return this._content;
	}

	protected setContent() {
		this._content = <div>{this.getType()}</div>;
	}

	protected getType() {
		return this._type;
	}

	protected setType() {
		let secondaryText: string;
		if (this.cardType === undefined) {
			return;
		}
		let type: string = this.cardType.toUpperCase().trim();
		if (this.cardType.indexOf('secondary') >= 0) {
			for (var enumMember in HanziType) {
				if (this.getHanziType() !== enumMember) {
					secondaryText = enumMember;
				}
			}
			type = this.cardType.toUpperCase().replace('SECONDARY', secondaryText).replace('-', ' ').replace('RECOGNITION', '').trim();
		}
		this._type = <p>{type}</p>;
	}

	public getHanziType(): HanziType {
		let hanziType: HanziType;
		switch (this.primaryHanziType) {
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

	render() {
		this.setType();
		this.setContent();
		return this.getContent();
	}
}
