import { Component } from '../ui/Component';
import { cloneTemplate, ensureElement } from '../utils/utils';

interface ISuccessViewEvents {
	onClose: () => void;
}

export class SuccessView extends Component<undefined> {
	private _closeButton: HTMLButtonElement;
	constructor(template: HTMLTemplateElement, events: ISuccessViewEvents) {
		const container = cloneTemplate(template);
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			container
		);
		this._closeButton.addEventListener('click', () => {
			events.onClose();
		});
	}
}
