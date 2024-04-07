import { Api } from '../adapters/api.adapter';
import { IWebLarekApi } from '../app/ports';
import { Order, Product, ProductId, SentOrder } from '../models';

type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export class WebLarekApi implements IWebLarekApi {
	/**
	 * Создает экземпляр WebLarekApi.
	 * @param {Api} api - получите этот аргумент с помощью функции getApi()
	 * @param {string} cdn
	 * @memberof WebLarekApi
	 */
	constructor(private api: Api, private cdn: string) {}

	async getProducts(): Promise<Product[]> {
		return this.api.get('/product').then((data: ApiListResponse<Product>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	async getProduct(id: ProductId): Promise<Product> {
		return this.api.get(`/product/${id}`).then((item: Product) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	async postOrder(order: Order): Promise<SentOrder> {
		return this.api
			.post('/order', { ...order, items: order.items.map((x) => x.id) })
			.then((res: Pick<SentOrder, 'id' | 'total'>) => {
				return { ...order, ...res };
			});
		// ошибка обрабатывается в классе Api
	}
}

export function getApi(baseUrl: string): Api {
	return new Api(baseUrl);
}
