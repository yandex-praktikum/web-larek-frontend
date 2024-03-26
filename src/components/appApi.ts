import { Product } from '../types';
import { Api } from './base/api';

interface IAppApi {
	getProducts(): Promise<Product[]>;
}

export class AppApi extends Api implements IAppApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	async getProducts(): Promise<Product[]> {
		return [];
	}
}
