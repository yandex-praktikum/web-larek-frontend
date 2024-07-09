import { IViewCardBasket } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/events';
import { ViewCard } from './ViewCard';
import { TViewCardBasket } from '../../types/index';

export class ViewCardBasket<TViewCardBasket> extends ViewCard<TViewCardBasket> implements IViewCardBasket {

  protected _index: HTMLSpanElement;
  protected buttonDelete: HTMLButtonElement;

  constructor (container: HTMLElement, events:IEvents) {
    super(container, events);
    
    this._index = ensureElement<HTMLSpanElement>('.basket__item-index', container);
    this.buttonDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

    this.buttonDelete.addEventListener('click', () => this.events.emit('viewCard:deleteFromBasket', {id: this.id}))
  }

  set index (value: number) {                                   // устанавливает порядковый номер (как тексовое значение спана) товара в корзине
    this.setText(this._index, value+1)
  }

  get index () {                                                // возвращает порядковый номер (как номер на основе текстового значения) товара в корзине
    return Number(this._index.textContent)
  }

  



}