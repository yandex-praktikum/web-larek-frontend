import { ensureElement } from '../utils/utils';
import { AppView } from './AppView.base';

interface ISuccessViewModel {
	description: string;
}

interface ISuccessViewEvents {
	onClose: () => void;
}

export class SuccessView extends AppView<ISuccessViewModel> {
	private _closeButton: HTMLButtonElement;
	private _description: HTMLElement;

	constructor(events: ISuccessViewEvents) {
		super('successTemplate');

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this.container
		);
		this._closeButton.addEventListener('click', () => {
			events.onClose();
		});

		this._description = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}
}
