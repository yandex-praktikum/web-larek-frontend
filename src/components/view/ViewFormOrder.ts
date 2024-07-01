import { ViewForm } from "./ViewForm";
import { IViewFormOrder, TPaymentMethod, TViewForm } from "../../types";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";


export class ViewFormOrder extends ViewForm implements IViewFormOrder{                                         // форма заказа с способом оплаты и адресом доставки 
  protected buttonsContainer: HTMLElement;                                                                     // контейнер с кнопками
  protected buttonOnline: HTMLButtonElement;                                                                   // кнопка оплаты онлайн   
  protected buttonOnDelivery: HTMLButtonElement;                                                               // кнопка оплаты по получении
  protected addressInput: HTMLInputElement;                                                                    // поле ввода адреса

  constructor(container: HTMLFormElement, events:IEvents) {
    super(container, events);
    this.buttonsContainer = ensureElement<HTMLElement>('.order__buttons', container);
    this.buttonOnline = ensureElement<HTMLButtonElement>('.button[name=card]', container);
    this.buttonOnDelivery = ensureElement<HTMLButtonElement>('.button[name=cash]', container);
    this.addressInput = ensureElement<HTMLInputElement>('.form__input[name=address]', container);

    this.buttonOnline.addEventListener('click', () =>{                                                          //слушатель события на кнопку оплаты онлайн
      this.paymentMethod = 'card';
      this.changeInput('payment', 'card');
    })

    this.buttonOnDelivery.addEventListener('click', ()=> {                                                       //слушатель события на кнопку оплаты по получении
      this.paymentMethod = 'cash';
      this.changeInput('payment', 'cash');
    })
  }

  protected getButtonActive(): HTMLButtonElement | null {                                                        // возвратить кнопку, которая активна
    if(this.buttonOnline.classList.contains('button_alt-active')) {
      return this.buttonOnline
    } 

    else if(this.buttonOnDelivery.classList.contains('button_alt-active')) {
      return this.buttonOnDelivery
    }

    return null;
}

  set paymentMethod (value: TPaymentMethod) {                                                       
    this.buttonOnDelivery.classList.toggle('.button_alt-active', value === 'cash')
    this.buttonOnline.classList.toggle('.button_alt-active', value === 'card')
  }

  get address() {
    return this.addressInput.value
  }

  
}