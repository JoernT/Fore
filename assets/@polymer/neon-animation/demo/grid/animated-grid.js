/// BareSpecifier=@polymer/neon-animation/demo/grid/animated-grid
/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '../../../polymer/polymer-legacy.js';
import '../../../paper-styles/typography.js';
import '../../../iron-flex-layout/iron-flex-layout.js';
import '../shared-styles.js';

import { Polymer } from '../../../polymer/lib/legacy/polymer-fn.js';
import { dom } from '../../../polymer/lib/legacy/polymer.dom.js';
import { html } from '../../../polymer/lib/utils/html-tag.js';

import { NeonSharedElementAnimatableBehavior } from '../../neon-shared-element-animatable-behavior.js';

Polymer({
  _template: html`
    <style include="shared-styles">

      :host {
        display: block;
        background: #000;
      }

      .tile {
        display: inline-block;
        float: left;
        vertical-align: top;
        width: calc(100% / 6);
        height: calc(100% / 3);

        @apply --paper-font-title;
        @apply --layout-vertical;
        @apply --layout-center-center;
      }

      .tile:nth-of-type(1) {
        width: calc(100% / 3);
        height: calc(100% / 3 * 2);
      }

      .tile:nth-of-type(4) {
        width: calc(100% / 3);
      }

      .tile:nth-of-type(5) {
        width: calc(100% / 3);
        height: calc(100% / 3 * 2);
      }

      .tile:nth-of-type(8) {
        width: calc(100% / 3);
        height: calc(100% / 3);
      }

      .tile:nth-of-type(9) {
        position: absolute;
        top: calc(100% / 3 * 2);
        left: 0;
        width: calc(100% / 6);
        height: calc(100% / 3);
      }

      .tile:nth-of-type(10) {
        position: absolute;
        top: calc(100% / 3 * 2);
        left: calc(100% / 6);;
        width: calc(100% / 6);
        height: calc(100% / 3);
      }
    </style>

    <template is="dom-repeat" items="[[config]]">
      <div item="[[item]]" class$="[[_computeTileClass(item.color)]]" on-click="_onClick">
        <span>[[item.value]]</span>
      </div>
    </template>
  `,

  is: 'animated-grid',
  behaviors: [NeonSharedElementAnimatableBehavior],

  properties: {

    config: {
      type: Array,
      value: function () {
        return [{ value: 1, color: 'blue' }, { value: 2, color: 'red' }, { value: 3, color: 'blue' }, { value: 4, color: 'green' }, { value: 5, color: 'yellow' }, { value: 6, color: 'blue' }, { value: 7, color: 'red' }, { value: 8, color: 'green' }, { value: 9, color: 'yellow' }, { value: 10, color: 'red' }];
      }
    },

    animationConfig: {
      type: Object,
      value: function () {
        return {
          'exit': [{
            name: 'ripple-animation',
            id: 'ripple',
            fromPage: this
          }, {
            name: 'hero-animation',
            id: 'hero',
            fromPage: this
          }]
        };
      }
    }

  },

  _computeTileClass: function (color) {
    return 'tile ' + color + '-300';
  },

  _onClick: function (event) {
    var target = dom(event).rootTarget;

    if (!target.item) {
      target = dom(target).parentNode;
    }

    // configure the page animation
    this.sharedElements = {
      'hero': target,
      'ripple': target
    };
    this.animationConfig['exit'][0].gesture = {
      x: event.x || event.pageX,
      y: event.y || event.pageY
    };

    this.fire('tile-click', { tile: target, data: target.item });
  }
});