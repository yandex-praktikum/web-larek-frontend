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

	get isValidated(): boolean {
		return this._value.items.length > 0;
	}
}

export class OrderState {
	private _value: Order;

	constructor() {
		this._value = emptyOrder();
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
}
