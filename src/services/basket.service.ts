import { emptyBasket } from '../models/basket';
import { Basket, IBasketService, Product } from '../types';

export class BasketService implements IBasketService {
	constructor() {
		this.basket = emptyBasket();
	}

	private basket: Basket;

	addItem(item: Product) {
		this.basket.items.push(item);
	}

	removeItem(index: number) {
		this.basket.items = this.basket.items.filter((_, i) => i === index);
	}

	clear() {
		this.basket.items = [];
	}
}
