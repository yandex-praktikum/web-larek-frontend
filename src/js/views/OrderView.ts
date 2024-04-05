import { ensureElement } from '../utils/utils';
import { AppView, AvailableContainer } from './AppView.base';

interface IOrderViewModel {
	payment: 'card' | 'cash';
	validation?: { key: string; value: string }[];
	submitDisabled?: boolean;
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

abstract class OrderView extends AppView<IOrderViewModel> {
	protected _submitButton: HTMLButtonElement;
	protected _formErrors: HTMLElement;

	constructor(element: AvailableContainer) {
		super(element);

		this._submitButton = ensureElement<HTMLButtonElement>(
			'button[type="submit"]',
			this.container
		);

		this._formErrors = ensureElement<HTMLElement>(
			'.form__errors',
			this.container
		);

		this.container.addEventListener('submit', () => {
			(this.container as HTMLFormElement).reset();
		});
	}

	set validation(value: IOrderViewModel['validation']) {
		this.setDisabled(this._submitButton, value.length !== 0);

		if (value.length === 0) {
			this.setText(this._formErrors, '');
		} else {
			this.setText(this._formErrors, value.map((x) => x.value).join('. '));
		}
	}

	set submitDisabled(value: boolean) {
		this.setDisabled(this._submitButton, value);
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
}
