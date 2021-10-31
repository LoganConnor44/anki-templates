import { h, Component, Prop } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";

@Component({
	tag: 'material-beautify-type',
    styleUrl: 'styles/card-type.css',
    shadow: true
})
export class CardType {

    @Prop()
	public cardType: string;

    private _content: JSXBase.HTMLAttributes<HTMLDivElement>;
    private _type: JSXBase.HTMLAttributes<HTMLDivElement>;

    protected getContent() {
        return this._content;
    }
    protected setContent() {
        this._content =
            this.getType()
        ;
    }

    protected getType() {
        return this._type;
    }
    protected setType() {
        this._type = 
            <p>{ this.cardType }</p>
        ;
    }

    render() {
        this.setType();
        this.setContent();

        return this.getContent();
    }
}