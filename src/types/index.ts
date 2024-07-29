export interface IProduct {
  itemId: string;
  image: string;
  itemTitle: string;
  itemDescription: string;
  category: string;
  itemPrice: number|null;
  index: number;
	inBasket: boolean;
}

export interface IBasket {
  list: HTMLElement[];
  totalCost: number;
}

export interface IProductBasket extends IProduct {
	index: number;
}

export interface Ipage {
  basketCount: number;
  catalog: HTMLElement[];
}

export interface IModal {
	content: HTMLElement;
}

export interface IManagement {
  catalog: IProduct[];
  order: IProduct[];
  backet: IProduct[];
  addToBasket(product:IProduct): void;
  removeFromBasket(product:IProduct): void;
  setCatalog(items: IProduct[]): void;
  getTotalBasketPrice(): number;
}

export interface IResultPurchase {
  orderId: number;
  totalCost: number;
}

export interface IFormContact {
  phone: string;
  email: string;
}

export interface IFormOrder {
  payment: string;
  address: string; 
}

export interface IValidateFormOrder {
  phone: string;
  email: string;
  address: string;
  payment: string;
}

export interface IAppState {
	catalog: IProduct[];
	basket: IProduct[];
}

export interface IFormSuccess {
  totalDebited: number; 
}
 
export interface IOrder extends IFormOrder, IFormContact {
  items: string[];
	total: number; 
}

export type IFormErrors = Partial<Record<keyof IOrder, string>>;