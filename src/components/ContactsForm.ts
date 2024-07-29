import {Form} from "./Form";
import {IEvents} from "./base/events";
import {IFormContact} from "../types";

export class ContactsForm extends Form<IFormContact> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }
}