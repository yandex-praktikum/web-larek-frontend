import { ensureElement } from '../utils/utils';
import { AppView } from './AppView.base';

interface IHomeViewModel {
	counter: number;
	gallery: HTMLElement[];
	locked: boolean;
}

interface IHomeViewEvents {
	onBasketOpenClick: () => void;
}

export class HomeView extends AppView<IHomeViewModel> {
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

	set gallery(elements: HTMLElement[]) {
		this._gallery.replaceChildren(...elements);
	}

	set locked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
