// Application layer

import './scss/styles.scss';

import { Home } from './components/HomeView';
import { EventEmitter } from './events';
import { ProductService } from './services/product.service';
import { Product } from './types';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const events = new EventEmitter();

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const productService = new ProductService();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const homePage = new Home({
	onProductCardClick: (id) => events.emit('card:select', { id }),
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

events.on('start', () => {
	productService.getProducts().then((products) => {
		homePage.gallery = products;
	});
});

events.on<{ id: Product['id'] }>('card:select', ({ id }) => {
	productService.getProduct(id).then((product) => {
		console.log(product);
	});
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

events.emit('start');
