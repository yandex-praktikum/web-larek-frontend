import { Component } from './base/Component';
import { IProduct } from '../types';

interface IActionsCard {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
	protected _itemTitle: HTMLElement;
	protected _image: HTMLImageElement;
	protected _itemPrice: HTMLElement;
	protected _itemDescription: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _category: HTMLElement;
	protected _index: HTMLElement;

	constructor( protected blockName: string, container: HTMLElement, actions?: IActionsCard ) {
		super(container);
		this._itemTitle = container.querySelector(`.${blockName}__title`);
		this._image = container.querySelector(`.${blockName}__image`);
		this._itemPrice = container.querySelector(`.${blockName}__price`);
		this._itemDescription = container.querySelector(`.${blockName}__text`);
		this._button = container.querySelector(`.${blockName}__button`);
		this._category = container.querySelector(`.${blockName}__category`);
		this._index = container.querySelector('.basket__item-index');

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			}else{
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set title(value: string) {
		this.setText(this._itemTitle, value);
	}

	set category(value: string) {
		this.setText(this._category, value);
		const categoriesArray: {[key: string]: string} = {
			'другое': 'card__category_other',
			'дополнительное': 'card__category_additional',
			'софт-скил': 'card__category_soft',
			'хард-скил': 'card__category_hard',
			'кнопка': 'card__category_button'
		};
		this.addClass(this._category, categoriesArray[value]);
	}

	set price(value: number | null) {
		if (value != null) {
			this.setText(this._itemPrice, `${value} синапсов`);
		}else{
			this.toggleDisabled(this._button, true);
			this.setText(this._itemPrice, 'Бесценно');
		}
	}

	set button(value: string) {
		if (this._itemPrice.textContent === 'Бесценно') {
			this.setText(this._button, 'Нельзя купить');
			this.toggleDisabled(this._button, true);
		}else{
			this.setText(this._button, value);
		}
	}

	set description(value: string){
		this.setText(this._itemDescription, value);
	}

	set inBasket(value: boolean) {
		this.updateButton(value);
	}

	set index(value: number) {
		this.setText(this._index, value);
	}

	updateButton(inBasket: boolean) {
		if (!inBasket) {
			this.setText(this._button, 'В корзину');
		}else{
			this.setText(this._button, 'Удалить');
		}
	}
}