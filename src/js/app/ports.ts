/**
 * Порт - это интерфейс, через который слой приложения взаимодействует с
 * сервисом или gui-компонентом
 *
 * Интерфейс порта показывает, как приложение и сервис должны общаться между собой
 *
 * Предназначен для того, чтобы можно было заменить любой сервис или gui-компонент
 * без изменения основного приложения
 */

import { Order, Product, ProductId, SentOrder } from '../models';

// ~~~~~~~~~~~ Порты "Services" ~~~~~~~~~~ //


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

// ~~~~~~~~~~~~~ Порты "View" ~~~~~~~~~~~~ //

export interface IModalView<H> {
	content: H;
	render: (data: { content: H }) => H;
	open: () => void;
	close: () => void;
}

export interface IAppView<T, H> {
	render: (data?: Partial<T>) => H;
}
