import { ICard } from "../../types/index";
import { ICardsData } from "../../types/index";
import { IEvents } from "../base/events";

export class CardsData implements ICardsData {
  _cards: ICard[];
  _preview: ICard | null;

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

  getPreview() {
    return this._preview;
  }
}

