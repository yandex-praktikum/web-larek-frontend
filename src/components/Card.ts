import { Component } from './base/Component';
import { IProduct } from '../types';

interface IActionsCard {
	onClick: (event: MouseEvent) => void;
}


export class Card extends Component<IProduct> {
	protected _image: HTMLImageElement;
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _description: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _index: HTMLElement;

	constructor( protected blockName: string, container: HTMLElement, actions?: IActionsCard ) {
		super(container);
        
		this._image = container.querySelector(`.${blockName}__image`);
		this._title = container.querySelector(`.${blockName}__title`);
		this._category = container.querySelector(`.${blockName}__category`);
		this._price = container.querySelector(`.${blockName}__price`);
		this._description = container.querySelector(`.${blockName}__text`);
		this._button = container.querySelector(`.${blockName}__button`);
		this._index = container.querySelector('.basket__item-index');

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set category(value: string) {
		this.setText(this._category, value);
		const categoriesArray: {[key: string]: string} = {
			'софт-скил': 'card__category_soft',
			'хард-скил': 'card__category_hard',
			'другое': 'card__category_other',
			'дополнительное': 'card__category_additional',
			'кнопка': 'card__category_button'
		};
		this.addClass(this._category, categoriesArray[value]);
	}

	set price(value: number | null) {
		if (value === null) {
			this.setText(this._price, 'Бесценно');
			this.toggleDisabled(this._button, true);
		} else {
			this.setText(this._price, `${value} синапсов`);
		}
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set button(value: string) {
		if (this._price.textContent === 'Бесценно') {
			this.setText(this._button, 'Нельзя купить');
			this.toggleDisabled(this._button, true);
		} else {
			this.setText(this._button, value);
		}
	}

	set index(value: number) {
		this.setText(this._index, value);
	}

	set inBasket(value: boolean) {
		this.updateButton(value);
	}

	updateButton(inBasket: boolean) {
		if (inBasket) {
			this.setText(this._button, 'Удалить');
		} else {
			this.setText(this._button, 'В корзину');
		}
	}
}