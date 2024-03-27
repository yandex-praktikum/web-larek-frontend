import { ensureElement } from '../utils/utils';
import { Component } from './Component';

export abstract class AppComponent<T> extends Component<T> {
	protected _cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

	constructor() {
		const container = ensureElement(document.body);
		super(container);
	}
}
