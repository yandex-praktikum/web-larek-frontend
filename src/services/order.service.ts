import { IOrderService, Order, SentOrder, emptyOrder } from '../types';
import { API_URL, CDN_URL } from '../utils/constants';
import { WebLarekApi } from './webLarekApi.service';

export class OrderService implements IOrderService {
	private _api: WebLarekApi;
	private _order: Order;

	constructor() {
		this._api = new WebLarekApi(CDN_URL, API_URL);
		this.order = emptyOrder();
	}

	set order(value: Order) {
		this._order = value;
	}

	get order() {
		return this._order;
	}

	sendOrder(order: Order): Promise<SentOrder> {
		return this._api.postOrder(order);
	}
}
