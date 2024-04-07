import { ensureElement, isEmpty } from '../utils/utils';
import { AppView, AvailableContainer } from './AppView.base';

interface IProductViewModel {
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	isInBasket?: boolean;
	itemIndex?: number;
	validation?: Validation;
	categoryClass: string;
}

interface IProductViewEvents {
	toggleBasket: () => void;
	onProductCardClick: () => void;
	onDeleteClick: () => void;
}

abstract class ProductView extends AppView<IProductViewModel> {
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

	constructor(templateName: AvailableContainer) {
		super(templateName);

		this._title = ensureElement<HTMLElement>('.card__title', this.container);
		this._price = ensureElement<HTMLElement>('.card__price', this.container);
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

	set categoryClass(value: string) {
		if (this._category) {
			this._category.classList.forEach(
				(x) =>
					x.startsWith('card__category_') && this._category.classList.remove(x)
			);
			this._category.classList.add(`card__category_${value}`);
		}
	}
}

export class CatalogProductView extends ProductView {
	constructor(events: Pick<IProductViewEvents, 'onProductCardClick'>) {
		super('cardCatalogTemplate');

		this.ensureCategory();
		this.ensureImage();

		this.container.addEventListener('click', () => events.onProductCardClick());
	}
}

export class FullProductView extends ProductView {
	private _description: HTMLElement;
	private _toBasketButton: HTMLButtonElement;

	constructor(events: Pick<IProductViewEvents, 'toggleBasket'>) {
		super('cardPreviewTemplate');

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

	set validation(value: IProductViewModel['validation']) {
		if (value.length != 0) {
			this.setDisabled(this._toBasketButton, true);
			this._toBasketButton.setAttribute(
				'title',
				value.map((x) => x.value).join('; ')
			);
		} else {
			this.setDisabled(this._toBasketButton, false);
			this._toBasketButton.setAttribute('title', '');
		}
	}
}

export class BasketProductView extends ProductView {
	private _itemIndex: HTMLElement;
	private _deleteFromBasketButton: HTMLElement;

	constructor(events: Pick<IProductViewEvents, 'onDeleteClick'>) {
		super('cardBasketTemplate');

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
