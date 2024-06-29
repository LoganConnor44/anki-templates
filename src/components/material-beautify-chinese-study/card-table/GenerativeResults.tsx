import { h, Component, Prop } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';

@Component({
	tag: 'material-beautify-ai-results',
	// styleUrl: '../styles/card-table.css',
	shadow: true,
})
export class GenerativeResults {
	@Prop()
	public generatedContent: string;

	private _content: JSXBase.HTMLAttributes<HTMLTableElement>;

	protected getContent() {
		return this._content;
	}

	protected setContent() {
		this._content = <table>{}</table>;
	}

	render() {
		// this.setType();
		this.setContent();
		return this.getContent();
	}
}
