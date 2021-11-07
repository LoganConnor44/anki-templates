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
	public secondaryVocab: string;
    @Prop()
	public phonic: string;
    @Prop()
    public sentence: string;
    @Prop()
    public secondarySentence: string;
    @Prop()
    public sentencePhonic: string;
    @Prop()
    public orientation: string;
    @Prop()
    public meaning: string;
    @Prop()
    public sentenceMeaning: string;
    @Prop()
    public type: string;

    private _content: JSXBase.HTMLAttributes<HTMLDivElement>;
    private _phonic: JSXBase.HTMLAttributes<HTMLDivElement>;

    protected getContent() {
        return this._content;
    }
    protected setSecondaryRecognition() {
        if (this.orientation === "question") {
            this._content =
                <Host>
                    <material-beautify-hanzi-with-phonic hanzi={ this.secondaryVocab } 
                        phonic={ this.phonic }
                        idForStyles='primary-item'
                        orientation={ this.orientation } />
                    <material-beautify-hanzi-with-phonic hanzi={ this.secondarySentence } 
                        phonic={ this.sentencePhonic }
                        idForStyles='secondary-item'
                        orientation={ this.orientation } />
                </Host>
            ;
        } else {
            this._content =
                <Host>
                    <material-beautify-hanzi-with-phonic hanzi={ this.vocab } 
                        phonic={ this.phonic }
                        idForStyles='primary-item'
                        orientation={ this.orientation } />
                    <material-beautify-hanzi-with-phonic hanzi={ this.secondarySentence } 
                        phonic={ this.sentencePhonic }
                        idForStyles='secondary-item'
                        orientation={ this.orientation } />
                    <material-beautify-meaning meaning={ this.meaning }
                        idForStyles='vocabulary' />
                </Host>
            ;
        }
    }

    protected setAudio() {
        if (this.orientation === "question") {
            const availableAnimations: string[] = [
				'echo-spinner',
				'audio-line-spinner'
			];
			const randomAnimation: string = availableAnimations[Math.floor(Math.random() * availableAnimations.length)];
			if (randomAnimation === 'audio-line-spinner') {
                this._content =
                    <Host class={ randomAnimation }>
                        <div class='rect1'/>
                        <div class='rect2'/>
                        <div class='rect3'/>
                        <div class='rect4'/>
                        <div class='rect5'/>
                    </Host>
                ;
			} else {
                this._content =
                    <Host class={ randomAnimation }>
                        <div />
                    </Host>
            }
        } else {
            this._content =
                <Host>
                    <material-beautify-hanzi-with-phonic hanzi={ this.sentence } 
                        phonic={ this.sentencePhonic }
                        idForStyles='primary-item'
                        orientation={ this.orientation } />
                </Host>
            ;
        }
    }

    protected setSentence() {
        if (this.orientation === "question") {
            this._content =
                <Host>
                    <material-beautify-hanzi-with-phonic hanzi={ this.sentence } 
                        phonic={ this.sentencePhonic }
                        idForStyles='primary-item'
                        orientation={ this.orientation } />
                </Host>
            ;
        } else {
            this._content =
                <Host>
                    <material-beautify-hanzi-with-phonic hanzi={ this.sentence } 
                        phonic={ this.sentencePhonic }
                        idForStyles='primary-item'
                        orientation={ this.orientation } />
                    <material-beautify-meaning meaning={ this.sentenceMeaning }
                        idForStyles='sentence' />
                </Host>
            ;
        }
    }

    protected setTones() {
        if (this.orientation === "question") {
            this._content = 
                <Host>
                    <material-beautify-hanzi-with-phonic hanzi={ this.vocab } 
                        phonic={ this.phonic }
                        idForStyles='primary-item'
                        orientation={ this.orientation } />
                    <material-beautify-hanzi-with-phonic hanzi={ this.sentence } 
                        phonic={ this.sentencePhonic }
                        idForStyles='sentence'
                        orientation={ this.orientation } />
                </Host>;
        } else {
            this._content = 
                <Host>
                    <material-beautify-hanzi-with-phonic hanzi={ this.vocab } 
                        phonic={ this.phonic }
                        idForStyles='primary-item'
                        orientation={ this.orientation } />
                    <material-beautify-hanzi-with-phonic hanzi={ this.sentence } 
                        phonic={ this.sentencePhonic }
                        idForStyles='secondary-item'
                        orientation={ this.orientation } />
                    <material-beautify-meaning meaning={ this.sentenceMeaning }
                        idForStyles='sentence' />
                </Host>;
        }
    }

    protected setRecognition() {
        if (this.orientation === "question") {
            this._content =
                <Host>
                    <material-beautify-hanzi-with-phonic hanzi={ this.vocab } 
                        phonic={ this.phonic }
                        idForStyles='primary-item'
                        orientation={ this.orientation } />
                    <material-beautify-hanzi-with-phonic hanzi={ this.sentence } 
                        phonic={ this.sentencePhonic }
                        idForStyles='secondary-item'
                        orientation={ this.orientation } />
                </Host>
            ;
        } else {
            this._content =
                <Host>
                    <material-beautify-hanzi-with-phonic hanzi={ this.vocab } 
                        phonic={ this.phonic }
                        idForStyles='primary-item'
                        orientation={ this.orientation } />
                    <material-beautify-hanzi-with-phonic hanzi={ this.sentence } 
                        phonic={ this.sentencePhonic }
                        idForStyles='secondary-item'
                        orientation={ this.orientation } />
                    <material-beautify-meaning meaning={ this.meaning }
                        idForStyles='vocabulary' />
                </Host>
            ;
        }
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
        this.setPhonic();
        switch (this.type.toLowerCase()) {
            case "secondary-recognition" :
                this.setSecondaryRecognition();
                break;
            case "secondary-sentence" :
                break;
            case "audio" :
                this.setAudio()
                break;
            case "tones" :
                this.setTones();
                break;
            case "sentence" :
                this.setSentence();
                break;
            case "recognition" :
            default :
                this.setRecognition();
                break;
        }

        return this.getContent();
    }
}