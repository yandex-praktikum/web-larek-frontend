import { Product } from './types';

export interface IHome {
	set counter(value: number);
	set gallery(items: Product[]);
	set locked(value: boolean);
}
