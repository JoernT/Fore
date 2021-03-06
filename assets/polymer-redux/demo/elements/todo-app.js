/// BareSpecifier=polymer-redux/demo/elements/todo-app
import { html, PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import './todo-table.js';

export default class TodoApp extends PolymerElement {
	static get template() {
		return html`
			<style>
				h1 {
					font-weight: 500;
					color: #3E3F42;
				}
			</style>
			<h1>Get shit done!</h1>
			<todo-table items="[[tasks]]" />
		`;
	}

	static get properties() {
		return {
			tasks: {
				value: () => []
			}
		};
	}
}

customElements.define('todo-app', TodoApp);