import {
  ICard } from '../types/index'
import { IEvents } from './base/events';

export class CardsData {
  protected _cards: ICard[];
  protected _preview: string | null;
  protected events: IEvents;

  constructor (events: IEvents) {
    this.events = events;
  }

  set cards(cards: ICard[]) {
    this._cards = cards;
    this.events.emit('cards:changed');
  }

  get cards() {
    return this._cards;
  }

  addCard(card: ICard) {
    this._cards = [card, ...this._cards];
    this.events.emit('cards:changed');
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  deleteCard (cardId: string, payload: Function | null = null): void {
    this._cards = this._cards.filter(function(card) {card.id !== cardId})
    if (payload) {
      payload()
    }
    else {
      this.events.emit('cards:changed')
    }
  }

  getCard (cardId: string) {
    return this._cards.find(function(card) {card.id === cardId})
  }

  set preview(cardId) {
    if(!cardId) {
      this._preview = null
      return
    }
    const selectedCard = this.getCard(cardId)
    if (selectedCard) {
      this._preview = cardId
      this.events.emit("card:selected")
    }
  }

  get preview() {
    return this._preview;
  }
}

