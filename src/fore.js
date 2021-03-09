import {
    registerCustomXPathFunction,
    registerXQueryModule
} from 'fontoxpath';
import * as fx from "fontoxpath";
import {XPathUtil} from "./xpath-util";

const XFORMS_NAMESPACE_URI = 'http://www.w3.org/2002/xforms';

/**
 * Implementation of the functionNameResolver passed to FontoXPath to
 * redirect function resolving for unprefixed functions to either the fn or the xf namespace
 */
function functionNameResolver ({_prefix, localName}, _arity) {
	switch (localName) {
		// TODO: put the full XForms library functions set here
		case 'instance':
		case 'depends':
			return {namespaceURI: 'http://www.w3.org/2002/xforms', localName};
		default:
			return {namespaceURI: 'http://www.w3.org/2005/xpath-functions', localName};
	}
}

registerCustomXPathFunction(
    { namespaceURI: XFORMS_NAMESPACE_URI, localName: 'instance' },
    ['xs:string?'],
    'element()?',
    (dynamicContext, string) => {
        // Spec: https://www.w3.org/TR/xforms-xpath/#The_XForms_Function_Library#The_instance.28.29_Function
        // TODO: handle no string passed (null will be passed instead)

        const {formElement} = dynamicContext.currentContext || this;

        // console.log('fnInstance dynamicContext: ', dynamicContext);
        // console.log('fnInstance string: ', string);

        const instance = formElement.querySelector(`xf-instance[id=${  string  }]`);

        // const def = instance.getInstanceData();
        if(instance) {
            const def = instance.getDefaultContext();
            // console.log('target instance root node: ', def);

            return def;
        }
        return null;
    }
);

registerCustomXPathFunction(
    { namespaceURI: XFORMS_NAMESPACE_URI, localName: 'depends' },
    ['node()*'],
    'item()?',
    (dynamicContext, nodes) => {
        // Spec: https://www.w3.org/TR/xforms-xpath/#The_XForms_Function_Library#The_instance.28.29_Function
        // TODO: handle no string passed (null will be passed instead)

        const {formElement} = dynamicContext.currentContext || this;

        // console.log('fnInstance dynamicContext: ', dynamicContext);
        // console.log('depends on : ', nodes[0]);

        return nodes[0];
    }
);

// How to run XQUF:
/**
registerXQueryModule(`
module namespace my-custom-namespace = "my-custom-uri";
(:~
	Insert attribute somewhere
	~:)
declare %public %updating function my-custom-namespace:do-something ($ele as element()) as xs:boolean {
	if ($ele/@done) then false() else
	(insert node
	attribute done {"true"}
	into $ele, true())
};
`)
// At some point:
const contextNode = null;
const pendingUpdatesAndXdmValue = evaluateUpdatingExpressionSync('ns:do-something(.)', contextNode, null, null, {moduleImports: {'ns': 'my-custom-uri'}})

console.log(pendingUpdatesAndXdmValue.xdmValue); // this is true or false, see function

executePendingUpdateList(pendingUpdatesAndXdmValue.pendingUpdateList, null, null, null);
*/

export class Fore{

    static READONLY_DEFAULT = false;

    static REQUIRED_DEFAULT = false;

    static RELEVANT_DEFAULT = true;

    static CONSTRAINT_DEFAULT = true;

    static TYPE_DEFAULT = 'xs:string';


    static get ACTION_ELEMENTS(){
        return [
            'XF-DELETE',
            'XF-DISPATCH',
            'XF-INSERT',
            'XF-LOAD',
            'XF-MESSAGE',
            'XF-REBUILD',
            'XF-RECALCULATE',
            'XF-REFRESH',
            'XF-RENEW',
            'XF-REPLACE',
            'XF-RESET',
            'XF-RETAIN',
            'XF-RETURN',
            'XF-REVALIDATE',
            'XF-SEND',
            'XF-SETFOCUS',
            'XF-SETINDEX',
            'XF-SETVALUE',
            'XF-TOGGLE',
        ];
    }

    static namespaceResolver(prefix) {
        // TODO: Do proper namespace resolving. Look at the ancestry / namespacesInScope of the declaration

        /**
         * for (let ancestor = this; ancestor; ancestor = ancestor.parentNode) {
         * 	if (ancestor.getAttribute(`xmlns:${prefix}`)) {
         *   // Return value
         *  }
         * }
         */

        // console.log('namespaceResolver  prefix', prefix);
        const ns = {
            'xhtml' : 'http://www.w3.org/1999/xhtml'
            // ''    : Fore.XFORMS_NAMESPACE_URI
        };
        return ns[prefix] || null;
    }

    static getInScopeContext(node,ref){
        let resultNodeset;
        let parent;
        if(node.nodeType === Node.ATTRIBUTE_NODE){
            parent = node.ownerElement;
        }else{
            parent = node.parentNode;
        }

        const repeatItem = parent.closest('xf-repeatitem');
        if(repeatItem){
            return repeatItem.nodeset;
        }
        const parentBind = parent.closest('[ref]');

        const ownerForm = parent.closest('xf-form');
        const model = ownerForm.getModel();

        if(parentBind !== null){
            resultNodeset = parentBind.nodeset;
        }else if(XPathUtil.isAbsolutePath(ref)){
            const instanceId = XPathUtil.getInstanceId(ref);
            resultNodeset = model.getInstance(instanceId).getDefaultContext();
        }else if(model.getDefaultInstance() !== null){
            resultNodeset = model.getDefaultInstance().getDefaultContext();
        }else{
            return [];
        }
        // todo: no support for xforms 'context' yet - see https://github.com/betterFORM/betterFORM/blob/02fd3ec595fa275589185658f3011a2e2e826f4d/core/src/main/java/de/betterform/xml/xforms/XFormsElement.java#L451
        return resultNodeset;
    }

    static evaluateXPath (xpath, contextNode, formElement, namespaceResolver) {
        return fx.evaluateXPath(
            xpath,
            contextNode,
            null,
            {},
            'xs:anyType',
            {
                namespaceResolver,
                currentContext: {formElement},
				functionNameResolver
            });
    }

    static evaluateToNodes (xpath, contextNode, formElement, namespaceResolver) {
        return fx.evaluateXPathToNodes(
            xpath,
            contextNode,
            null,
            {},
            {
                namespaceResolver,
                currentContext: {formElement},
				functionNameResolver
            });
    }


    static evaluateToBoolean(xpath, contextNode, formElement, namespaceResolver) {
        return fx.evaluateXPathToBoolean(
            xpath,
            contextNode,
            null,
            {},
            {
                namespaceResolver,
                currentContext: {formElement},
				functionNameResolver
            });
    }

	static get XFORMS_NAMESPACE_URI () {
		return XFORMS_NAMESPACE_URI
	}

    static isActionElement(elementName){
        const found = Fore.ACTION_ELEMENTS.includes(elementName);
        // console.log('isActionElement ', found);
        return Fore.ACTION_ELEMENTS.includes(elementName);
    }

    static get UI_ELEMENTS(){
        return [
            'XF-ALERT',
            'XF-BOUND',
            'XF-BUTTON',
            'XF-CONTROL',
            'XF-DIALOG',
            'XF-FILENAME',
            'XF-MEDIATYPE',
            'XF-GROUP',
            'XF-HINT',
            'XF-INPUT',
            'XF-ITEMSET',
            'XF-LABEL',
            'XF-OUTPUT',
            'XF-RANGE',
            'XF-REPEAT',
            'XF-REPEATITEM',
            'XF-SWITCH',
            'XF-SECRET',
            'XF-SELECT',
            'XF-SUBMIT',
            'XF-TEXTAREA',
            'XF-TRIGGER',
            'XF-UPLOAD'
        ];
    }


    static isUiElement(elementName){
        const found = Fore.UI_ELEMENTS.includes(elementName);
        if(found){
            // console.log('_isUiElement ', found);
        }
        return Fore.UI_ELEMENTS.includes(elementName);
    }



    static refreshChildren(startElement){
        const children = startElement.children;
        if(children){
            Array.from(children).forEach(element => {

                // todo: later - check for AVTs
                if (Fore.isUiElement(element.nodeName) && typeof element.refresh === 'function') {
                    element.refresh();
                }else{
                    if(element.nodeName !== 'XF-MODEL'){
                        Fore.refreshChildren(element);
                    }
                }

            });
        }
        // startElement.requestUpdat();
    }

    /**
     * clear all text nodes and attribute values to get a 'clean' template.
     * @param n
     * @private
     */
    static clear(n){
        n.textContent = '';
        if(n.hasAttributes()){
            const attrs = n.attributes;
            for (let i = 0; i < attrs.length; i++) {
                attrs[i].value = '';
            }
        }
        const children = n.children;
        for (let i = 0 ; i< children.length; i++){
            Fore.clear(children[i]);
        }

    }


}
