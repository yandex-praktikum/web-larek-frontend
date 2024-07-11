import { ICard, IViewCardPreview, TViewCardPreview } from "../../types/index"
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";
import { ViewCard } from "./ViewCard";

export class ViewCardPreview<TViewCardPreview> extends ViewCard<TViewCardPreview> implements IViewCardPreview {
  protected buttonBuy: HTMLButtonElement;
  
  constructor (container: HTMLElement, events: IEvents) {
    super(container, events)
    this.buttonBuy = ensureElement<HTMLButtonElement>('.button', container);
    this.buttonBuy.addEventListener('click', () => {
      if (this.buttonBuy.textContent === 'Убрать из корзины') {
        this.events.emit('viewCard:deleteFromBasket', {id: this.id})
      }
      else {this.events.emit('viewCard:addToBasket', {id: this.id})}
      })

  }



  set invalidPrice (value: boolean) {
    this.setDisabled(this.buttonBuy, value)
  }

  get invalidPrice () {
    return this.buttonBuy.disabled; 
  }

  set buttonValidation (value: boolean) {
    if (this.invalidPrice) {
      this.setText(this.buttonBuy, 'Не продается');
    }
    else if (value) {
      this.setText(this.buttonBuy, 'Убрать из корзины');
    }
    else {
      this.setText(this.buttonBuy, 'Купить')}
  }
}