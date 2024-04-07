import { IOrderService } from '../app/ports';
import { Order, SentOrder } from '../models';
import { API_URL, CDN_URL } from '../utils/constants';
import { WebLarekApi, getApi } from './webLarekApi.service';

export class OrderService implements IOrderService {
	private _api: WebLarekApi;

	constructor() {
		this._api = new WebLarekApi(getApi(API_URL), CDN_URL);
	}

	sendOrder(order: Order): Promise<SentOrder> {
		return this._api.postOrder(order);
	}
}
