// Application layer

import { HomeView } from '../components/HomeView';
import { ModalView } from '../components/ModalView';
import { ProductView } from '../components/ProductView';
import { BasketService } from '../services/basket.service';
import { ProductService } from '../services/product.service';
import { Product, ProductId } from '../types';
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
const basketService = new BasketService();

// ~~~~~~~~~~~~ представления ~~~~~~~~~~~~ //

const homeView = new HomeView({
	onProductCardClick: (id) => events.emit('card:select', { id }),
});

const modalView = new ModalView(UiConfig.predefinedElements.modalContainer);

// ~~~~~~~~~~~~~~~ события ~~~~~~~~~~~~~~~ //

events.on('start', () => {
	productService.getProducts().then((products) => {
		homeView.products = products;
	});
});

events.on<{ id: ProductId }>('card:select', ({ id }) => {
	productService.getProduct(id).then((product) => {
		const productView = new ProductView(
			UiConfig.templates.cardPreviewTemplate,
			{
				toggleBasket: () => {
					events.emit('card:toggleBasket', { product });
					modalView.close();
				},
			},
			'full'
		);
		const content = productView.render(product);
		modalView.content = content;
		modalView.open();
	});
});

events.on<{ product: Product }>('card:toggleBasket', ({ product }) => {
	basketService.addItem(product);
	console.log(basketService);
});

// ~~~~~~~~~~~~~ точка входа ~~~~~~~~~~~~~ //

events.emit('start');
