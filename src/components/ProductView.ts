import { Product, ProductId } from '../types';
import { Component } from '../ui/Component';
import { cloneTemplate, ensureElement, isEmpty } from '../utils/utils';

type ProductViewMode = 'catalog' | 'full' | 'basket';

interface IProductViewModel {
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

interface IProductViewEvents {
	toggleBasket?: (id: ProductId) => void;
	onProductCardClick?: (id: ProductId) => void;
}

export class ProductView extends Component<IProductViewModel> {
	private _mode: ProductViewMode;
	private _events: IProductViewEvents;

	private _description: HTMLElement;
	private _image: HTMLImageElement;
	private _title: HTMLElement;
	private _category: HTMLElement;
	private _price: HTMLElement;

	private ensureCategory() {
		this._category = ensureElement('.card__category', this.container);
	}

	private ensureImage() {
		this._image = ensureElement<HTMLImageElement>(
			'.card__image',
			this.container
		);
	}

	constructor(
		template: HTMLTemplateElement,
		events: IProductViewEvents,
		mode: ProductViewMode
	) {
		const container = cloneTemplate(template);
		super(container);

		this._events = events;
		this._mode = mode;
		this._title = ensureElement('.card__title', this.container);
		this._price = ensureElement('.card__price', this.container);

		switch (mode) {
			case 'catalog':
				this.ensureCategory();
				this.ensureImage();

				break;
			case 'full':
				this.ensureCategory();
				this.ensureImage();
				this._description = ensureElement('.card__text', this.container);
				break;
			case 'basket':
			// TODO: set index
		}
	}

	render(product: Product) {
		const res = super.render(product);
		this._events.onProductCardClick &&
			this.container.addEventListener('click', () =>
				this._events.onProductCardClick(product.id)
			);
		return res;
	}

	set description(value: string) {
		this._mode === 'full' && (this._description.textContent = value);
	}

	set title(value: string) {
		this._title.textContent = value;
	}

	set image(value: string) {
		this._mode !== 'basket' && this.setImage(this._image, value);
	}

	set category(value: string) {
		this._mode !== 'basket' && (this._category.textContent = value);
	}

	set price(value: number | null) {
		this._price.textContent = isEmpty(value) ? '' : String(value);
	}
}
