// Application layer

import { HomeView } from '../components/HomeView';
import { ModalView } from '../components/ModalView';
import { ProductView } from '../components/ProductView';
import { BasketService } from '../services/basket.service';
import { ProductService } from '../services/product.service';
import { Product, ProductId } from '../types';
import { EventEmitter } from './events';
import { Events } from './events.const';
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
	onProductCardClick: (id) => events.emit(Events.CARD_SELECT, { id }),
	onBasketOpenClick: () => events.emit(Events.BASKET_OPEN),
});

const modalView = new ModalView(UiConfig.predefinedElements.modalContainer);

// ~~~~~~~~~~~~~~~ события ~~~~~~~~~~~~~~~ //

events.on(Events.START, () => {
	productService.getProducts().then((products) => {
		homeView.products = products;
	});
});

events.on<{ id: ProductId }>(Events.CARD_SELECT, ({ id }) => {
	productService.getProduct(id).then((product) => {
		const productView = new ProductView(
			UiConfig.templates.cardPreviewTemplate,
			{
				toggleBasket: () => {
					events.emit(Events.CARD_TOGGLE_BASKET, { product });
					modalView.close();
				},
			},
			'full'
		);
		const content = productView.render({
			...product,
			isInBasket: basketService.findItem(product) !== undefined,
		});
		modalView.content = content;
		modalView.open();
	});
});

events.on<{ product: Product }>(Events.CARD_TOGGLE_BASKET, ({ product }) => {
	const itemIndex = basketService.findItem(product);
	if (itemIndex === undefined) {
		basketService.addItem(product);
	} else {
		basketService.removeItem(product);
	}
	homeView.counter = basketService.count();
});

events.on(Events.BASKET_OPEN, () => {
	console.log('opening basket...', basketService.items);
});

// ~~~~~~~~~~~~~ точка входа ~~~~~~~~~~~~~ //

events.emit(Events.START);
