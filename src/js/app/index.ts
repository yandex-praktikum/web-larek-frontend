/**
 * Вся логика приложения находится здесь
 */

import { Product, ProductId, togglePaymentType } from '../models';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { AppEvents } from '../types';
import { settings } from '../utils/constants';
import { isEmpty } from '../utils/utils';
import { BasketView } from '../views/BasketView';
import { HomeView } from '../views/HomeView';
import { ModalView } from '../views/ModalView';
import {
	OrderContactsStepView,
	OrderPaymentStepView,
} from '../views/OrderView';
import {
	BasketProductView,
	CatalogProductView,
	FullProductView,
} from '../views/ProductView';
import { SuccessView } from '../views/SuccessView';
import { EventEmitter } from './events';
import { BasketState, OrderState } from './state';

const categories: Record<string, string> = {
	'софт-скил': 'soft',
	другое: 'other',
	дополнительное: 'additional',
	кнопка: 'button',
	'хард-скил': 'hard',
};

// ~~~~~~~ вспомогательные функции ~~~~~~~ //

function createBasketItem(basketView: BasketView) {
	return (product: Product) => {
		const productView = new BasketProductView({
			onDeleteClick: () => {
				events.emit('BASKET_DELETE_ITEM', { product, basketView });
			},
		});
		return productView.render({
			...product,
			categoryClass: categories[product.category],
		});
	};
}

function createCatalogItem(product: Product) {
	const productView = new CatalogProductView({
		onProductCardClick: () => {
			events.emit('CARD_SELECT', { id: product.id });
		},
	});
	return productView.render({
		...product,
		categoryClass: categories[product.category],
	});
}

function createProductPreview(product: Product) {
	const productView = new FullProductView({
		toggleBasket: () => {
			events.emit('CARD_TOGGLE_BASKET', { product });
			modalView.close();
		},
	});
	const validation = isEmpty(product.price)
		? [{ key: 'price', value: 'Этот товар нельзя купить. Он бесценен!' }]
		: [];
	return productView.render({
		...product,
		categoryClass: categories[product.category],
		isInBasket: basketState.findItem(product) !== undefined,
		validation,
	});
}

// ~~~~~~~~~~~~~~ приложение ~~~~~~~~~~~~~ //

const events = new EventEmitter<AppEvents>();

// Чтобы мониторить все события, для отладки
settings.mode !== 'production' &&
	events.onAll(({ eventName, data }) => {
		console.log(eventName, data);
	});

const basketState = new BasketState();
const orderState = new OrderState();

// ~~~~~~~~~~~~~~~ сервисы ~~~~~~~~~~~~~~~ //

const productService = new ProductService();
const orderService = new OrderService();

// ~~~~~~~~~~~~~~~~ views ~~~~~~~~~~~~~~~~ //

const modalView = new ModalView();

const homeView = new HomeView({
	onBasketOpenClick: () => events.emit('BASKET_OPEN'),
});

const basketView = new BasketView({
	startOrder: () => {
		events.emit('BASKET_START_ORDER', {
			items: basketState.items,
		});
	},
});

const orderPaymentStepView = new OrderPaymentStepView({
	buttonOnlineClick: () => {
		events.emit('ORDER_TOGGLE_PAYMENT_TYPE');
	},
	buttonOnReceiptClick: () => {
		events.emit('ORDER_TOGGLE_PAYMENT_TYPE');
	},
	addressChange: (value) => {
		events.emit('ORDER_CHANGE_ADDRESS', { address: value });
	},
	submit: () => {
		events.emit('ORDER_PAYMENT_SUBMIT');
	},
});

const orderContactsStepView = new OrderContactsStepView({
	emailChange: (value) => {
		events.emit('ORDER_CHANGE_EMAIL', { email: value });
	},
	phoneNumberChange: (value) => {
		events.emit('ORDER_CHANGE_PHONE', { phone: value });
	},
	submit: () => {
		events.emit('ORDER_CONTACT_SUBMIT', orderState.value);
	},
});

const successView = new SuccessView({
	onClose: () => {
		events.emit('SUCCESS_CLOSE');
	},
});

// ~~~~~~~~~~~~~~~ события ~~~~~~~~~~~~~~~ //

events.on('START', () => {
	productService.getProducts().then((products): void => {
		homeView.render({ gallery: products.map(createCatalogItem) });
	});
});

events.on<{ id: ProductId }>('CARD_SELECT', ({ id }) => {
	productService.getProduct(id).then((product) => {
		modalView.render({ content: createProductPreview(product) });
	});
});

events.on('BASKET_OPEN', () => {
	const validation =
		basketState.total === 0
			? [{ key: 'total', value: 'Итог по корзине равен нулю' }]
			: [];
	const content = basketView.render({
		items: basketState.items.map(createBasketItem(basketView)),
		total: basketState.total,
		validation,
	});
	modalView.render({ content });
});

events.on<{ product: Product }>('CARD_TOGGLE_BASKET', ({ product }) => {
	const itemIndex = basketState.findItem(product);
	if (itemIndex === undefined) {
		basketState.addItem(product);
	} else {
		basketState.removeItem(product);
	}
	homeView.render({ counter: basketState.count() });
});

events.on<{ product: Product; basketView: BasketView }>(
	'BASKET_DELETE_ITEM',
	({ product, basketView }) => {
		basketState.removeItem(product);
		const validation =
			basketState.total === 0
				? [{ key: 'total', value: 'Итог по корзине равен нулю' }]
				: [];
		homeView.render({ counter: basketState.count() });
		modalView.render({
			content: basketView.render({
				items: basketState.items.map(createBasketItem(basketView)),
				total: basketState.total,
				validation,
			}),
		});
	}
);

events.on<{ items: Product[] }>('BASKET_START_ORDER', ({ items }) => {
	orderState.items = items;
	modalView.render({
		content: orderPaymentStepView.render({
			payment: orderState.value.payment,
			validation: [],
			submitDisabled: true,
		}),
	});
});

events.on('ORDER_TOGGLE_PAYMENT_TYPE', () => {
	orderState.payment = togglePaymentType(orderState.value.payment);
	orderPaymentStepView.render({ payment: orderState.value.payment });
});

events.on<{ address: string }>('ORDER_CHANGE_ADDRESS', ({ address }) => {
	orderState.address = address;
	orderPaymentStepView.render({
		validation: orderState.validation(['address', 'items']),
	});
});

events.on('ORDER_PAYMENT_SUBMIT', () => {
	modalView.render({
		content: orderContactsStepView.render({
			validation: [],
			submitDisabled: true,
		}),
	});
});

events.on<{ email: string }>('ORDER_CHANGE_EMAIL', ({ email }) => {
	orderState.email = email;
	orderContactsStepView.render({
		validation: orderState.validation(['email', 'phone']),
	});
});

events.on<{ phone: string }>('ORDER_CHANGE_PHONE', ({ phone }) => {
	orderState.phone = phone;
	orderContactsStepView.render({
		validation: orderState.validation(['email', 'phone']),
	});
});

events.on('ORDER_CONTACT_SUBMIT', () => {
	orderService.sendOrder(orderState.value).then((res) => {
		if ('error' in res) {
			console.log(res);
			return;
		}
		basketState.clear();
		orderState.clear();
		modalView.render({
			content: successView.render({
				description: `Списано ${res.total} синапсов`,
			}),
		});
	});
});

events.on('SUCCESS_CLOSE', () => {
	modalView.close();
	homeView.render({ counter: basketState.count() });
});

// ~~~~~~~~~~~~~ точка входа ~~~~~~~~~~~~~ //

events.emit('START');
