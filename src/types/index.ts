import { Product, ProductId, Order, SentOrder, PaymentType } from '../models';

export * from '../models';

// ~~~~~~~~~ Интерфейсы сервисов ~~~~~~~~~ //

export interface IProductService {
	getProducts: () => Promise<Product[]>;
	getProduct: (id: ProductId) => Promise<Product>;
}

export interface IBasketService {
	findItem: (product: Product) => number | undefined;
	addItem: (item: Product) => void;
	removeItem: (item: Product) => void;
	clear: () => void;
	count(): number;
	get items(): Product[];
	get total(): number;
	get isValidated(): boolean;
}

export interface IOrderService {
	set order(value: Order);
	sendOrder: (order: Order) => Promise<SentOrder>;
}

export interface IWebLarekApi {
	getProducts: () => Promise<Product[]>;
	getProduct: (id: ProductId) => Promise<Product>;
	postOrder: (order: Order) => Promise<SentOrder>;
}
