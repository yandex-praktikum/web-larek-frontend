import { emptyBasket } from '../models';
import { Basket, Product } from '../types';

export class BasketState {
	constructor() {
		this._basket = emptyBasket();
	}

	private _basket: Basket;

	findItem(product: Product): number | undefined {
		const res = this._basket.items.findIndex(
			(value) => value.id === product.id
		);
		return res === -1 ? undefined : res;
	}

	addItem(item: Product) {
		this._basket.items.push(item);
	}

	removeItem(item: Product) {
		this._basket.items = this._basket.items.filter((x) => x.id !== item.id);
	}

	clear() {
		this._basket.items = [];
	}

	count(): number {
		return this._basket.items.length;
	}

	get items(): Product[] {
		return this._basket.items;
	}

	get total(): number {
		return this._basket.items.reduce((acc, x) => {
			return acc + (x.price || 0);
		}, 0);
	}

	get isValidated(): boolean {
		return this._basket.items.length > 0;
	}
}
