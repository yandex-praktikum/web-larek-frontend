import { ensureElement } from '../utils/utils';
import { AppView } from './AppView.base';

interface IBasketViewModel {
	items: HTMLElement[];
	total: number;
}

interface IBasketViewEvents {
	startOrder: () => void;
}

export class BasketView extends AppView<IBasketViewModel> {
	private _items: HTMLElement;
	private _total: HTMLElement;
	private _submitButton: HTMLButtonElement;

	constructor(events: IBasketViewEvents) {
		super('basketTemplate');

		this._items = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = ensureElement<HTMLElement>('.basket__price', this.container);
		this._submitButton = ensureElement<HTMLButtonElement>(
			'.basket__button',
			this.container
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
}
