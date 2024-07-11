import { ViewForm } from "./ViewForm";
import { IViewFormOrder, TPaymentMethod, TViewForm, TViewFormOrder } from "../../types";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";
// import { isEmpty } from "../../utils/utils";


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
   
    this.buttonOnDelivery.addEventListener('click', () => {
      this.toggleClass(this.buttonOnDelivery,'button_alt-active', true) 
      this.toggleClass(this.buttonOnline, 'button_alt-active', false)
      this.events.emit('payment:input')
    })

    this.buttonOnline.addEventListener('click', () => {
      this.toggleClass(this.buttonOnline,'button_alt-active', true) 
      this.toggleClass(this.buttonOnDelivery, 'button_alt-active', false)
      this.events.emit('payment:input')
    })

    this.addressInput.addEventListener('input', () => {
      this.events.emit('address:input')
    } )
    }


  getButtonActive(): HTMLButtonElement | null {                                                        // возвращает кнопку, которая активна
    if(this.buttonOnline.classList.contains('button_alt-active')) {
      return this.buttonOnline
    } 

    else if(this.buttonOnDelivery.classList.contains('button_alt-active')) {
      return this.buttonOnDelivery
    }

    return null;
  }

  resetButtons(): void {                                                                               //сбрасывает активный статус кнопки                                                   
    this.toggleClass(this.buttonOnline, '.button_alt-active', false);
    this.toggleClass(this.buttonOnDelivery, '.button_alt-active', false);
  }

  set payment (value: TPaymentMethod | null) {                                                                   // устанавливает метод платежа                                     
    if (this.buttonOnDelivery.classList.toggle('.button_alt-active', true)) {
      value === 'cash'
    }
    else if (this.buttonOnline.classList.toggle('.button_alt-active', true)) {
      value === 'online'
    }
    value === null
  }

  get payment() {// возвращает имя активной кнопки
    const buttonActive = this.getButtonActive();
    return buttonActive ? buttonActive.name as TPaymentMethod : null
  }

  get address() {                                                                                               // записывает адрес
    return this.addressInput.value
  }

  get valid() {                                                                                                  //возвращает "валидность"
    if (Boolean(this.addressInput.value) === true && (Boolean(this.payment) === true)) {
      this.errorMessage = '';
      return true
    }

    else if (Boolean(this.addressInput.value) === false && (Boolean(this.payment) === true)) {
      this.errorMessage = 'Заполните поле адреса'
      return false
    }    
    else if (Boolean(this.addressInput.value) === true && (Boolean(this.payment) === false)) {
      this.errorMessage = 'Выберите метод платежа'
      return false
    }
    return false
  }

  set valid(value: boolean) {                                                                                     //устанавливает "валидность"
    super.valid = value;
  }
  
  clear(){                                                                                                        //очищает форму, сбрасывает кнопки
    super.clear();
    this.resetButtons();
  }
}