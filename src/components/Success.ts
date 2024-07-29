import { Component } from './base/Component';

interface ISuccessActions {
	onClick: () => void;
}

interface ISuccess {
	total: number;
}

export class Success extends Component<ISuccess> {
	protected _description: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(protected blockName: string, container: HTMLElement, actions?: ISuccessActions){
		super(container);
		this._description = container.querySelector(`.${blockName}__description`);
		this._button = container.querySelector(`.${blockName}__close`);
		if (actions?.onClick){
	    	this._button.addEventListener('click', actions.onClick);
		}
	}

	set total(value: number){
		this.setText(this._description, `Списано ${value} синапсов`);
	}
}