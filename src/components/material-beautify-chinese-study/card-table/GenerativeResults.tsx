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

	/**
	 * Parses the `generatedContent` JSON string into row objects.
	 */
	private parseResults() {
		return JSON.parse(this.generatedContent);
	}

	/**
	 * Derives table headers from the first result object.
	 *
	 * @param results any[] The parsed array of row data objects.
	 */
	private getHeaders(results: any[]) {
		if (results === undefined || results.length === 0) {
			return [];
		}
		return Object.keys(results[0]);
	}

	protected getContent() {
		return this._content;
	}

	/**
	 * Renders a simple table with headers and rows from generated content.
	 */
	protected setContent() {
		const results = this.parseResults();
		const headers = this.getHeaders(results);
		this._content = (
			<table id="generative-results">
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
