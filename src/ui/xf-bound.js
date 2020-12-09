import {LitElement, html, css} from 'lit-element';
import XfAbstractControl from "./xf-abstract-control.js";
/**
 * `xf-bound`
 * a generic wrapper for controls
 *
 * @customElement
 * @demo demo/index.html
 */
class XfBound extends XfAbstractControl {

    static get styles() {
        return css`
        :host {
          display: inline-block;
        }
        `;
    }

    static get properties() {
        return {
            ...super.properties,
            updateEvent:{
                type: String,
                attribute:'update-event'
            },
            valueProp:{
                type:String,
                attribute:'value-prop'
            }
        };
    }

    constructor(){
        super();
        this.control = {};
        this.updateEvent='';
        this.valueProp='value'; //default

    }

    render() {
        return html`
           <slot name="label"></slot> 
           <slot></slot>      
           <slot name="alert"></slot>   
           <slot name="hint"></slot>   
        `;
    }

    firstUpdated(_changedProperties) {
        console.log('firstUpdated ', _changedProperties);
        super.firstUpdated(_changedProperties);
        console.log('updateEvent', this.updateEvent);

        //get the default slot and use first element as control
        const slots = this.shadowRoot.querySelectorAll('slot');
        slots.forEach(slot => {
           if(!slot.hasAttribute('name')){
               // console.log('default slot ', slot);
               // console.log('default slot ', slot.assignedElements({flatten:true}));

               const defaultSlot = slot;
               const control = slot.assignedElements({flatten:true})[0];
               this.control = control;
               console.log('xf-bound control: ', this.control);

               control.addEventListener(this.updateEvent,(e) => {
                   console.log('eventlistener ', this.updateEvent);
                   const modelitem = this.getModelItem();
                   console.log('>>>>modelItem ', modelitem);

                   // this.control[this.value] = modelitem.value;


                   console.log('>>>>modelItem ', this.valueProp);

                   const sv = document.createElement('xf-setvalue');
                   this.shadowRoot.appendChild(sv);
                   // sv.setValue(modelitem,this.control.value);
                   sv.setValue(modelitem,this.control[this.valueProp]);
                   // console.log('updated modelitem ', modelitem);
               });


           }
        });



/*
        this.firstElementChild.addEventListener(this.updateEvent,(e) => {
            console.log('eventlistener ', this.updateEvent);
           const modelitem = this.getModelItem()
           // modelitem.value = this.firstElementChild.value;

            const sv = document.createElement('xf-setvalue');
            this.shadowRoot.appendChild(sv);
            sv.setValue(modelitem,this.firstElementChild.value);


            // console.log('updated modelitem ', modelitem);
        });
*/
    }

/*
    refresh() {
        // refresh() {
        console.log('### XfAbstractControl.refresh on : ', this);


        const currentVal = this.value;

        // if(this.repeated) return ;
        // await this.updateComplete;
        if(this.isNotBound()) return;

        this.evalInContext();
        if(this.isBound()){
            // this.control = this.shadowRoot.getElementById('control');
            this.modelItem = this.getModelItem();
            this.value = this.modelItem.value;

            // if(!this.closest('xf-form').ready) return; // state change event do not fire during init phase (initial refresh)
            // if(!this._getForm().ready) return; // state change event do not fire during init phase (initial refresh)
            if(currentVal !== this.value){
                this.dispatchEvent(new CustomEvent('value-changed', {}));
            }
            // this.requestUpdate();
            this.handleModelItemProperties();
        }
    }
*/

/*
    async refresh(){
        await this.updateComplete;
        super.refresh();
        console.log('xf-bound refresh');


        // this.control.value = this.getModelItem().value;
        console.log('valueProp ', this.valueProp);
        this.control.setAttribute(this.valueProp, this.getModelItem().value);


        const elements = this.querySelectorAll(':scope > *');
        elements.forEach(element => {

            if (typeof element.refresh === 'function') {
                element.refresh();
            }

        });




    }
*/

}

window.customElements.define('xf-bound', XfBound);
