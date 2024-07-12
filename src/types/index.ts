//интерфейсы данных
export interface ICard {            //данные карточки продукта
  category: string,
  description: string,
  id: string,
  image: string,
  price: number,
  title: string  
};

export interface IOrder {           //данные заказа
  payment: TPaymentMethod,
  address: string,
  phone: string,
  email: string,
  total: number,
  items: string[]
}

export interface ICardsData {
 _cards: ICard[],
}

export interface IOrderData extends IOrder {
  orderFullInfo: IOrder;
}

export interface IOrderConstructor {
  new (): IOrderData;
}

export interface IOrderSuccess {
  orderSuccess: TOrderSuccess;
}

export interface IBasketData {
  goods: ICard[];
  total: number;
  isInBasket(id:string): boolean;
  addToBasket(card: ICard): void;
  removeFromBasket(id: string): void;
  clearBasket(): void;
  getGoodsNumber(): number;
  getTotal(): number;
  getIdsOfGoods(): string[]
}

export type TPaymentMethod = 'cash' | 'card';
export type TCardInfo = Pick<ICard, 'category' | 'title' | 'image' | 'price'>
export type TCardPreview = Pick<ICard, 'category' | 'title' | 'description' | 'image' | 'price'>;
export type TBasket = Pick<ICard, 'title' | 'price'>;
export type TOrder = Partial<IOrder>;
export type TPayment = Pick<IOrder, 'payment'>;
export type TOrderSuccess =  Pick<IOrder, 'items' | 'total'>;
export type TId = Pick<ICard, 'id'>;

export interface IAppApi {
  getCards(): Promise<ICard[]>;
  getCardById(id: string): Promise<ICard>;
  postOrder(order: IOrder): Promise<TOrderSuccess>;
}

export interface IOrderConstructor {
  new (): IOrderData;
}

// интерфейсы представления

export interface IViewModal {
  content: HTMLElement;
  buttonClose: HTMLButtonElement;
  open(): void;
  close(): void
}

export interface IViewCard {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
}

export interface IViewCardCatalogue {
  category: string;
}

export interface IViewCardPreview {
  category: string;
  invalidPrice: boolean;
  buttonValidation: boolean;
}

export interface IViewBasket {
  cards: HTMLElement[];
  total: number;
  emptyCheck: boolean;
}

export interface IViewCardBasket {
  index: number;
}

export interface IViewForm {
  valid: boolean;
  errorMessage: string;
  clear(): void;
}
export interface IViewFormOrder {
  payment: TPaymentMethod | null;
  address: string;
  resetButtons(): void;
  valid: boolean;
}


export interface IViewFormContacts {
  email: string;
  phone: string;
  valid: boolean;
}

export interface IViewSuccess {
  message: string;
}

export interface IViewPage {
  catalog: HTMLElement[];
  counter: number;
  lockScreen(value: boolean): void;
}

export type TViewForm = {valid: boolean; errorMessage: string;}
export type TCategoryClassNames = 'soft' | 'other' | 'additional' | 'button' | 'hard';
export type TCategoryClasses = Record<string, TCategoryClassNames>;

export type TViewFormOrder = {payment: TPayment; address: string; valid: Boolean};
export type TViewFormContacts = {email: string; phone: string; valid: Boolean };
export type TViewBasket = {cards: HTMLElement[], total: number, emptyCheck: boolean}
export type TViewSuccess = {message: string};
export type TViewCardPreview = ICard & {invalidPrice: boolean; buttonValidation: boolean};
export type TViewCardBasket = Pick<ICard, 'id' | 'title' | 'price'> & {index: number};
export type TViewCardCatalogue = Pick<ICard, 'id' | 'title' | 'price' | 'category' | 'image'>


