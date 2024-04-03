import { Order, Product, ProductId, SentOrder } from '../models';

export * from '../models';

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
