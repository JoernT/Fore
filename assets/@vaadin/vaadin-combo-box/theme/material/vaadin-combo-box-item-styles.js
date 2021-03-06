/// BareSpecifier=@vaadin/vaadin-combo-box/theme/material/vaadin-combo-box-item-styles
import '../../../vaadin-material-styles/color.js';
import '../../../vaadin-material-styles/font-icons.js';
import '../../../vaadin-material-styles/typography.js';
import '../../../vaadin-item/theme/material/vaadin-item.js';
import { html } from '../../../../@polymer/polymer/lib/utils/html-tag.js';

const $_documentContainer = html`<dom-module id="material-combo-box-item" theme-for="vaadin-combo-box-item">
  <template>
    <style include="material-item">
      :host {
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        padding: 4px 10px;
        min-height: 36px;
        font-size: var(--material-small-font-size);
        --_material-item-selected-icon-display: block;
      }

      /* ShadyCSS workaround */
      :host::before {
        display: block;
      }

      :host(:hover) {
        background-color: var(--material-secondary-background-color);
      }

      :host([focused]) {
        background-color: var(--material-divider-color);
      }

      @media (pointer: coarse) {
        :host(:hover),
        :host([focused]) {
          background-color: transparent;
        }
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);