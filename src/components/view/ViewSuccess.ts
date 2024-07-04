import { IViewSuccess } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { View } from "./View";

class ViewSuccess<IViewSuccess> extends View<IViewSuccess> {
  _message: HTMLParagraphElement;
  buttonSuccess: HTMLButtonElement;


  constructor(container: HTMLElement, events:IEvents) {
    super(container, events)
    this._message = ensureElement<HTMLParagraphElement>('.order-success__description');
    this.buttonSuccess = ensureElement<HTMLButtonElement>('.button order-success__close');
    this.buttonSuccess.addEventListener('.click', () => this.events.emit('viewSuccess:confirm'))
  }

  set message (value: number) {
    this.setText (this._message, `Списано ${value} синапсов`)
  }  
}