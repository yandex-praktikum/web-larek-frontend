import { View } from "./View";
import { IPage } from "../../types/index";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";


export class ViewPage extends View<IPage> implements IPage {
    protected _gallery: HTMLElement;
    protected buttonBasket: HTMLButtonElement;
    protected _counter: HTMLSpanElement;
    protected screen: HTMLDivElement;

 constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this.buttonBasket = ensureElement<HTMLButtonElement>('.header__basket', container);
    this.buttonBasket.addEventListener('click', () => events.emit('modal-basket:open'));
    this._counter = ensureElement<HTMLSpanElement>('.header__basket-counter', this.buttonBasket);
    this._gallery = ensureElement<HTMLElement>('.gallery', container);
    this.screen = ensureElement<HTMLDivElement>('.page__wrapper', container)
   }

   set catalog(viewCards: HTMLElement[]) {                      // устанавливает содержание каталога карточек - заменяет отрендеренными карточками товаров имеющиеся в каталоге 
      this._gallery.replaceChildren(...viewCards)
   }

   set counter(value: number) {                                 // устанавливает значение счетчика товаров в корзине
      this._counter.textContent = String(value);
   }

   lockScreen(value: boolean) {                                 // блокирует экран (добавляет соответствующие класс экрану)
      if(value) {this.screen.classList.add('page__wrapper_locked')}
      else{this.screen.classList.remove('page__wrapper_locked')}
   }
}