import { Component } from '../ui/Component';
import { cloneTemplate, ensureElement } from '../utils/utils';

interface IBasketViewModel {
	items: HTMLElement[];
	total: number;
	isValidated: boolean;
}

interface IBasketViewEvents {
	startOrder: () => void;
}

export class BasketView extends Component<IBasketViewModel> {
	private _items: HTMLElement;
	private _total: HTMLElement;
	private _submitButton: HTMLButtonElement;

	constructor(template: HTMLTemplateElement, events: IBasketViewEvents) {
		const container = cloneTemplate(template);
		super(container);

		this._items = ensureElement<HTMLElement>('.basket__list', container);
		this._total = ensureElement<HTMLElement>('.basket__price', container);
		this._submitButton = ensureElement<HTMLButtonElement>(
			'.basket__button',
			container
		);

		this._submitButton.addEventListener('click', () => {
			events.startOrder();
		});
	}

	set items(items: HTMLElement[]) {
		this._items.replaceChildren(...items);
	}

	set total(value: number) {
		this.setText(this._total, value);
	}

	set isValidated(value: boolean) {
		this.setDisabled(this._submitButton, !value);
	}
}
