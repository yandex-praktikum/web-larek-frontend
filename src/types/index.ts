import { Order, Product, ProductId, SentOrder } from '../models';

export * from '../models';

// ~~~~~~~~~ Интерфейсы сервисов ~~~~~~~~~ //

export interface IProductService {
	getProducts: () => Promise<Product[]>;
	getProduct: (id: ProductId) => Promise<Product>;
}

export interface IOrderService {
	// todo: метод order() не взаимодействует с внешним миром
	set order(value: Order);
	sendOrder: (order: Order) => Promise<SentOrder>;
}

export interface IWebLarekApi {
	getProducts: () => Promise<Product[]>;
	getProduct: (id: ProductId) => Promise<Product>;
	postOrder: (order: Order) => Promise<SentOrder>;
}
