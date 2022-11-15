import { h, Component, Prop, Watch, Element } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";

@Component({
	tag: 'material-beautify-meaning',
    styleUrl: '../styles/meaning.css',
    shadow: true
})
export class Meaning {

    @Element() 
    private element: HTMLElement;

    @Prop()
	public meaning: string;
    @Prop()
    public orientation: string;
    @Prop()
    public idForStyles: string;

    private _content: JSXBase.HTMLAttributes<HTMLDivElement>;

    /**
     * This method is used it is just not called directly like the IDE may think it should be
     */
     @Watch('orientation')
     // @ts-ignore
     private showItems() : void {
         const primaryItem = this.element.shadowRoot.querySelector('.meaning');
         primaryItem.className = primaryItem.className.replace('no-show', 'fade-in');
     }
    
    protected getContent() : JSXBase.HTMLAttributes<HTMLDivElement> {
        return this._content;
    }
    protected setContent() : void {
        this._content =
            <p id={ this.idForStyles + '-meaning' } class='meaning no-show'>{ this.meaning }</p>
        ;
    }

    public render() : JSXBase.HTMLAttributes<HTMLDivElement>{
        this.setContent();

        return this.getContent();
    }
}