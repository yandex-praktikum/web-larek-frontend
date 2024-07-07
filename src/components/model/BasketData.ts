import { IBasketData } from "../../types/index";
import { IEvents } from "../base/events";
import { ICard } from "../../types/index";
import { TId } from '../../types/index'

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

  set goods (cards: ICard[]) {
    this._goods = cards;
  }

  isInBasket(id: string) {                                                     // проверяет наличие продукта в корзине по id
    return Boolean(this._goods.find(good => good.id === id));
  }


  addToBasket(card: ICard) {                                                   //добавить в корзину
    this._goods.push(card)
    this.total += card.price
    this.events.emit('basketData:changed', {id: card.id})
  }

  removeFromBasket(card: ICard) {                                               //удалить из корзины
    this._goods = this._goods.filter((good)=> {good.id !== card.id})
    this.events.emit('basketData:changed', {card})
  }

  clearBasket() {                                                              //очистить корзину
    this._goods = [];
    this.total = 0;
    this.events.emit('basketData:changed');
  }

  getGoodsNumber(): number {                                                    // получить общее количество добавленных товаров в корзину
    return this._goods.length
  }

  getTotal(): number {                                                                 // получить общую сумму и стоимость всех товаров, добавленных в корзину
    return this._goods.reduce((sum, good) => { return sum + good.price }, 0);
}

  getIdsOfGoods() {
    const ids = this._goods.map((good) => {return good.id})
    return ids
  }

};