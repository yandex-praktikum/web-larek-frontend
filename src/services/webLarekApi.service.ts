import { Api, ApiListResponse } from '../adapters/api.adapter';
import { IWebLarekApi, Order, Product } from '../types';

export class WebLarekApi implements IWebLarekApi {
	private api: Api;
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		this.api = new Api(baseUrl, options)
		this.cdn = cdn;
	}

	async getProducts(): Promise<Product[]> {
		return this.api.get('/product').then((data: ApiListResponse<Product>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	async getProduct(id: Product['id']): Promise<Product> {
		return this.api.get(`/product/${id}`).then((item: Product) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	async postOrder(order: Order): Promise<void> {
		this.api.post('/order', order);
	}
}
