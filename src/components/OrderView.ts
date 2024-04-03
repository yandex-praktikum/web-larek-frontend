import { Component } from '../ui/Component';
import { cloneTemplate, ensureElement } from '../utils/utils';

type Step = 'payment' | 'phone' | 'done';

interface IOrderViewModel {
	paymentType: 'online' | 'onReceipt';
	address: string;
	email: string;
	phoneNumber: string;
}

// interface IOrderViewEvents {}

abstract class OrderView extends Component<IOrderViewModel> {
	constructor(template: HTMLTemplateElement) {
		const container = cloneTemplate(template);
		super(container);
	}
}

export class OrderPaymentStepView extends OrderView {
	private _buttonOnline: HTMLButtonElement;
	private _buttonOnReceipt: HTMLButtonElement;

	constructor(template: HTMLTemplateElement) {
		super(template);

		this._buttonOnline = ensureElement<HTMLButtonElement>(
			'.button:first-child',
			this.container
		);
		this._buttonOnReceipt = ensureElement<HTMLButtonElement>(
			'.button:nth-child(2)',
			this.container
		);
	}
}
