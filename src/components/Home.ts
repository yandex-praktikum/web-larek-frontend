import { Product } from '../types';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { Page } from './Page';

interface IHomeModel {
	counter: number;
	gallery: Product[];
	locked: boolean;
}

interface IHomeEvents {
	onProductCardClick: (id: Product['id']) => void;
}

export class Home extends Page<IHomeModel> {
	protected _counter: HTMLElement;
	protected _gallery: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(private events: IHomeEvents) {
		super();

		this._gallery = ensureElement<HTMLElement>('.gallery');
	}

	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	set gallery(items: Product[]) {
		const cards = items.map((product) => {
			const cardElement = cloneTemplate(this._cardTemplate);
			cardElement.addEventListener('click', () =>
				this.events.onProductCardClick(product.id)
			);
			ensureElement('.card__category', cardElement).textContent =
				product.category;
			ensureElement('.card__title', cardElement).textContent = product.title;
			ensureElement('.card__image', cardElement).setAttribute(
				'src',
				product.image
			);

			return cardElement;
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
