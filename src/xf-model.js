import {LitElement, html, css} from 'lit-element';
import { observable, autorun, action , trace} from 'mobx';

import * as fontoxpath from './output/fontoxpath.js';
import fx from "./output/fontoxpath";
import evaluateXPathToNodes from './output/fontoxpath.js';

import './xf-instance.js';
import './xf-bind.js';

export class XfModel extends LitElement {

    static get styles() {
        return css`
            :host {
                display: none;
            }
        `;
    }

    static get properties() {
        return {
            id: {
                type: String
            },
            instances: {
                type: Array
            },
/*
            defaultInstance: {
                type: Object
            },
*/
            defaultContext:{
                type:Object
            },
            modelItems:{
                type:Array
            }

        };
    }

    constructor() {
        super();
        this.id = '';
        this.instances = [];
        this.modelItems = [];
        // observable.box(this.modelItems);
        this.defaultContext = {};

        this.addEventListener('model-construct', this._modelConstruct);
        this.addEventListener('ready', this._ready);

    }

    firstUpdated(_changedProperties) {
        this.modelItemStore = observable({
            modelStoreItems:[],

        });
        this.modelItemStore.modelStoreItems = this.modelItems;
        console.log('modelItemStore ', this.modelItemStore)
    }

    autorun(){
        console.log(this.modelItemStore);
        this.modelItemStore.modelStoreItems = this.modelItems;
    }


/*
    render() {
        return html`

        `;
    }
*/

    _modelConstruct(e) {
        console.log('MODEL::model-construct received ', this.id);


            const instances = this.querySelectorAll('xf-instance');

            if (instances.length > 0) {
                // console.group('init instances');
                instances.forEach(instance => {
                    instance.init();
                });
                this.instances = Array.from(instances);
                console.groupEnd();
                // console.log('model instances ', this.instances);

                this._initOutermostBindings();

                this.updateModel();
                // console.groupEnd();
                // console.log('dispatching model-construct-done');
                this.dispatchEvent(new CustomEvent('model-construct-done', {
                    composed: true,
                    bubbles: true,
                    detail: {model: this}
                }));
            } else {
                this._initOutermostBindings();
                this.dispatchEvent(new CustomEvent('model-construct-done', {
                    composed: true,
                    bubbles: true,
                    detail: {model: this}
                }));
            }

    }


    registerModelItem(modelItem){
        console.log('ModelItem registered ', modelItem);
        this.modelItems.push(modelItem);
        this.modelItemStore.modelStoreItems.push(modelItem);
    }

    /**
     * update action triggering the update cycle
     */
    updateModel() {
        this.rebuild();
        this.recalculate();
        this.revalidate();

    }

    rebuild() {
        console.group('### rebuild');

        //reset
        // this.bindingMap = [];
/*
        this.modelItems = [];

        const binds = this.querySelectorAll('xf-model > xf-bind');
        binds.forEach(bind => {
            bind.init(this);
        });
*/
        this.modelItemStore.modelStoreItems = this.modelItems;
        console.log('rebuild finished with modelItems ', this.modelItems);
        console.log('rebuild finished with modelStoreItems ', this.modelItemStore.modelStoreItems);

        trace(this.modelItemStore.modelStoreItems);

        console.groupEnd();

    //
    }

    recalculate() {
        // tbd
        console.log('### recalculate');

        const binds = this.querySelectorAll('xf-bind[calculate]');
        binds.forEach(bind => {
            const contextNode = bind.nodeset[0];
            const compute = fx.evaluateXPath(bind.calculate, contextNode, null, {});
            this.getModelItem(contextNode).value = compute;
            console.log('computed ', compute);
        });

    }

    revalidate() {
        // tbd
        // console.log('revalidate');
        // console.log('revalidate instances ', this.instances);

        console.group('### revalidate');
        this.modelItems.forEach(modelItem =>{
            console.log('validating node ', modelItem.node);
        });
/*
        const binds = this.querySelectorAll('xf-bind');
        binds.forEach(bind => {
            // console.log('bind ', bind);
            console.log('bind ', bind.ref);
            // console.log('instanceData ', this.getDefaultInstanceData());

            if(this.ref === ''){
                return;
            }

            let contextNode =  fx.evaluateXPath(bind.ref, this.getDefaultContext(), null, {});
            console.log('evaluated context node ', contextNode);

            let result ='';
            if(bind.readonly !== 'false()'){
                console.log('evaluating readonly expression', bind.readonly);
                result =  fx.evaluateXPathToBoolean(bind.readonly, contextNode, null, {});
                console.log('readonly evaluated to', result);
            }
            if(bind.required !== 'false()'){
                // console.log('evaluating required expression', bind.required);
                result =  fx.evaluateXPathToBoolean(bind.required, contextNode, null, {});
                console.log('required evaluated to', result);
            }
            if(bind.relevant !== 'true()'){
                // console.log('evaluating relevant expression', bind.relevant);
            }
            if(bind.constraint !== 'true()'){
                // console.log('evaluating constraint expression', bind.constraint);
            }
            if(bind.type !== 'xs:string'){
                // console.log('evaluating type  expression', bind.type);
            }
        });
*/
        console.groupEnd();
    }

    getModelItem(node){
        return this.modelItems.find(m => m.node === node);
    }

    _initOutermostBindings(){
        console.group('### initialize bindings');

        this.modelItems = [];
        const binds = this.querySelectorAll('xf-model > xf-bind');
        binds.forEach(bind => {
            bind.init(this);
        });
        console.groupEnd();
    }


    _handleModelConstructDone(e){
        console.log('_handleModelConstructDone');
        // this.refresh();
        this.updateModel();
        this.autorun();
    }


    /**
     * get the default evaluation context for this model.
     * @returns {Element} the
     */
    getDefaultContext(){
        // console.log('getDefaultContext instanceData ', this.instances[0].instanceData);
        // console.log('getDefaultContext firstChild ', this.instances[0].instanceData.firstElementChild);
        // return this.instances[0].instanceData.firstElementChild;
        return this.instances[0].getDefaultContext();
    }

    getDefaultInstance(){
        return this.instances[0];
    }

    getDefaultInstanceData() {
        console.log('default instance data ',this.instances[0].instanceData);
        return this.instances[0].instanceData;
    }

    getInstance(id){
        console.log('getInstance ',id);
        console.log('instances ',this.instances);
        // console.log('instances array ',Array.from(this.instances));

        const instArray = Array.from(this.instances);
        return instArray.find(inst => inst.id === id);
    }


    evalBinding(bindingExpr){
        // console.log('MODEL.evalBinding ', bindingExpr);
        //default context of evaluation is always the default instance



        const result = this.instances[0].evalXPath(bindingExpr);


        return result;

    }

    _ready(e) {
        console.log('model is ready');
        this.autorun();
        trace(this.modelItemStore.modelStoreItems);
    }

    createRenderRoot() {
        /**
         * Render template without shadow DOM. Note that shadow DOM features like
         * encapsulated CSS and slots are unavailable.
         */
        return this;
    }



}

customElements.define('xf-model', XfModel);