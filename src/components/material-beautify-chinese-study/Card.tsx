import { h, Prop, Component, Host } from '@stencil/core';
import { JSXBase } from "@stencil/core/internal";

@Component({
	tag: 'material-beautify-card',
    styleUrl: 'styles/card.css',
    shadow: true
})
export class Card {
    @Prop()
	public primaryVocab: string;
    @Prop()
	public vocabPhonic: string;
    @Prop()
    public sentence: string;
    @Prop()
    public sentencePhonic: string;
    @Prop()
    public type: string;
    @Prop()
    public orientation: string;
    @Prop()
    public meaning: string;

    private _content: JSXBase.HTMLAttributes<HTMLDivElement>;

    protected getContent() {
        return this._content;
    }
    protected setContent() {
        this._content =
            <Host>
                <material-beautify-content class={this.type.toLowerCase()}
                    vocab={ this.primaryVocab } 
                    phonic={ this.vocabPhonic }
                    sentence={ this.sentence }
                    sentencePhonic={ this.sentencePhonic }
                    orientation={ this.orientation }
                    meaning={ this.meaning } />
                <material-beautify-type class={this.type.toLowerCase()} 
                    card-type={ this.type } />
            </Host>
        ;        
    }

    public render() {
        this.setContent();

        return this.getContent();
    }
}