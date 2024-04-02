import { IOrderService, Order, SentOrder } from '../types';
import { CDN_URL, API_URL } from '../utils/constants';
import { WebLarekApi } from './webLarekApi.service';

export class OrderService implements IOrderService {
	private _api: WebLarekApi;

	constructor() {
		this._api = new WebLarekApi(CDN_URL, API_URL);
	}

	sendOrder(order: Order): Promise<SentOrder> {
		return this._api.postOrder(order);
	}
}
