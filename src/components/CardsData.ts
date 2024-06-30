import {
  IBasketData,
  ICard, ICardsData } from '../types/index'
import { IEvents } from './base/events';

export class CardsData implements ICardsData {
  _cards: ICard[];
  _preview: ICard | null;
  basket: IBasketData = {
    goods: [],
    total: 0
  };
  events: IEvents;

  constructor (events: IEvents) {
    this.events = events;
  }

  set cards(cards: ICard[]) {
    this._cards = cards;
    this.events.emit('cards:changed', this.cards);
  }

  get cards() {
    return this._cards;
  }

  setPreview(card: ICard) {
    this._preview = card;
    this.events.emit('preview:changed', this._preview);
  }

  isInBasket(card: ICard) {
    this.basket.goods.includes(card.id);
  }

  addToBasket(card: ICard) {
    this.basket.goods.push(card.id)
    this.basket.total += card.price
    this.events.emit('basket:changed', this.basket)
  }

  removeFromBasket(card:ICard) {
    this.basket.goods.filter((id)=> id !== card.id)
    this.basket.total -=card.price
    this.events.emit('basket:changed', this.basket)
  }

  clearBasket() {
    this.basket.goods = [];
    this.basket.total = 0;
    this.events.emit('basket:changed', this.basket);
  }
}

