import { UiConfig } from '../app/uiConfig';
import { Product, ProductId } from '../types';
import { Component } from '../ui/Component';
import { ensureElement } from '../utils/utils';
import { ProductView } from './ProductView';

interface IHomeViewModel {
	counter: number;
	gallery: Product[];
	locked: boolean;
}

interface IHomeViewEvents {
	onProductCardClick: (id: ProductId) => void;
	onBasketOpenClick: () => void;
}

export class HomeView extends Component<IHomeViewModel> {
	protected _headerCounter: HTMLElement;
	protected _gallery: HTMLElement;
	protected _headerBasket: HTMLElement;
	protected _wrapper: HTMLElement;

	constructor(private events: IHomeViewEvents) {
		super(document.body);

		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._gallery = ensureElement<HTMLElement>('.gallery');
		this._headerBasket = ensureElement<HTMLElement>('.header__basket');
		this._headerCounter = ensureElement<HTMLElement>('.header__basket-counter');
		this._headerBasket.addEventListener('click', () =>
			this.events.onBasketOpenClick()
		);
	}

	set counter(value: number) {
		this.setText(this._headerCounter, String(value));
	}

	set products(products: Product[]) {
		const cards = products.map((product) => {
			const productView = new ProductView(
				UiConfig.templates.cardCatalogTemplate,
				{
					onProductCardClick: () => {
						this.events.onProductCardClick(product.id);
					},
				},
				'catalog'
			);
			return productView.render(product);
		});
		this._gallery.replaceChildren(...cards);
	}

	set locked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
