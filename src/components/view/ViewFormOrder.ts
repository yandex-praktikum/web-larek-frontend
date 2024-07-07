import { ViewForm } from "./ViewForm";
import { IViewFormOrder, TPaymentMethod, TViewForm, TViewFormOrder } from "../../types";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";


export class ViewFormOrder extends ViewForm<TViewFormOrder> implements IViewFormOrder{                                         // форма заказа с способом оплаты и адресом доставки 
  protected buttonsContainer: HTMLDivElement;                                                                  // контейнер с кнопками
  protected buttonOnline: HTMLButtonElement;                                                                   // кнопка оплаты онлайн   
  protected buttonOnDelivery: HTMLButtonElement;                                                               // кнопка оплаты по получении
  protected addressInput: HTMLInputElement;                                                                    // поле ввода адреса

  constructor(container: HTMLFormElement, events:IEvents) {
    super(container, events);
    this.buttonsContainer = ensureElement<HTMLDivElement>('.order__buttons', container);
    this.buttonOnline = ensureElement<HTMLButtonElement>('.button[name=card]', container);
    this.buttonOnDelivery = ensureElement<HTMLButtonElement>('.button[name=cash]', container);
    this.addressInput = ensureElement<HTMLInputElement>('.form__input[name=address]', container);

    this.buttonsContainer.addEventListener('click', (event) => {                                              // переключает кнопку выбора оплаты метода платежа
      if((event.target === this.buttonOnline) || (event.target === this.buttonOnDelivery)) {
        const buttonActive = event.target as HTMLButtonElement;
        this.resetButtons();
        this.toggleClass(buttonActive, 'button_alt-active');
        this.events.emit('order:valid')
      }
    })
  }

  protected getButtonActive(): HTMLButtonElement | null {                                                        // возвращает кнопку, которая активна
    if(this.buttonOnline.classList.contains('button_alt-active')) {
      return this.buttonOnline
    } 

    else if(this.buttonOnDelivery.classList.contains('button_alt-active')) {
      return this.buttonOnDelivery
    }

    return null;
  }

  protected resetButtons(): void {                                                                               //сбрасывает активный статус кнопки                                                   
    this.toggleClass(this.buttonOnline, '.button_alt-active', false);
    this.toggleClass(this.buttonOnDelivery, '.button_alt-active', false);
  }

  set paymentMethod (value: TPaymentMethod) {                                                                   // устанавливает метод платежа                                     
    this.buttonOnDelivery.classList.toggle('.button_alt-active', value === 'cash')
    this.buttonOnline.classList.toggle('.button_alt-active', value === 'card')
  }

  get address() {                                                                                               // записывает адрес
    return this.addressInput.value
  }

  get valid() {                                                                                                  //возвращает "валидность"
    if(!(super.valid) && Boolean(this.paymentMethod)) {
      return false
    }
    else if ((super.valid) && Boolean(this.paymentMethod)) {
      return true
    }
    else if ((super.valid) && !Boolean(this.paymentMethod)) {
      return true
    }
    return true
  }

  set valid(value: boolean) {                                                                                     //устанавливает "валидность"
    super.valid = value;
  }
  
  clear(){                                                                                                        //очищает форму, сбрасывает кнопки
    super.clear();
    this.resetButtons();
  }
}