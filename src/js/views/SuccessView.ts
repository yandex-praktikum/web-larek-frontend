import { ensureElement } from '../utils/utils';
import { AppView } from './AppView.base';

interface ISuccessViewEvents {
	onClose: () => void;
}

export class SuccessView extends AppView<undefined> {
	private _closeButton: HTMLButtonElement;
	constructor(events: ISuccessViewEvents) {
		super('successTemplate');

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this.container
		);
		this._closeButton.addEventListener('click', () => {
			events.onClose();
		});
	}
}
