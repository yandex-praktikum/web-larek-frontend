// Application layer

import { HomeView } from '../components/HomeView';
import { ModalView } from '../components/ModalView';
import { ProductView } from '../components/ProductView';
import { ProductService } from '../services/product.service';
import { Product } from '../types';
import { EventEmitter } from './events';
import { UiConfig } from './uiConfig';

// ~~~~~~~~~~~~ event emitter ~~~~~~~~~~~~ //

const events = new EventEmitter();

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// ~~~~~~~~~~~~~~~ сервисы ~~~~~~~~~~~~~~~ //

const productService = new ProductService();

// ~~~~~~~~~~~~ представления ~~~~~~~~~~~~ //

const homeView = new HomeView({
	onProductCardClick: (id) => events.emit('card:select', { id }),
});

const modalView = new ModalView(UiConfig.predefinedElements.modalContainer, {
	onOpen: () => {},
	onClose: () => {},
});

// ~~~~~~~~~~~~~~~ события ~~~~~~~~~~~~~~~ //

events.on('start', () => {
	productService.getProducts().then((products) => {
		homeView.products = products;
	});
});

events.on<{ id: Product['id'] }>('card:select', ({ id }) => {
	productService.getProduct(id).then((product) => {
		const productView = new ProductView(
			UiConfig.templates.cardPreviewTemplate,
			{
				toggleBasket: () => {},
			},
			'full'
		);
		const content = productView.render(product);
		modalView.content = content;
		modalView.open();
	});
});

// ~~~~~~~~~~~~~ точка входа ~~~~~~~~~~~~~ //

events.emit('start');
