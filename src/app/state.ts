import { Order, emptyBasket, emptyOrder } from '../models';
import { Basket, Product } from '../types';

export class BasketState {
	constructor() {
		this._value = emptyBasket();
	}

	private _value: Basket;

	findItem(product: Product): number | undefined {
		const res = this._value.items.findIndex((value) => value.id === product.id);
		return res === -1 ? undefined : res;
	}

	addItem(item: Product) {
		this._value.items.push(item);
	}

	removeItem(item: Product) {
		this._value.items = this._value.items.filter((x) => x.id !== item.id);
	}

	clear() {
		this._value.items = [];
	}

	count(): number {
		return this._value.items.length;
	}

	get items(): Product[] {
		return this._value.items;
	}

	get total(): number {
		return this._value.items.reduce((acc, x) => {
			return acc + (x.price || 0);
		}, 0);
	}
}

export class OrderState {
	private _value: Order;
	private _validation: { [key: string]: string } = {};

	constructor() {
		this._value = emptyOrder();
	}

	clear() {
		this._value = emptyOrder();
	}

	get validation(): typeof this._validation | undefined {
		if (this._value.items.length === 0) {
			this._validation.address = 'Не заполнено значение';
		} else {
			this._validation = undefined;
		}
		return this._validation;
	}

	get value(): Order {
		return this._value;
	}

	set value(value: Order) {
		this._value = value;
	}

	get isPaymentValidated(): boolean {
		return this._value.address.length > 0;
	}

	get isContactsValidated(): boolean {
		return this._value.email.length > 0 && this._value.phone.length > 0;
	}

	get payment(): Order['payment'] {
		return this._value.payment;
	}

	set payment(value: Order['payment']) {
		this._value.payment = value;
	}

	get address(): Order['address'] {
		return this._value.address;
	}

	set address(value: string) {
		this._value.address = value;
	}

	get email(): Order['email'] {
		return this._value.email;
	}

	set email(value: string) {
		this._value.email = value;
	}

	get phone(): Order['phone'] {
		return this._value.phone;
	}

	set phone(value: string) {
		this._value.phone = value;
	}

	get items(): Order['items'] {
		return this._value.items;
	}

	set items(value: Order['items']) {
		this._value.items = value;
		this._value.total = value.reduce((acc, x) => acc + x.price || 0, 0);
	}
}
