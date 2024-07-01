import { IViewFormContacts } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { ViewForm } from "./ViewForm";

export class ViewFormContacts extends ViewForm implements IViewFormContacts {
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
}