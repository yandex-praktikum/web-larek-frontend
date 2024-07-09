import { ViewCardCatalogue } from "./ViewCardCatalogue";
import { ICard, IViewCardPreview, TViewCardPreview } from "../../types/index"
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";
import { categories } from "../../utils/constants";
import { ViewCard } from "./ViewCard";

export class ViewCardPreview<TViewCardPreview> extends ViewCard<TViewCardPreview> implements IViewCardPreview {
  protected buttonBuy: HTMLButtonElement;
  protected _category: HTMLSpanElement;

  constructor (container: HTMLElement, events: IEvents) {
    super(container, events)
    this.buttonBuy = ensureElement<HTMLButtonElement>('.button', container);
    this.buttonBuy.addEventListener('click', () => this.events.emit('viewCard:addToBasket', {id: this.id}))
    this._category = ensureElement<HTMLSpanElement>('.card__category', container);
  }

  set category(value: string) {                             // запись данных категории товара (текстКонтент и доп класс)
    this.addClassToCategory(value);
    console.log(this)
    this.setText(this._category, value);
  }

  get category() {                                          // получение категории товара (текстКонтента или ничего, если категория нулевая или неопределенная)
    return this._category.textContent ?? '';
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