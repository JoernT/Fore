/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   paper-input-container.js
 */

import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';

import {dom} from '@polymer/polymer/lib/legacy/polymer.dom.js';

import {dashToCamelCase} from '@polymer/polymer/lib/utils/case-map.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';

import {LegacyElementMixin} from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';

/**
 * `<paper-input-container>` is a container for a `<label>`, an `<iron-input>` or
 * `<textarea>` and optional add-on elements such as an error message or character
 * counter, used to implement Material Design text fields.
 *
 * For example:
 *
 *     <paper-input-container>
 *       <label slot="label">Your name</label>
 *       <iron-input slot="input">
 *         <input>
 *       </iron-input>
 *       // In Polymer 1.0, you would use `<input is="iron-input" slot="input">`
 * instead of the above.
 *     </paper-input-container>
 *
 * You can style the nested `<input>` however you want; if you want it to look like
 * a Material Design input, you can style it with the
 * --paper-input-container-shared-input-style mixin.
 *
 * Do not wrap `<paper-input-container>` around elements that already include it,
 * such as `<paper-input>`. Doing so may cause events to bounce infinitely between
 * the container and its contained element.
 *
 * ### Listening for input changes
 *
 * By default, it listens for changes on the `bind-value` attribute on its children
 * nodes and perform tasks such as auto-validating and label styling when the
 * `bind-value` changes. You can configure the attribute it listens to with the
 * `attr-for-value` attribute.
 *
 * ### Using a custom input element
 *
 * You can use a custom input element in a `<paper-input-container>`, for example
 * to implement a compound input field like a social security number input. The
 * custom input element should have the `paper-input-input` class, have a
 * `notify:true` value property and optionally implements
 * `Polymer.IronValidatableBehavior` if it is validatable.
 *
 *     <paper-input-container attr-for-value="ssn-value">
 *       <label slot="label">Social security number</label>
 *       <ssn-input slot="input" class="paper-input-input"></ssn-input>
 *     </paper-input-container>
 *
 *
 * If you're using a `<paper-input-container>` imperatively, it's important to make
 * sure that you attach its children (the `iron-input` and the optional `label`)
 * before you attach the `<paper-input-container>` itself, so that it can be set up
 * correctly.
 *
 * ### Validation
 *
 * If the `auto-validate` attribute is set, the input container will validate the
 * input and update the container styling when the input value changes.
 *
 * ### Add-ons
 *
 * Add-ons are child elements of a `<paper-input-container>` with the `add-on`
 * attribute and implements the `Polymer.PaperInputAddonBehavior` behavior. They
 * are notified when the input value or validity changes, and may implement
 * functionality such as error messages or character counters. They appear at the
 * bottom of the input.
 *
 * ### Prefixes and suffixes
 * These are child elements of a `<paper-input-container>` with the `prefix`
 * or `suffix` attribute, and are displayed inline with the input, before or after.
 *
 *     <paper-input-container>
 *       <div slot="prefix">$</div>
 *       <label slot="label">Total</label>
 *       <iron-input slot="input">
 *         <input>
 *       </iron-input>
 *       // In Polymer 1.0, you would use `<input is="iron-input" slot="input">`
 * instead of the above. <paper-icon-button slot="suffix"
 * icon="clear"></paper-icon-button>
 *     </paper-input-container>
 *
 * ### Styling
 *
 * The following custom properties and mixins are available for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--paper-input-container-color` | Label and underline color when the input is not focused | `--secondary-text-color`
 * `--paper-input-container-focus-color` | Label and underline color when the input is focused | `--primary-color`
 * `--paper-input-container-invalid-color` | Label and underline color when the input is is invalid | `--error-color`
 * `--paper-input-container-input-color` | Input foreground color | `--primary-text-color`
 * `--paper-input-container` | Mixin applied to the container | `{}`
 * `--paper-input-container-disabled` | Mixin applied to the container when it's disabled | `{}`
 * `--paper-input-container-label` | Mixin applied to the label | `{}`
 * `--paper-input-container-label-focus` | Mixin applied to the label when the input is focused | `{}`
 * `--paper-input-container-label-floating` | Mixin applied to the label when floating | `{}`
 * `--paper-input-container-input` | Mixin applied to the input | `{}`
 * `--paper-input-container-input-align` | The vertical-align property of the input | `bottom`
 * `--paper-input-container-input-disabled` | Mixin applied to the input when the component is disabled | `{}`
 * `--paper-input-container-input-focus` | Mixin applied to the input when focused | `{}`
 * `--paper-input-container-input-invalid` | Mixin applied to the input when invalid | `{}`
 * `--paper-input-container-input-webkit-spinner` | Mixin applied to the webkit spinner | `{}`
 * `--paper-input-container-input-webkit-clear` | Mixin applied to the webkit clear button | `{}`
 * `--paper-input-container-input-webkit-calendar-picker-indicator` | Mixin applied to the webkit calendar picker indicator | `{}`
 * `--paper-input-container-ms-clear` | Mixin applied to the Internet Explorer clear button | `{}`
 * `--paper-input-container-underline` | Mixin applied to the underline | `{}`
 * `--paper-input-container-underline-focus` | Mixin applied to the underline when the input is focused | `{}`
 * `--paper-input-container-underline-disabled` | Mixin applied to the underline when the input is disabled | `{}`
 * `--paper-input-prefix` | Mixin applied to the input prefix | `{}`
 * `--paper-input-suffix` | Mixin applied to the input suffix | `{}`
 *
 * This element is `display:block` by default, but you can set the `inline`
 * attribute to make it `display:inline-block`.
 */
interface PaperInputContainerElement extends LegacyElementMixin, HTMLElement {

  /**
   * Set to true to disable the floating label. The label disappears when the
   * input value is not null.
   */
  noLabelFloat: boolean|null|undefined;

  /**
   * Set to true to always float the floating label.
   */
  alwaysFloatLabel: boolean|null|undefined;

  /**
   * The attribute to listen for value changes on.
   */
  attrForValue: string|null|undefined;

  /**
   * Set to true to auto-validate the input value when it changes.
   */
  autoValidate: boolean|null|undefined;

  /**
   * True if the input is invalid. This property is set automatically when the
   * input value changes if auto-validating, or when the `iron-input-validate`
   * event is heard from a child.
   */
  invalid: boolean|null|undefined;

  /**
   * True if the input has focus.
   */
  readonly focused: boolean|null|undefined;
  _addons: any[]|null|undefined;
  _inputHasContent: boolean|null|undefined;
  _inputSelector: string|null|undefined;
  _boundOnFocus: Function|null|undefined;
  _boundOnBlur: Function|null|undefined;
  _boundOnInput: Function|null|undefined;
  _boundValueChanged: Function|null|undefined;
  readonly _valueChangedEvent: any;
  readonly _propertyForValue: any;
  readonly _inputElement: any;
  readonly _inputElementValue: any;
  ready(): void;
  attached(): void;

  /**
   * Call this to update the state of add-ons.
   *
   * @param state Add-on state.
   */
  updateAddons(state: object|null): void;
}

export {PaperInputContainerElement};

declare global {

  interface HTMLElementTagNameMap {
    "paper-input-container": PaperInputContainerElement;
  }
}
