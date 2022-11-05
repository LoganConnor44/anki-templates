import { h, Component, Prop, Fragment } from "@stencil/core";
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
    @Prop()
    public phonicOrientation: string;

    private _content: JSXBase.HTMLAttributes<HTMLDivElement>;

    private _dictionaryLink: string;
    
    protected getContent() {
        return this._content;
    }

    protected getDictionaryLink() {
        return this._dictionaryLink;
    }
    protected setDictionaryLink() {
        this._dictionaryLink = `http://www.hanzii.net/search/word/${ this.hanzi }`;
        if ( navigator.userAgent.indexOf("Mobile") > 0 ) {
            this._dictionaryLink = `plecoapi://x-callback-url/df?hw=${ this.hanzi }`;
        }
    }

    protected getHanziWithoutPunctuation(): Array<string> {
        return this.hanzi
            .split('')
            .filter(char => /\p{Script=Han}/u.test(char));
    }

    private getVerticalNeutralPhonics(): Array <string> {
        let phonics = this.phonic.split(',');
        for (let i = 0; i < phonics.length; i++){
            const lastItem = phonics[i].slice(-1);
            let deltaPhonic = phonics[i].split('');
            if (lastItem === '˙') {
                deltaPhonic.splice(0, 0, lastItem);
                deltaPhonic.pop();
            }
            phonics[i] = deltaPhonic.join('');
        }
        return phonics;
    }

    render() {
        this.setDictionaryLink();

        const displayPhonic = (this.orientation === 'question' && this.idForStyles === 'phonic-only') || this.orientation === 'answer';
        const displayCharacter = this.orientation === 'answer' || this.idForStyles === 'phonic-only';
        const hanzisWithoutPunctuation: Array<string> = this.getHanziWithoutPunctuation();
        
        class HanziAndPhonic {
            character: string;
            phonic: string;
        }

        if (this.phonicOrientation === 'next-to' && this.phonic.split(',').length === hanzisWithoutPunctuation.length) {
            const phonics = this.getVerticalNeutralPhonics();
            let hanziAndPhonics: HanziAndPhonic[] = [];
            
            for (let index = 0; index < hanzisWithoutPunctuation.length; index++) {
                let hanziAndPhonic: HanziAndPhonic = new HanziAndPhonic();
                hanziAndPhonic.character = hanzisWithoutPunctuation[index];
                hanziAndPhonic.phonic = phonics[index];
                hanziAndPhonics.push(hanziAndPhonic);
            }

            this._content = 
                <table class='table-center'>
                    <tbody>
                        <a id='dictionary-link' href={ this.getDictionaryLink() }>
                            <tr>
                                { 
                                    hanziAndPhonics.map((x: HanziAndPhonic) => {
                                        return  <Fragment>
                                                    <td id='hanzi-with-table' class={displayCharacter ? 'fade-in' : '' } style={ {lineHeight: '1em', fontSize: '2em', verticalAlign: 'middle'} }>
                                                        { x.character }
                                                    </td>
                                                    <td id={ this.idForStyles + '-phonic' } class={displayPhonic ? 'fade-in' : '' } style={ {lineHeight: '1em', fontSize: '0.8em', verticalAlign: 'middle'} }>
                                                        {
                                                            displayPhonic ? 
                                                                x.phonic.split('').map((y: string, index: number) => {
                                                                    let displayY = y;
                                                                    if (x.phonic.length - 2 === index && (x.phonic.slice(-1) === 'ˊ' || x.phonic.slice(-1) === 'ˇ' || x.phonic.slice(-1) === 'ˋ')) {
                                                                        displayY = y + x.phonic.slice(-1);
                                                                    } else if (y === 'ˊ' || y === 'ˇ' || y === 'ˋ') {
                                                                        return '';
                                                                    }
                                                                    return <Fragment>
                                                                                <span>{displayY}</span>
                                                                                <br/>
                                                                            </Fragment>
                                                                    ;
                                                                }) :
                                                                ''
                                                        }
                                                    </td>
                                                </Fragment>
                                        ;
                                    })
                                }
                            </tr>
                        </a>
                    </tbody>
                </table>
            ;
        } else if (this.phonicOrientation === 'over') {
            const hanzisWithoutPunctuation: Array<string> = this.getHanziWithoutPunctuation();
            const phonics: Array<string> = this.phonic.split(',');
            let hanziAndPhonics: HanziAndPhonic[] = [];
            for (let index = 0; index < hanzisWithoutPunctuation.length; index++) {
                let hanziAndPhonic: HanziAndPhonic = new HanziAndPhonic();
                hanziAndPhonic.character = hanzisWithoutPunctuation[index];
                hanziAndPhonic.phonic = phonics[index];
                hanziAndPhonics.push(hanziAndPhonic);
            }

            this._content = 
                <a id='dictionary-link' href={ this.getDictionaryLink() }>
                    <ruby id={ this.idForStyles }>
                        {
                            hanziAndPhonics.map((x: HanziAndPhonic) => {
                                
                                return  <Fragment>
                                            <div id='hanzi-with-ruby' class={displayCharacter ? 'fade-in' : '' }>
                                                { x.character }
                                            </div>
                                            <rp>(</rp>
                                                <rt id={ this.idForStyles + '-phonic' } class={displayPhonic ? 'fade-in' : '' }>
                                                    { displayPhonic ? x.phonic : '' }
                                                </rt>
                                            <rp>)</rp>
                                        </Fragment>
                                ;
                            })
                        }
                    </ruby>
                </a>
            ;
            
        }
        return this.getContent();
    }
}