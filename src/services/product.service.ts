import { IProductService, Product } from '../types';
import { API_URL, CDN_URL } from '../utils/constants';
import { WebLarekApi } from './webLarekApi.service';

export class ProductService implements IProductService {
	private _api: WebLarekApi;

	constructor() {
		this._api = new WebLarekApi(CDN_URL, API_URL);
	}

	getProducts: () => Promise<Product[]> = () => {
		return this._api.getProducts();
	};

	getProduct: (id: string) => Promise<Product> = (id) => {
		return this._api.getProduct(id);
	};
}
