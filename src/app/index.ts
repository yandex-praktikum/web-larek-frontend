// Application layer

import { Home } from '../components/HomeView';
import { ProductService } from '../services/product.service';
import { Product } from '../types';
import { EventEmitter } from './events';

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
