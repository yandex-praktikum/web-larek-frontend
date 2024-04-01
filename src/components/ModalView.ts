import { Component } from '../ui/Component';
import { ensureElement } from '../utils/utils';

interface IModalData {
	content: HTMLElement;
}

interface IModalEvents {
	onOpen?: () => void;
	onClose?: () => void;
}

export class ModalView extends Component<IModalData> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events?: IModalEvents) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this._closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this.container.classList.add('modal_active');
		this.events?.onOpen && this.events.onOpen();
	}

	close() {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events?.onClose && this.events.onClose();
	}

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
