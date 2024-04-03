import { Component } from '../ui/Component';
import { cloneTemplate, ensureElement } from '../utils/utils';

interface IOrderViewModel {
	payment: 'card' | 'cash';
	address: string;
	email: string;
	phoneNumber: string;
	isPaymentValidated: boolean;
	isContantsValidated: boolean;
}

interface IOrderViewEvents {
	buttonOnlineClick: () => void;
	buttonOnReceiptClick: () => void;
}

abstract class OrderView extends Component<IOrderViewModel> {
	protected _submitButton: HTMLButtonElement;

	constructor(template: HTMLTemplateElement) {
		const container = cloneTemplate(template);
		super(container);

		this._submitButton = ensureElement<HTMLButtonElement>(
			'.order__button',
			this.container
		);
	}
}

export class OrderPaymentStepView extends OrderView {
	private _buttonOnline: HTMLButtonElement;
	private _buttonOnReceipt: HTMLButtonElement;

	constructor(template: HTMLTemplateElement, events: IOrderViewEvents) {
		super(template);

		this._buttonOnline = ensureElement<HTMLButtonElement>(
			'.button[name="card"]',
			this.container
		);
		this._buttonOnReceipt = ensureElement<HTMLButtonElement>(
			'.button[name="cash"]',
			this.container
		);

		this._buttonOnline.addEventListener('click', () => {
			events.buttonOnlineClick();
		});

		this._buttonOnReceipt.addEventListener('click', () => {
			events.buttonOnReceiptClick();
		});
	}

	set payment(value: IOrderViewModel['payment']) {
		switch (value) {
			case 'card':
				this._buttonOnline.classList.add('button_alt-active');
				this._buttonOnReceipt.classList.remove('button_alt-active');
				break;
			case 'cash':
				this._buttonOnline.classList.remove('button_alt-active');
				this._buttonOnReceipt.classList.add('button_alt-active');
				break;
		}
	}

	set isPaymentValidated(value: boolean) {
		this.setDisabled(this._submitButton, !value);
	}
}
