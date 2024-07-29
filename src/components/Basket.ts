import { Component } from './base/Component';
import { EventEmitter } from './base/events';

interface IViewBasket {
	items: HTMLElement[];
	total: number;
}

export class Basket extends Component<IViewBasket> {
	protected _button: HTMLButtonElement;
	protected _list: HTMLElement;
	protected _total: HTMLElement;

	constructor(protected blockName: string, container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this._total = container.querySelector(`.${blockName}__price`);
		this._button = container.querySelector(`.${blockName}__button`);
		this._list = container.querySelector(`.${blockName}__list`);
		this.items = [];

		this._button.addEventListener('click', () =>
			this.events.emit('order:open')
		);
	}

	set items(items: HTMLElement[]) {
		this._list.replaceChildren(...items);
	}

	set total(value: number) {
		this.setText(this._total, `${value} синапсов`);
		if (value === 0) {
			this.toggleDisabled(this._button, true);
		} else {
			this.toggleDisabled(this._button, false);
		}
	}
}