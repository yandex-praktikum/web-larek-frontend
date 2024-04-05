// ~~~~~~~~~~~ Порт "Services" ~~~~~~~~~~~ //

import { Order, Product, ProductId, SentOrder } from '../models';

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

// ~~~~~~~~~~~~~ Порт "View" ~~~~~~~~~~~~~ //

export interface IModalView<H> {
	content: H;
	render: (data: { content: H }) => H;
	open: () => void;
	close: () => void;
}

export interface IAppView<T, H> {
	render: (data?: Partial<T>) => H;
}
