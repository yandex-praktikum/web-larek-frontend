import { IViewFormContacts, TViewFormContacts } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { ViewForm } from "./ViewForm";

export class ViewFormContacts extends ViewForm<TViewFormContacts> implements IViewFormContacts {
  protected emailInput: HTMLInputElement;
  protected telephoneInput: HTMLInputElement;

  constructor(container: HTMLElement, events:IEvents){
    super(container, events);
    this.emailInput = ensureElement<HTMLInputElement>('.form__input[name=email]', container);
    this.telephoneInput = ensureElement<HTMLInputElement>('.form__input[name=phone]', container);
  }

  get email() {
    return this.emailInput.value;
  }

  get telephone() {
    return this.telephoneInput.value
  }

  get valid() {
    if(Boolean(this.emailInput.value) && Boolean(this.telephoneInput.value)) {
      this.errorMessage ='';
      return false
    }
    else if(super.valid) {
      this.errorMessage ='Заполните поля эл. почты и телефона';
      return true
    }
    else if(!Boolean(this.emailInput.value) && Boolean(this.telephoneInput.value)) {
      this.errorMessage ='Заполните поле эл. почты';
      return true
    }
    else if(Boolean(this.emailInput.value) && !Boolean(this.telephoneInput.value)) {
      this.errorMessage ='Заполните поле телефона';
      return true
    }
    return true
  }

  set valid(value: boolean) {
    super.valid = value;
  }
}