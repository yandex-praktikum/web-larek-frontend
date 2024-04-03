import { Component } from '../ui/Component';
import { cloneTemplate, ensureElement, isEmpty } from '../utils/utils';

interface IProductViewModel {
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	isInBasket?: boolean;
	itemIndex?: number;
}

interface IProductViewEvents {
	toggleBasket: () => void;
	onProductCardClick: () => void;
	onDeleteClick: () => void;
}

abstract class ProductView extends Component<IProductViewModel> {
	protected _image: HTMLImageElement;
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;

	protected ensureCategory() {
		this._category = ensureElement('.card__category', this.container);
	}

	protected ensureImage() {
		this._image = ensureElement<HTMLImageElement>(
			'.card__image',
			this.container
		);
	}

	constructor(template: HTMLTemplateElement) {
		const container = cloneTemplate(template);
		super(container);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
	}

	render(model: IProductViewModel) {
		return super.render(model);
	}

	set title(value: string) {
		this._title.textContent = value;
	}

	set image(value: string) {
		this._image && this.setImage(this._image, value);
	}

	set category(value: string) {
		this._category && this.setText(this._category, value);
	}

	set price(value: number | null) {
		this._price &&
			(this._price.textContent = isEmpty(value) ? '' : String(value));
	}
}

export class CatalogProductView extends ProductView {
	constructor(
		template: HTMLTemplateElement,
		events: Pick<IProductViewEvents, 'onProductCardClick'>
	) {
		super(template);

		this.ensureCategory();
		this.ensureImage();

		this.container.addEventListener('click', () => events.onProductCardClick());
	}
}

export class FullProductView extends ProductView {
	private _description: HTMLElement;
	private _toBasketButton: HTMLButtonElement;

	constructor(
		template: HTMLTemplateElement,
		events: Pick<IProductViewEvents, 'toggleBasket'>
	) {
		super(template);

		this.ensureCategory();
		this.ensureImage();
		this._description = ensureElement<HTMLElement>(
			'.card__text',
			this.container
		);
		this._toBasketButton = ensureElement<HTMLButtonElement>(
			'.button',
			this.container
		);

		this._toBasketButton.addEventListener('click', () => events.toggleBasket());
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set isInBasket(inBasket: boolean) {
		this.setText(this._toBasketButton, inBasket ? 'Убрать' : 'В корзину');
	}
}

export class BasketProductView extends ProductView {
	private _itemIndex: HTMLElement;
	private _deleteFromBasketButton: HTMLElement;

	constructor(
		template: HTMLTemplateElement,
		events: Pick<IProductViewEvents, 'onDeleteClick'>
	) {
		super(template);

		this._itemIndex = ensureElement<HTMLElement>(
			'.basket__item-index',
			this.container
		);
		this._deleteFromBasketButton = ensureElement<HTMLElement>(
			'.basket__item-delete',
			this.container
		);
		this._deleteFromBasketButton.addEventListener('click', () => {
			events.onDeleteClick();
		});
	}

	set itemIndex(value: number) {
		this.setText(this._itemIndex, value);
	}
}
