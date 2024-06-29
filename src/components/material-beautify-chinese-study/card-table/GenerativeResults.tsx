import { h, Component, Prop } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';

@Component({
	tag: 'material-beautify-ai-results',
	styleUrl: '../styles/generative-results.css',
	shadow: true,
})
export class GenerativeResults {
	@Prop()
	public generatedContent: string;

	private _content: JSXBase.HTMLAttributes<HTMLTableElement>;

	private parseResults() {
		return JSON.parse(this.generatedContent);
	}

	private getHeaders(results: any[]) {
		if (results.length === 0) {
			return [];
		}
		return Object.keys(results[0]);
	}

	protected getContent() {
		return this._content;
	}

	protected setContent() {
		const results = this.parseResults();
		const headers = this.getHeaders(results);
		this._content = (
			<table>
				<thead>
					<tr>
						{headers.map(header => (
							<th>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{results.map(result => (
						<tr>
							{headers.map(header => (
								<td>{result[header]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	}

	render() {
		this.setContent();
		return this.getContent();
	}
}
