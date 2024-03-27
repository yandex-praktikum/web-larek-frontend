import { Product } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';

type HomeModel = {
	products: Product[];
};

type HomeEvents = {
	onProductCardClick: (id: Product['id']) => void;
};

type ConstructorParams = {
	cardCatalog: HTMLTemplateElement;
};

export class Home {
	private _container: HTMLElement;
	private _gallery: HTMLElement;
	private _card: HTMLTemplateElement;
	private _onProductCardClick: HomeEvents['onProductCardClick'];

	constructor(
		container: HTMLElement,
		events: HomeEvents,
		params: ConstructorParams
	) {
		this._container = container;
		this._gallery = ensureElement<HTMLElement>('.gallery');
		this._card = params.cardCatalog;
		this._onProductCardClick = events.onProductCardClick;
	}
	render(model: HomeModel) {
		const productCards = model.products.map((product) => {
			const card = cloneTemplate(this._card);
			card.addEventListener('click', () =>
				this._onProductCardClick(product.id)
			);
			card.querySelector('.card__category').textContent = product.category;
			card.querySelector('.card__title').textContent = product.title;
			card.querySelector('.card__image').setAttribute('src', product.image);
			return card;
		});
		this._gallery.replaceChildren(...productCards);
		return this._container;
	}
}
