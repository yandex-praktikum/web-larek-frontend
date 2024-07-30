
export interface IProduct {
	id: string;
	category: string;
	price: number | null;
	description: string;
	image: string;
	title: string;
	index: number;
	inBasket: boolean;
}

export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export interface IAppState {
	basket: IProduct[];
	catalog: IProduct[];
}

export interface IFormOrder {
	address: string;
	payment: string;
}
  
export interface IFormContact {
	phone: string;
	email: string;
}


export interface IOrder extends IFormOrder, IFormContact {
	items: string[];
	total: number;
}

export interface IValidateFormOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
}

export type IFormErrors = Partial<Record<keyof IOrder, string>>;