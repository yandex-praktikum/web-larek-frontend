import { IViewCard } from "../../types/index";
import { IEvents } from "../base/events";
import { View } from '../view/View';
import { ensureElement } from "../../utils/utils";


export class ViewCard<T> extends View<T> implements IViewCard {
  protected _id: string;
  protected _name: HTMLHeadingElement;
  protected _price: HTMLSpanElement;

  constructor (container: HTMLElement, events:IEvents) {
    super(container, events);
    this._name = ensureElement<HTMLHeadingElement>('.card__title', container);
    this._price = ensureElement<HTMLSpanElement>('.card__price', container);
  }

set id(value: string) {                                                          // запись id карточки товара
    this._id = value;
}

get id() {                                                                        // получение id карточки товара 
    return this._id;
}

set name(value: string) {                                                        //запись имени карточки товара
    this.setText(this._name, value);
}

get name() {                                                                     // получение имени карточки товара
    return this._name.textContent ?? '';
}

set price(value: string) {                                                       // запись цены товара
    this.setText(this._price, value ? `${value} синапсов` : `Бесценно`)
  }

  get price(){                                                                   // получение цены товара
    return this._price.textContent ?? ''
  }
}
