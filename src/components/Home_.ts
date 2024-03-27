import { Product } from '../types';
import { IHome } from '../ui.ports';
import { cloneTemplate } from '../utils/utils';

type HomeModel = {
	products: Product[];
};

type HomeEvents = {
	onProductCardClick: (id: Product['id']) => void;
};

export class Home implements IHome {
	private _events: HomeEvents;

	constructor(events: HomeEvents) {
		this._events = events;
	}
	render(model: HomeModel) {
		const productCards = model.products.map((product) => {
			const card = cloneTemplate(this._card);
			card.addEventListener('click', () =>
				this._events.onProductCardClick(product.id)
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
