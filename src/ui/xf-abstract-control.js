import  '../xf-model.js';
import {BoundElement} from "../BoundElement";
import {css} from "lit-element";

/**
 * `xf-abstract-control` -
 * is a general class for control elements.
 *
 * @customElement
 * @polymer
 * @appliesMixin BoundElementMixin
 */
export default class XfAbstractControl extends BoundElement {

    static get properties() {
        return {
            ...super.properties,
            value:{
                type: String
            },
            control:{
                type:Object
            }
        };
    }

/*
    render() {
        return html`
            <slot></slot>
        `;
    }
*/


    constructor(){
        super();
        this.value = "";
        this.control = {};
    }

    firstUpdated(_changedProperties) {
        // console.log('AbstractControl firstUpdated ', this);
        this.display = this.style.display;
        // this.control = this.shadowRoot.querySelector('#control');
        // this.control = this.shadowRoot.getElementById('control');

        this.addEventListener('value-changed', e => {
           console.log('value-changed ', e);
           this.handleModelItemProperties();
        });
    }



    /**
     * (re)apply all state properties to this control.
     */
    async refresh() {
    // refresh() {
        console.log('### XfAbstractControl.refresh on : ', this);


        const currentVal = this.value;

        // if(this.repeated) return ;
        if(this.isNotBound()) return;
        // this.handleModelItemProperties();

        this.evalInContext();
        if(this.isBound()){
            // this.control = this.shadowRoot.getElementById('control');
            this.modelItem = this.getModelItem();
            this.value = this.modelItem.value;

            // if(!this.closest('xf-form').ready) return; // state change event do not fire during init phase (initial refresh)
            // if(!this._getForm().ready) return; // state change event do not fire during init phase (initial refresh)
            // this.requestUpdate();
            // this.handleModelItemProperties();
            // this.requestUpdate();

            if(currentVal !== this.value){
                this.dispatchEvent(new CustomEvent('value-changed', {}));
            }

        }
        await this.updateComplete;

    }

/*
    updated(){
        super.updated();
        this.handleModelItemProperties();
    }
*/

    handleModelItemProperties(){
        const control = this.children[1]; // child in second slot

        this.handleRequired(control);
        this.handleReadonly(control);
        this.handleValid(control);
        this.handleRelevant();
    }

    _getForm(){
        return this.getModel().parentNode;
    }

    handleRequired(control) {
        // console.log('mip required', this.modelItem.required);
        if (this.isRequired() !== this.modelItem.required) {
            if (this.modelItem.required) {
                // this.control.setAttribute('required','required');
                // if(this.control === {}){
                // console.log('control ', this.children[1])
                    // this.control = this.getElementById('control');
                    // this.control = this.children[1]; // child in second slot
                // }
                // this.control.setAttribute('required','required');
                control.setAttribute('required','required');
                this.dispatchEvent(new CustomEvent('required', {}));
            } else {
                this.control.removeAttribute('required');
                this.dispatchEvent(new CustomEvent('optional', {}));
            }
        }
    }

    handleReadonly(control){
        // console.log('mip readonly', this.modelItem.isReadonly);

        if (this.isReadonly(control) !== this.modelItem.readonly) {
            if (this.modelItem.readonly) {
                control.setAttribute('readonly','readonly');
                this.dispatchEvent(new CustomEvent('readonly', {}));
            }
            if(!this.modelItem.readonly){
                control.removeAttribute('readonly');
                this.dispatchEvent(new CustomEvent('readwrite', {}));
            }
        }
    }

    handleValid(control){
        // console.log('mip valid', this.modelItem.required);
        if (this.isValid(control) !== this.modelItem.required) {
            if (this.modelItem.required) {
                this.dispatchEvent(new CustomEvent('valid', {}));
            } else {
                this.dispatchEvent(new CustomEvent('invalid', {}));
            }
        }
    }

    handleRelevant(){
        // console.log('mip valid', this.modelItem.enabled);
        if (this.isEnabled() !== this.modelItem.relevant) {
            if (this.modelItem.relevant) {
                this.dispatchEvent(new CustomEvent('enabled', {}));
                this._fadeIn(this, this.display);
            } else {
                this.dispatchEvent(new CustomEvent('disabled', {}));
                this._fadeOut(this);
            }
        }
    }



/*
    setValue(node, newVal) {

        const m = this.getModelItem();
        m.value =
        // m.setNodeValue(newVal);

        if (node.nodeType === node.ATTRIBUTE_NODE) {
            node.nodeValue = newVal;
        } else {
            node.textContent = newVal;
        }

    }
*/


/*
    getValue() {
        // console.log('getValue nodeset ', this.nodeset);
        if (this.nodeset.nodeType === Node.ELEMENT_NODE) {
            return this.nodeset.textContent;
        }
        return this.nodeset;
        // return this.getModelItem().modelItem.value;
    }
*/

    getControlValue(){};


    isRequired(){
        // if(this.control.required){
        console.log('isRequired',this);
        // this.control = this.shadowRoot.querySelector('#control');
        this.control = this.shadowRoot.getElementById('control');
        if(!this.control) return false;
        if(this.control.hasAttribute('required')){
            return true;
        }
        return false;
    }

    isValid(control){
        if(control.valid){
            return true;
        }
        return false;
    }

    isReadonly(control){
        if(control.hasAttribute('readonly')){
            return true;
        }
        return false;
    }

    isEnabled(){
        if(this.style.display === 'none' || this.classList.contains('non-relevant')){
            return false;
        }
        return true;
    }

    _fadeOut(el){
        el.style.opacity = 1;

        (function fade() {
            if ((el.style.opacity -= .1) < 0) {
                el.style.display = "none";
            } else {
                requestAnimationFrame(fade);
            }
        })();
    };

    _fadeIn(el, display){
        el.style.opacity = 0;
        el.style.display = display || "block";

        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += .1) > 1)) {
                el.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    };

}

window.customElements.define('xf-abstract-control', XfAbstractControl);
