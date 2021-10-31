import { h, Prop, Component, Host } from '@stencil/core';

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

    render() {
        return (
            <Host>
                <material-beautify-content class={this.type.toLowerCase()}
                    vocab={ this.primaryVocab } 
                    phonic={ this.vocabPhonic }
                    sentence={ this.sentence }
                    sentencePhonic={ this.sentencePhonic } />
                <material-beautify-type class={this.type.toLowerCase()} 
                    card-type={ this.type } />
            </Host>
        );
    }
}