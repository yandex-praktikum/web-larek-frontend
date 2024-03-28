import { Component } from '../ui/Component';
import { ensureElement } from '../utils/utils';

export abstract class Page<T> extends Component<T> {
	// получить шаблоны и модальные формы
	protected _cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

	constructor() {
		const container = ensureElement(document.body);
		super(container);
	}
}
