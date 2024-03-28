import { Component } from '../ui/Component';
import { ensureElement } from '../utils/utils';

export abstract class PageView<T> extends Component<T> {
	// получить шаблоны и модальные формы
	protected cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

	protected cardFullElement = ensureElement<HTMLElement>('.modal .card_full');

	constructor() {
		const container = ensureElement(document.body);
		super(container);
	}
}
