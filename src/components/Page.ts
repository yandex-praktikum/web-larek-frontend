import {ensureElement} from "../utils/utils";
import {IPage} from '../types/index';
import {Component} from "./base/Component";
import {IEvents} from "./base/events";

export class Page extends Component<IPage> {
	protected _basketCount: HTMLElement;
  protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;
	protected _catalog: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');
		this._basketCount = ensureElement<HTMLElement>('.header__basket-counter');
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	set locked(value: boolean) {
		if (!value) {
    	this.removeClass(this._wrapper, 'page__wrapper_locked');
		}else{
    	this.addClass(this._wrapper, 'page__wrapper_locked');
		}
	}

	set counter(value: number){
		this.setText(this._basketCount, String(value));
	}
}