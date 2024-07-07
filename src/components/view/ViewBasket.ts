import { TViewBasket } from "../../types";
import { IEvents } from "../base/events";
import { View } from './View'
import { ensureElement } from "../../utils/utils";


export class ViewBasket extends View<TViewBasket> {
  protected _cardList: HTMLUListElement;          //DOM элемент списка карточек товаров, добавленных в корзину 
  protected totalCost: HTMLSpanElement;           //DOM элемент спана с общей стоимостью товаров, добвленных в корзину
  protected basketToOrder: HTMLButtonElement;     //DOM элемент кнопки передачи товаров в заказ - "Оформить"

  constructor(container: HTMLElement, events:IEvents) {
    super(container, events)
    this._cardList = ensureElement<HTMLUListElement>('.basket__list', container);
    this.totalCost = ensureElement<HTMLSpanElement>('.basket__price', container);
    this.basketToOrder = ensureElement<HTMLButtonElement>('.basket__button', container);

    this.basketToOrder.addEventListener('click', () => this.events.emit('viewOrder:open'))
  }

  set cards(items: HTMLElement[]) {               // устанавливает список карточек добавленных товаров в корзину
    this._cardList.replaceChildren(...items)
  }

  set total(value: number) {                      // устанавливает общую стоимость товаров
    this.setText(this.totalCost, `${value} синапсов`);
  }

  set emptyCheck(state: boolean) {                // блокирует кнопку "Оформить" в пустой корзине
    this.setDisabled(this.basketToOrder, state); 
}
}