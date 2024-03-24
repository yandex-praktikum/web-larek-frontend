export type ProductId = string;
export type PaymentType = 'online' | 'offline';

export type Product = {
    id: ProductId,
    description: string,
    image: string,
    title: string,
    category: string,
    price: number,
}

export type Order = {
    payment: PaymentType,
    email: string,
    phone: string,
    address: string,
    total: number,
    items: ProductId[],
}