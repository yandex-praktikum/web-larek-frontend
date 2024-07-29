import { IFormOrder } from '../types';
import { IEvents } from './base/events';
import { Form } from './Form';

export class OrderForm extends Form<IFormOrder> {
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;

	constructor(protected blockName: string, container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
		this._cash = container.elements.namedItem('cash') as HTMLButtonElement;
		this._card = container.elements.namedItem('card') as HTMLButtonElement;
		if (this._cash){
			this._cash.addEventListener('click', () => {
				this.addClass(this._cash, 'button_alt-active');
				this.onInputChange('payment', 'cash');
				this.removeClass(this._card, 'button_alt-active');
			});
		}
		
		if (this._card){
			this._card.addEventListener('click', () => {
				this.addClass(this._card, 'button_alt-active');
			  this.removeClass(this._cash, 'button_alt-active');
				this.onInputChange('payment', 'card');
			});
		}
	}

	set address(value: string){
		(this.container.elements.namedItem('address') as HTMLInputElement).value = value;
	}

	clearButtons() {
		this.removeClass(this._card, 'button_alt-active');
		this.removeClass(this._cash, 'button_alt-active');
	}
}