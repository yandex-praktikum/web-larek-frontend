import { IViewCardBasket } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { ViewCard } from './ViewCard';


export class ViewCardBasket<T> extends ViewCard<T> implements IViewCardBasket {

  protected _index: HTMLSpanElement;
  protected buttonDelete: HTMLButtonElement;

  constructor (container: HTMLElement, events:IEvents) {
    super(container, events);
    
    this._index = ensureElement<HTMLSpanElement>('.basket__item-index', container);
    this.buttonDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

    this.buttonDelete.addEventListener('click', () => {this.events.emit('viewCard:deleteFromBasket', {id: this.id})})
  }

  set index (value: number) {                                   // устанавливает порядковый номер (как тексовое значение спана) товара в корзине
    this.setText(this._index, value)
  }

  get index () {                                                // возвращает порядковый номер (как номер на основе текстового значения) товара в корзине

    if (this._index.textContent && this._index.textContent  !== "Бесценно"){
      return Number(this._index.textContent)
    }

    else {
      return 0
    }
  }

  setButtonDelete (value: string) {                             // устанавливает текст на кнопке удаления
    this.setText(this.buttonDelete, value)
  }


}