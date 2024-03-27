import { Order, Product } from './types';

export interface IProductService {
	getProducts: () => Promise<Product[]>;
	getProduct: (id: Product['id']) => Promise<Product>;
}

export interface IBasketService {
	addItem: (item: Product) => Promise<void>;
	removeItem: (index: number) => Promise<void>;
	clear: () => Promise<void>;
}

export interface IOrderService {
	sendOrder: (order: Order) => Promise<void>;
}

export interface IWebLarekApi {
	getProducts: () => Promise<Product[]>;
	getProduct: (id: Product['id']) => Promise<Product>;
	postOrder: (order: Order) => Promise<void>;
}
