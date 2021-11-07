import { h, Component, Prop } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";

@Component({
	tag: 'material-beautify-hanzi-with-phonic',
    styleUrl: 'styles/hanzi-with-phonic.css',
    shadow: true
})
export class HanziWithPhonic {

    @Prop()
	public hanzi: string;
    @Prop()
	public phonic: string;
    @Prop()
    public orientation: string;
    @Prop()
    public idForStyles: string;

    private _content: JSXBase.HTMLAttributes<HTMLDivElement>;
    private _hanzi: JSXBase.HTMLAttributes<HTMLDivElement>;
    private _phonic: JSXBase.HTMLAttributes<HTMLDivElement>;
    

    protected getContent() {
        return this._content;
    }
    protected setContent() {
        this._content =
            <div id={ this.idForStyles }>
                <ruby>
                    { this.getHanziWithPlecoLink() }
                    { this.getPhonic() }
                </ruby>
            </div>
        ;
    }

    protected getHanziWithPlecoLink() {
        return this._hanzi;
    }
    protected setHanziWithPlecoLink() {
        const href = `plecoapi://x-callback-url/df?hw=${ this.hanzi }`;
        this._hanzi = 
            <a id='pleco-link' href={ href }>
                <div id={ this.idForStyles }>{ this.hanzi }</div>
            </a>
        ;
    }

    protected getPhonic() {
        return this._phonic;
    }
    protected setPhonic() {
        this._phonic = 
            <rt id={ this.idForStyles + '-phonic' }>{ this.phonic }</rt>
        ;
    }

    render() {
        this.setHanziWithPlecoLink();
        if (this.orientation === 'answer' || this.idForStyles === 'phonic-only') {
            this.setPhonic();
        }
        this.setContent();

        return this.getContent();
    }
}