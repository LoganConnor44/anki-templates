import { h, Component, Prop } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";

@Component({
	tag: 'material-beautify-sentence',
    styleUrl: 'styles/content-sentence.css',
    shadow: true
})
export class ContentSentence {

    @Prop()
	public sentence: string;
    @Prop()
	public phonic: string;

    private _content: JSXBase.HTMLAttributes<HTMLDivElement>;
    private _sentence: JSXBase.HTMLAttributes<HTMLDivElement>;
    private _phonic: JSXBase.HTMLAttributes<HTMLDivElement>;

    protected getContent() {
        return this._content;
    }
    protected setContent() {
        this._content =
            <div id='sentence'>
                <ruby>
                    { this.getSentence() }
                    { this.getPhonic() }
                </ruby>
            </div>
        ;
    }

    protected getSentence() {
        return this._sentence;
    }
    protected setSentence() {
        this._sentence = 
            <div id='primary-hanzi-sentence'>{ this.sentence }</div>
        ;
    }

    protected getPhonic() {
        return this._phonic;
    }
    protected setPhonic() {
        this._phonic = 
            <rt id='sentence-phonetic'>{ this.phonic }</rt>
        ;
    }

    render() {
        this.setSentence();
        this.setPhonic();  
        this.setContent();

        return this.getContent();
    }
}