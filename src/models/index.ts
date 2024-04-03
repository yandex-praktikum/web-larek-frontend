export type ProductId = string;

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

export function emptyBasket(): Basket {
	return { items: [] };
}

export type PaymentType = 'online' | 'offline';

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
