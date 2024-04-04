// Application layer

import { BasketView } from '../components/BasketView';
import { HomeView } from '../components/HomeView';
import { ModalView } from '../components/ModalView';
import {
	OrderContactsStepView,
	OrderPaymentStepView,
} from '../components/OrderView';
import {
	BasketProductView,
	CatalogProductView,
	FullProductView,
} from '../components/ProductView';
import { BasketState, OrderState } from './state';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { Product, ProductId, togglePaymentType } from '../types';
import { EventEmitter } from './events';
import { Events } from './events.const';
import { UiConfig } from './uiConfig';
import { SuccessView } from '../components/SuccessView';

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
		isInBasket: basketState.findItem(product) !== undefined,
	});
}

// ~~~~~~~~~~~~~~ приложение ~~~~~~~~~~~~~ //

const events = new EventEmitter();

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

const basketState = new BasketState();
const orderState = new OrderState();

// ~~~~~~~~~~~~~~~ сервисы ~~~~~~~~~~~~~~~ //

const productService = new ProductService();
const orderService = new OrderService();

// ~~~~~~~~~~~~ представления ~~~~~~~~~~~~ //

const modalView = new ModalView(UiConfig.predefinedElements.modalContainer);

const homeView = new HomeView({
	onBasketOpenClick: () => events.emit(Events.BASKET_OPEN),
});

const basketView = new BasketView(UiConfig.templates.basketTemplate, {
	startOrder: () => {
		events.emit<{ items: Product[] }>(Events.BASKET_START_ORDER, {
			items: basketState.items,
		});
	},
});

const orderPaymentStepView = new OrderPaymentStepView(
	UiConfig.templates.orderTemplate,
	{
		buttonOnlineClick: () => {
			events.emit(Events.ORDER_TOGGLE_PAYMENT_TYPE);
		},
		buttonOnReceiptClick: () => {
			events.emit(Events.ORDER_TOGGLE_PAYMENT_TYPE);
		},
		addressChange: (value) => {
			events.emit(Events.ORDER_CHANGE_ADDRESS, { address: value });
		},
		submit: () => {
			events.emit(Events.ORDER_PAYMENT_SUBMIT);
		},
	}
);

const orderContactsStepView = new OrderContactsStepView(
	UiConfig.templates.contactsTemplate,
	{
		emailChange: (value) => {
			events.emit(Events.ORDER_CHANGE_EMAIL, { email: value });
		},
		phoneNumberChange: (value) => {
			events.emit(Events.ORDER_CHANGE_PHONE, { phone: value });
		},
		submit: () => {
			events.emit(Events.ORDER_CONTACT_SUBMIT);
		},
	}
);

const successView = new SuccessView(UiConfig.templates.successTemplate, {
	onClose: () => {
		events.emit(Events.SUCCESS_CLOSE);
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
		items: basketState.items.map(createBasketItem(basketView)),
		total: basketState.total,
		isValidated: basketState.isValidated,
	});
	modalView.render({ content });
});

events.on<{ product: Product }>(Events.CARD_TOGGLE_BASKET, ({ product }) => {
	const itemIndex = basketState.findItem(product);
	if (itemIndex === undefined) {
		basketState.addItem(product);
	} else {
		basketState.removeItem(product);
	}
	homeView.render({ counter: basketState.count() });
});

events.on<{ product: Product; basketView: BasketView }>(
	Events.BASKET_DELETE_ITEM,
	({ product, basketView }) => {
		basketState.removeItem(product);
		homeView.render({ counter: basketState.count() });
		modalView.render({
			content: basketView.render({
				items: basketState.items.map(createBasketItem(basketView)),
				total: basketState.total,
			}),
		});
	}
);

events.on<{ items: Product[] }>(Events.BASKET_START_ORDER, ({ items }) => {
	orderState.items = items;
	modalView.render({
		content: orderPaymentStepView.render({
			payment: orderState.value.payment,
		}),
	});
});

events.on(Events.ORDER_TOGGLE_PAYMENT_TYPE, () => {
	orderState.payment = togglePaymentType(orderState.value.payment);
	orderPaymentStepView.render({ payment: orderState.value.payment });
});

events.on<{ address: string }>(Events.ORDER_CHANGE_ADDRESS, ({ address }) => {
	orderState.address = address;
	orderPaymentStepView.render({
		isPaymentValidated: orderState.isPaymentValidated,
	});
});

events.on(Events.ORDER_PAYMENT_SUBMIT, () => {
	modalView.render({
		content: orderContactsStepView.render(),
	});
});

events.on<{ email: string }>(Events.ORDER_CHANGE_EMAIL, ({ email }) => {
	orderState.email = email;
	orderContactsStepView.render({
		isContactsValidated: orderState.isContactsValidated,
	});
});

events.on<{ phone: string }>(Events.ORDER_CHANGE_PHONE, ({ phone }) => {
	orderState.phone = phone;
	orderContactsStepView.render({
		isContactsValidated: orderState.isContactsValidated,
	});
});

events.on(Events.ORDER_CONTACT_SUBMIT, () => {
	orderService.sendOrder(orderState.value).then((res) => {
		if ('error' in res) {
			console.log(res);
			return;
		}
		basketState.clear();
		orderState.clear();
		modalView.render({ content: successView.render() });
	});
});

events.on(Events.SUCCESS_CLOSE, () => {
	modalView.close();
	homeView.render({ counter: basketState.count() });
});

// ~~~~~~~~~~~~~ точка входа ~~~~~~~~~~~~~ //

events.emit(Events.START);
