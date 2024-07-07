import { IViewSuccess } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./View";

export class ViewSuccess<IViewSuccess> extends View<IViewSuccess> {
  _message: HTMLParagraphElement;
  buttonSuccess: HTMLButtonElement;


  constructor(container: HTMLElement, events:IEvents) {
    super(container, events)
    this._message = ensureElement<HTMLParagraphElement>('.order-success__description', container);
    this.buttonSuccess = ensureElement<HTMLButtonElement>('.order-success__close', container);
    this.buttonSuccess.addEventListener('.click', () => this.events.emit('success:submit'))
  }

  set message (value: number) {
    this.setText (this._message, `Списано ${value} синапсов`)
  }  
}