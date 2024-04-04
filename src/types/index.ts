import { Order, Product, ProductId, SentOrder } from '../models';

export * from '../models';

export type AppEvents =
	| 'START'
	| 'CARD_SELECT'
	| 'CARD_TOGGLE_BASKET'
	| 'BASKET_OPEN'
	| 'BASKET_DELETE_ITEM'
	| 'BASKET_START_ORDER'
	| 'ORDER_TOGGLE_PAYMENT_TYPE'
	| 'ORDER_CHANGE_ADDRESS'
	| 'ORDER_CHANGE_EMAIL'
	| 'ORDER_CHANGE_PHONE'
	| 'ORDER_PAYMENT_SUBMIT'
	| 'ORDER_CONTACT_SUBMIT'
	| 'SUCCESS_CLOSE';

// ~~~~~~~~~ Интерфейсы сервисов ~~~~~~~~~ //

export interface IProductService {
	getProducts: () => Promise<Product[]>;
	getProduct: (id: ProductId) => Promise<Product>;
}

export interface IOrderService {
	sendOrder: (order: Order) => Promise<SentOrder>;
}

export interface IWebLarekApi {
	getProducts: () => Promise<Product[]>;
	getProduct: (id: ProductId) => Promise<Product>;
	postOrder: (order: Order) => Promise<SentOrder>;
}
