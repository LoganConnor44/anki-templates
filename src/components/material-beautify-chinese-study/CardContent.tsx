import { h, Component, Prop, Host } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";

@Component({
	tag: 'material-beautify-content',
    styleUrl: 'styles/card-content.css',
    shadow: true
})
export class CardContent {
    @Prop()
	public vocab: string;
    @Prop()
	public phonic: string;
    @Prop()
    public sentence: string;
    @Prop()
    public sentencePhonic: string;
    @Prop()
    public orientation: string;
    @Prop()
    public meaning: string;

    private _content: JSXBase.HTMLAttributes<HTMLDivElement>;
    private _plecoLink: JSXBase.HTMLAttributes<HTMLDivElement>;
    private _phonic: JSXBase.HTMLAttributes<HTMLDivElement>;

    protected getContent() {
        return this._content;
    }
    protected setContent() {
        if (this.orientation === "question") {
            this._content =
                <Host>
                    <material-beautify-hanzi-with-phonic hanzi={ this.vocab } 
                        phonic={ this.phonic }
                        idForStyles='vocabulary'
                        orientation={ this.orientation } />
                    <material-beautify-hanzi-with-phonic hanzi={ this.sentence } 
                        phonic={ this.sentencePhonic }
                        idForStyles='sentence'
                        orientation={ this.orientation } />
                </Host>
            ;
        } else {
            this._content =
                <Host>
                    <material-beautify-hanzi-with-phonic hanzi={ this.vocab } 
                        phonic={ this.phonic }
                        idForStyles='vocabulary'
                        orientation={ this.orientation } />
                    <material-beautify-hanzi-with-phonic hanzi={ this.sentence } 
                        phonic={ this.sentencePhonic }
                        idForStyles='sentence'
                        orientation={ this.orientation } />
                    <material-beautify-meaning meaning={ this.meaning }
                        idForStyles='vocabulary' />
                </Host>
            ;
        }
    }

    protected getPlecoLink() {
        return this._plecoLink;
    }
    protected setPlecoLink() {
        const href = `plecoapi://x-callback-url/df?hw=${ this.vocab }`;
        this._plecoLink = 
            <a id='pleco-link' href={ href }>
                <div id='primary-hanzi-primary-element'>{ this.vocab }</div>
            </a>
        ;
    }

    protected getPhonic() {
        return this._phonic;
    }
    protected setPhonic() {
        this._phonic = 
            <rt id='phonetic'>{ this.phonic }</rt>
        ;
    }

    render() {
        this.setPlecoLink();
        if (this.orientation !== 'question') {
            this.setPhonic();
        }
        this.setContent();

        return this.getContent();
    }
}