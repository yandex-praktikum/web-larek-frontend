// Application layer

import { BasketView } from '../components/BasketView';
import { HomeView } from '../components/HomeView';
import { ModalView } from '../components/ModalView';
import { OrderPaymentStepView } from '../components/OrderView';
import {
	BasketProductView,
	CatalogProductView,
	FullProductView,
} from '../components/ProductView';
import { BasketService } from '../services/basket.service';
import { ProductService } from '../services/product.service';
import { Product, ProductId, emtpyOrder } from '../types';
import { EventEmitter } from './events';
import { Events } from './events.const';
import { UiConfig } from './uiConfig';

// ~~~~~~~ вспомогательные функции ~~~~~~~ //

// TODO: общая функция создания компонента товара - createProductView

function createBasketItem(basketView: BasketView) {
	return (product: Product) => {
		const productView = new BasketProductView(
			UiConfig.templates.cardBasketTemplate,
			{
				onDeleteClick: () => {
					events.emit(Events.BASKET_DELETE_ITEM, { product, basketView });
				},
			}
		);
		return productView.render(product);
	};
}

function createCatalogItem(product: Product) {
	const productView = new CatalogProductView(
		UiConfig.templates.cardCatalogTemplate,
		{
			onProductCardClick: () => {
				events.emit(Events.CARD_SELECT, { id: product.id });
			},
		}
	);
	return productView.render(product);
}

function createProductPreview(product: Product) {
	const productView = new FullProductView(
		UiConfig.templates.cardPreviewTemplate,
		{
			toggleBasket: () => {
				events.emit(Events.CARD_TOGGLE_BASKET, { product });
				modalView.close();
			},
		}
	);
	return productView.render({
		...product,
		isInBasket: basketService.findItem(product) !== undefined,
	});
}

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
	onBasketOpenClick: () => events.emit(Events.BASKET_OPEN),
});

const modalView = new ModalView(UiConfig.predefinedElements.modalContainer);

const basketView = new BasketView(UiConfig.templates.basketTemplate, {
	submit: () => {
		events.emit<{ items: Product[] }>(Events.BASKET_SUBMIT, {
			items: basketService.items,
		});
	},
});

// ~~~~~~~~~~~~~~~ события ~~~~~~~~~~~~~~~ //

events.on(Events.START, () => {
	productService.getProducts().then((products): void => {
		homeView.render({ gallery: products.map(createCatalogItem) });
	});
});

events.on<{ id: ProductId }>(Events.CARD_SELECT, ({ id }) => {
	productService.getProduct(id).then((product) => {
		modalView.render({ content: createProductPreview(product) });
	});
});

events.on(Events.BASKET_OPEN, () => {
	const content = basketView.render({
		items: basketService.items.map(createBasketItem(basketView)),
		total: basketService.total,
	});
	modalView.render({ content });
});

events.on<{ product: Product }>(Events.CARD_TOGGLE_BASKET, ({ product }) => {
	const itemIndex = basketService.findItem(product);
	if (itemIndex === undefined) {
		basketService.addItem(product);
	} else {
		basketService.removeItem(product);
	}
	homeView.render({ counter: basketService.count() });
});

events.on<{ product: Product; basketView: BasketView }>(
	Events.BASKET_DELETE_ITEM,
	({ product, basketView }) => {
		basketService.removeItem(product);
		homeView.render({ counter: basketService.count() });
		modalView.render({
			content: basketView.render({
				items: basketService.items.map(createBasketItem(basketView)),
				total: basketService.total,
			}),
		});
	}
);

events.on<{ items: Product[] }>(Events.BASKET_SUBMIT, ({ items }) => {
	modalView.close();
	const orderPaymentStepView = new OrderPaymentStepView(
		UiConfig.templates.orderTemplate
	);
	modalView.content = orderPaymentStepView.render(emtpyOrder());
	modalView.open();
});

// ~~~~~~~~~~~~~ точка входа ~~~~~~~~~~~~~ //

events.emit(Events.START);
