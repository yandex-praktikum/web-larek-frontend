import { ViewCardCatalogue } from "./ViewCardCatalogue";
import { ICard } from "../../types/index"
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";

export class ViewCardPreview extends ViewCardCatalogue<ICard> {
  protected _description: HTMLParagraphElement;
  protected buttonBuy: HTMLButtonElement;

  constructor (container: HTMLElement, events: IEvents) {
    super(container, events)
    this._description = ensureElement<HTMLParagraphElement>('.card__text', container);
    this.buttonBuy = ensureElement<HTMLButtonElement>('.button', container);
    this.buttonBuy.addEventListener('click', () => this.events.emit('viewCard:addToBasket', {id: this.id}))
  }

  set description (value: string) {
    this.setText(this._description, value);
  }

  get description () {
    if(this._description.textContent) {
      return this._description.textContent;
    }
    else {
      return ''
    }
  }

  setButtonBuy (value: string) {
    this.setText(this.buttonBuy, value);
  }

}