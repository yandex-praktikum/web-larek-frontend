import { IBasketData } from "../../types/index";
import { IEvents } from "../base/events";
import { ICard } from "../../types/index";

export class BasketData implements IBasketData{
  protected _goods: ICard[] = [];
  total: 0;
  events: IEvents;
  
  constructor (events: IEvents) {
    this.events = events;

  }

  get goods() {
    return this._goods
  }

  isInBasket(id: string) {                                                     //проверить, есть ли в корзине
    return Boolean(this._goods.find(good => good.id === id));
  }

  addToBasket(card: ICard) {                                                   //добавить в корзину
    this._goods.push(card)
    this.total += card.price
    this.events.emit('basket:changed')
  }

  removeFromBasket(card:ICard) {                                               //удалить из корзины
    this._goods.filter((good)=> {good.id !== card.id})
    this.total -=card.price
    this.events.emit('basket:changed')
  }

  clearBasket() {                                                              //очистить корзину
    this._goods = [];
    this.total = 0;
    this.events.emit('basket:changed');
  }

  getGoodsNumber(): number {                      // получить общее количество добавленных товаров в корзину
    return this._goods.length
  }

};