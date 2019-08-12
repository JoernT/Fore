import {html, PolymerElement} from '../assets/@polymer/polymer/polymer-element.js';
import {BoundElementMixin} from './BoundElementMixin.js';

/**
 * `xf-abstract-control`
 * general class for bound elements
 *
 * @customElement
 * @polymer
 * @appliesMixin BoundElementMixin
 * @demo demo/index.html
 */
export class XfAbstractControl extends BoundElementMixin(PolymerElement) {

    static get properties() {
        return {
            label: {
                type: String
            },
            alert: {
                type: String,
                observer: '_updateAlert'
            },
            readonly: {
                type: Boolean,
                value: false,
                observer: '_updateReadonly'
            },
            required: {
                type: Boolean,
                value: false,
                observer: '_updateRequired'
            },
            relevant: {
                type: Boolean,
                value: true,
                observer: '_updateRelevant'
            },
            valid: {
                type: Boolean,
                value: true,
                observer: '_updateValid'
            },
            datatype: {
                type: String,
                value: 'String',
                observer: '_updateDatatype'
            },
            value: {
                type: String,
                observer: '_updateValue'
            },
            incremental: {
                type: Boolean,
                value: false
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        // console.log('### XfControl connected ', this);
    }

    init() {
        console.log('### init ', this);
        console.log('### init modelItem', this.modelItem);
        if (!this.repeated) {
            super.init();
        }
        this.applyProperties();
        this.attachListeners();

    }

    refresh() {
        // console.log('### XfControl.refresh on : ', this);
        // this.modelItem = modelItem;
        this.applyProperties();
    }


    applyProperties() {
        // console.log('XfControl.applyProperties ', this.modelItem);

        if (this.modelItem === undefined) {
            console.warn('no modelItem present for ', this);
        }

        if (this.modelItem.alert !== undefined) {
            // console.log('XfControl.applyProperties alert: ', this.modelItem.alert);
            this.alert = this.modelItem.alert;
        }
        if (this.modelItem.readonly !== undefined) {
            // console.log('XfControl.applyProperties readonly: ', this.modelItem.readonly);
            this.readonly = this.modelItem.readonly;
        }
        if (this.modelItem.required !== undefined) {
            // console.log('XfControl.applyProperties required: ', this.modelItem.required);
            this.required = this.modelItem.required;
        }
        if (this.modelItem.relevant !== undefined) {
            // console.log('XfControl.applyProperties relevant: ', this.modelItem.relevant);
            this.relevant = this.modelItem.relevant;
        }
        if (this.modelItem.valid !== undefined) {
            // console.log('XfControl.applyProperties valid: ', this.modelItem.valid);
            this.valid = this.modelItem.valid;
        }
        if (this.modelItem.type !== undefined) {
            // console.log('XfControl.applyProperties type: ', this.modelItem.type);
            this.datatype = this.modelItem.type;
        }
        if (this.modelItem.value !== undefined && this.modelItem.value !== this.value) {
            // console.log('XfControl.applyProperties value: ', this.modelItem.value);
            this.value = this.modelItem.value;
        }

    }

    /**
     * attaches eventlisteners that update the uiState after user-interaction.
     *
     * As this varies between controls the respective control must override this.
     *
     * @private
     */
    attachListeners() {
    }

    dispatchValueChange() {
        console.log('### dispatching value change from ', this);
        const path = this.ownerForm.resolveBinding(this);
        this.dispatchEvent(new CustomEvent(
            'value-changed',
            {
                composed: true,
                bubbles: true,
                detail: {'modelItem': this.modelItem, "path":path}
            }));

        /*
                if(this.repeated){
                    let elem = this.closest('xf-repeat');
                    let inner = elem.bind + ':' + elem.repeatIndex;

                    let found = true;
                    while(found){
                        elem = elem.parentNode.closest('xf-repeat');
                        if(elem === null){
                            found = false;
                        }else{
                            inner = elem.bind + ':' + elem.repeatIndex + '/' + inner;
                        }
                    }
                    console.log('zzzzzzzzzzzz index ', inner);

                    console.log('>>>>>>>>>>>>>>>>> resolveBinding: ', this.ownerForm.resolveBinding(this));

                    const idx = this.closest('xf-repeat').repeatIndex;
                    // this.dispatchEvent(new CustomEvent('value-changed', {composed: true, bubbles: true, detail: {'modelItem':this.modelItem,'path':inner,'index':idx}}));
                    this.dispatchEvent(new CustomEvent('value-changed', {composed: true, bubbles: true, detail: {'modelItem':this.modelItem,'path':inner}}));
                }else{
                    this.dispatchEvent(new CustomEvent('value-changed', {composed: true, bubbles: true, detail: {'modelItem':this.modelItem}}));
                }
        */
    }

    _updateAlert() {
    }

    _updateReadonly() {
    }

    _updateRequired() {
    }

    _updateRelevant() {
    }

    _updateValid() {
    }

    _updateDatatype() {
    }

    _updateValue() {
        // console.log('### xf-control._updateValue ', this.value);
        // this.uiState.value = this.value;
    }
}

window.customElements.define('xf-abstract-control', XfAbstractControl);