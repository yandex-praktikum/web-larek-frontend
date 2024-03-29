// Application layer

import './scss/styles.scss';

import { Home } from './components/HomeView';
import { EventEmitter } from './events';
import { ProductService } from './services/product.service';
import { Product } from './types';

// ~~~~~~~~~~~~ event emitter ~~~~~~~~~~~~ //

const events = new EventEmitter();

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// ~~~~~~~~~~~~~~~ сервисы ~~~~~~~~~~~~~~~ //

const productService = new ProductService();

// ~~~~~~~~~~~~ представления ~~~~~~~~~~~~ //

const homePage = new Home({
	onProductCardClick: (id) => events.emit('card:select', { id }),
});

// ~~~~~~~~~~~~~~~ события ~~~~~~~~~~~~~~~ //

events.on('start', () => {
	productService.getProducts().then((products) => {
		homePage.gallery = products;
	});
});

events.on<{ id: Product['id'] }>('card:select', ({ id }) => {
	productService.getProduct(id).then((product) => {
		console.log('Товар, полученный с сервера:', product);
	});
});

// ~~~~~~~~~~~~~ точка входа ~~~~~~~~~~~~~ //

events.emit('start');
