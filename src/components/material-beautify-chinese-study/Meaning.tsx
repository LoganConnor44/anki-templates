import { h, Component, Prop, Host } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";

@Component({
	tag: 'material-beautify-meaning',
    styleUrl: 'styles/meaning.css',
    shadow: true
})
export class Meaning {

    @Prop()
	public meaning: string;
    @Prop()
    public idForStyles: string;

    private _content: JSXBase.HTMLAttributes<HTMLDivElement>;
    
    protected getContent() {
        return this._content;
    }
    protected setContent() {
        this._content =
            <p id={ this.idForStyles + '-meaing' }>{ this.meaning }</p>
        ;
    }

    public render() {
        this.setContent();

        return this.getContent();
    }
}