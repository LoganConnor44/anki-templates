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
    public phonicOrientation: string = 'over';

    private _content: JSXBase.HTMLAttributes<HTMLDivElement>;

    private _plecoHref: string;
    
    protected getContent() {
        return this._content;
    }

    protected getPlecoHref() {
        return this._plecoHref;
    }
    protected setPlecoHref() {
        this._plecoHref = `plecoapi://x-callback-url/df?hw=${ this.hanzi }`;
    }

    protected getHanziWithoutPunctuation(): Array<string> {
        return this.hanzi
            .split('')
            .filter(char => /\p{Script=Han}/u.test(char));
    }

    render() {
        this.setPlecoHref();
        
        const hanzisWithoutPunctuation: Array<string> = this.getHanziWithoutPunctuation();
        const phonics: Array<string> = this.phonic.split(',');
        class HanziAndPhonic {
            character: string;
            phonic: string;
        }
        if (this.phonicOrientation === 'next-to' && phonics.length === hanzisWithoutPunctuation.length) {
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
                        <a id='pleco-link' href={ this.getPlecoHref() }>
                            <tr>
                                { 
                                    hanziAndPhonics.map((x: HanziAndPhonic) => {
                                        return  <Fragment>
                                                    <td id='hanzi'>
                                                        <span>{ x.character }</span>
                                                    </td>
                                                    <td id='phonic' class={ this.orientation === 'question' ? 'no-show' : '' }>
                                                        <span>{ x.phonic }</span>
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
                <a id='pleco-link' href={ this.getPlecoHref() }>
                    <ruby id={ this.idForStyles }>
                        { 
                            hanziAndPhonics.map((x: HanziAndPhonic) => {
                                return  <Fragment>
                                            <div id={ this.orientation === 'answer' || this.idForStyles === 'phonic-only' ? '' : 'no-show'}>
                                                { x.character }
                                            </div>
                                            <rp>(</rp>
                                                <rt id={ this.idForStyles + '-phonic' }>
                                                    { (this.orientation === 'question' && this.idForStyles === 'phonic-only') || this.orientation === 'answer' ? x.phonic : '' }
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