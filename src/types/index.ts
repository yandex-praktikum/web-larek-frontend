export interface IProduct {
  itemId: string;
  image: string;
  itemTitle: string;
  itemDescription: string;
  itemPrice: number|null;
  category: string;
  selected: boolean; 
}

export interface IOrder {
  items: string[];
  totalCost: number;
  payment: string;
  address: string;
  email: string;
  phone: string;
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

export interface IFormSuccess {
  totalDebited: number; 
}
 