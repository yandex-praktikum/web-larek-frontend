import { IProductService } from '../app/ports';
import { Product } from '../models';
import { API_URL, CDN_URL } from '../utils/constants';
import { WebLarekApi, getApi } from './webLarekApi.service';

// TODO: передавать api в конструктор
export class ProductService implements IProductService {
	private _api: WebLarekApi;

	constructor() {
		this._api = new WebLarekApi(getApi(API_URL), CDN_URL);
	}

	getProducts: () => Promise<Product[]> = () => {
		return this._api.getProducts();
	};

	getProduct: (id: string) => Promise<Product> = (id) => {
		return this._api.getProduct(id);
	};
}
