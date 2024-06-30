import { IBasketData } from "../types";
import { IEvents } from "./base/events";
import { ICard } from "../types";

class BasketData implements IBasketData{
  goods: string[];
  total: 0;
  events: IEvents;
  
  constructor (events: IEvents) {
    this.events = events;
  }

  isInBasket(card: ICard) {                       //проверить, есть ли в корзине
    this.goods.includes(card.id);
  }

  addToBasket(card: ICard) {                      //добавить в корзину
    this.goods.push(card.id)
    this.total += card.price
    this.events.emit('basket:changed')
  }

  removeFromBasket(card:ICard) {                  //удалить из корзины
    this.goods.filter((id)=> id !== card.id)
    this.total -=card.price
    this.events.emit('basket:changed')
  }

  clearBasket() {                                 //очистить корзину
    this.goods = [];
    this.total = 0;
    this.events.emit('basket:changed');
  }

  getGoodsNumber(): number {                      // получить общее количество добавленных товаров в корзину
    return this.goods.length
  }

};