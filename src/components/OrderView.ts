import { Component } from '../ui/Component';
import { cloneTemplate, ensureElement } from '../utils/utils';
import { AppComponent, AvailableContainer } from './AppComponent';

interface IOrderViewModel {
	payment: 'card' | 'cash';
	isPaymentValidated: boolean;
	isContactsValidated: boolean;
}

interface IOrderPaymentStepViewEvents {
	buttonOnlineClick: () => void;
	buttonOnReceiptClick: () => void;
	addressChange: (value: string) => void;
	submit: () => void;
}

interface IOrderContactsStepEvents {
	emailChange: (value: string) => void;
	phoneNumberChange: (value: string) => void;
	submit: () => void;
}

abstract class OrderView extends AppComponent<IOrderViewModel> {
	protected _submitButton: HTMLButtonElement;

	constructor(element: AvailableContainer) {
		super(element);

		this._submitButton = ensureElement<HTMLButtonElement>(
			'button[type="submit"]',
			this.container
		);
	}
}

export class OrderPaymentStepView extends OrderView {
	private _buttonOnline: HTMLButtonElement;
	private _buttonOnReceipt: HTMLButtonElement;
	private _addressInput: HTMLInputElement;

	constructor(events: IOrderPaymentStepViewEvents) {
		super('orderTemplate');

		this._buttonOnline = ensureElement<HTMLButtonElement>(
			'button[name="card"]',
			this.container
		);
		this._buttonOnReceipt = ensureElement<HTMLButtonElement>(
			'button[name="cash"]',
			this.container
		);

		this._addressInput = ensureElement<HTMLInputElement>(
			'input[name="address"]',
			this.container
		);

		this._buttonOnline.addEventListener('click', () => {
			events.buttonOnlineClick();
		});

		this._buttonOnReceipt.addEventListener('click', () => {
			events.buttonOnReceiptClick();
		});

		this._addressInput.addEventListener('input', (ev: InputEvent) => {
			return 'value' in ev.target
				? events.addressChange(String(ev.target.value))
				: undefined;
		});

		this.container.addEventListener('submit', (ev) => {
			ev.preventDefault();
			events.submit();
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

export class OrderContactsStepView extends OrderView {
	private _emailInput: HTMLInputElement;
	private _phoneNumberInput: HTMLInputElement;

	constructor(events: IOrderContactsStepEvents) {
		super('contactsTemplate');

		this._emailInput = ensureElement<HTMLInputElement>(
			'input[name="email"]',
			this.container
		);
		this._phoneNumberInput = ensureElement<HTMLInputElement>(
			'input[name="phone"]',
			this.container
		);

		this._emailInput.addEventListener('input', (ev) => {
			'value' in ev.target
				? events.emailChange(String(ev.target.value))
				: undefined;
		});
		this._phoneNumberInput.addEventListener('input', (ev) => {
			'value' in ev.target
				? events.phoneNumberChange(String(ev.target.value))
				: undefined;
		});
		this.container.addEventListener('submit', (ev) => {
			ev.preventDefault();
			events.submit();
		});
	}

	set isContactsValidated(value: boolean) {
		this.setDisabled(this._submitButton, !value);
	}
}
