export type ProductId = string;
export type PaymentType = 'online' | 'offline';

export type Product = {
	id: ProductId;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
};

export type Basket = {
	items: Product[];
};

export type Order = {
	payment: PaymentType;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: ProductId[];
};

// ~~~~~~~~~ Интерфейсы сервисов ~~~~~~~~~ //

export interface IProductService {
	getProducts: () => Promise<Product[]>;
	getProduct: (id: Product['id']) => Promise<Product>;
}

export interface IBasketService {
	addItem: (item: Product) => void;
	removeItem: (index: number) => void;
	clear: () => void;
}

export interface IOrderService {
	sendOrder: (order: Order) => Promise<void>;
}

export interface IWebLarekApi {
	getProducts: () => Promise<Product[]>;
	getProduct: (id: Product['id']) => Promise<Product>;
	postOrder: (order: Order) => Promise<void>;
}
