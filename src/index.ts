// Application layer

import './scss/styles.scss';

import { Home } from './components/Home';
import { EventEmitter } from './application/events';
import { ProductService } from './services/productService';
import { Product } from './types';
import { ensureElement } from './utils/utils';

const events = new EventEmitter();

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

const modals = {
	card: ensureElement<HTMLElement>('.modal .card'),
};
const templates = {
	cardCatalog: ensureElement<HTMLTemplateElement>('#card-catalog'),
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const homePage = new Home(
	document.body,
	{
		onProductCardClick: (id) => events.emit('card:select', { id }),
	},
	templates
);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

events.on<{ id: Product['id'] }>('card:select', ({ id }) => {
	productService.getProduct(id).then((product) => {
		return;
	});
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const productService = new ProductService();

export function main() {
	productService.getProducts().then((products) => {
		homePage.render({ products });
	});
}

main();
