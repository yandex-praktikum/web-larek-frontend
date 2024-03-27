// Application layer

import './scss/styles.scss';

import { Home } from './components/Home';
import { EventEmitter } from './events';
import { ProductService } from './services/product.service';
import { Product } from './types';

const events = new EventEmitter();

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const homePage = new Home({
	onProductCardClick: (id) => events.emit('card:select', { id }),
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

events.on<Pick<Product, 'id'>>('card:select', ({ id }) => {
	productService.getProduct(id).then((product) => {
		return;
	});
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const productService = new ProductService();

export function main() {
	productService.getProducts().then((products) => {
		homePage.gallery = products;
	});
}

main();
