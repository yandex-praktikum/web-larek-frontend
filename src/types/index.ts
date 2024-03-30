export type ProductId = string;
export type PaymentType = 'online' | 'offline';

export type Product = {
	id: ProductId;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
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

type OrderId = string;
type OrderTotal = number;

export type SentOrder = { id: OrderId; total: OrderTotal } & Order;

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
	sendOrder: (order: Order) => Promise<SentOrder>;
}

export interface IWebLarekApi {
	getProducts: () => Promise<Product[]>;
	getProduct: (id: Product['id']) => Promise<Product>;
	postOrder: (order: Order) => Promise<SentOrder>;
}
