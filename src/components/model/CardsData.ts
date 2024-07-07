import { ICard } from "../../types/index";
import { ICardsData } from "../../types/index";
import { IEvents } from "../base/events";

export class CardsData implements ICardsData {
  _cards: ICard[];
  events: IEvents;

  constructor (events: IEvents) {
    this.events = events;
  }

  set cards(cards: ICard[]) {                             // записывает данные карточек товаров
    this._cards = cards;
    this.events.emit('cards:changed', this.cards);
  }

  get cards() {                                           // получает данные карточек товаров
    return this._cards;
  }

  getCard (id: string) {                                  //находит карточку товара по id 
    return this._cards.find((card) => {
      if (card.id === id) {
        return card
      }
    })     
  }

}

