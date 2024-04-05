import { ensureElement } from '../utils/utils';
import { AppComponent } from './AppComponent';

interface ISuccessViewEvents {
	onClose: () => void;
}

export class SuccessView extends AppComponent<undefined> {
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
