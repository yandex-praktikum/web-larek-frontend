//интерфейсы данных
export interface ICard {            //данные карточки продукта
  category: string,
  id: string,
  title: string,
  description: string,
  image: string,
  price: number
};

export interface IOrder {           //данные заказа
  paymentType: TPaymentMethod,
  address: string,
  telephone: string,
  email: string,
  total: number,
  items: string[]
}

export interface ICardsData {
 _cards: ICard[],
 _preview: ICard | null,
}

export interface IOrderData {
  orderFullInfo: IOrder;
}

export interface IOrderBuilder{
    orderInfo: TOrderInfo;
    orderDelivery: TOrderDelivery;
    orderContacts: TOrderContacts;
    getOrderData(): IOrder;
}


export interface IOrderSuccess {
  orderSuccess: TOrderSuccess;
}

export interface IBasketData {
  goods: ICard[];
  total: number;
  isInBasket(id:string): boolean;
  addToBasket(card: ICard): void;
  removeFromBasket(card: ICard): void;
  clearBasket(): void;
  getGoodsNumber(): number

}

export type TPaymentMethod = 'cash' | 'card';


export type TCardInfo = Pick<ICard, 'category' | 'title' | 'image' | 'price'>

export type TCardPreview = Pick<ICard, 'category' | 'title' | 'description' | 'image' | 'price'>;

export type TBasket = Pick<ICard, 'title' | 'price'>;

export type TOrder = Partial<IOrder>;

export type TOrderInfo = Pick<IOrder, 'total' | 'items'>

export type TPayment = Pick<IOrder, 'paymentType'>;

export type TOrderDelivery = Pick<IOrder, 'paymentType' | 'address'>;

export type TOrderContacts = Pick<IOrder, 'email' | 'telephone'>;

export type TOrderSuccess =  Pick<IOrder, 'items' | 'total'>;

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
}

export interface IViewCardCatalogue {
  image: string;
  category: string;
}

export interface IViewCardPreview {
  description: string;
}

export interface IViewCardBasket {
  index: number;
}

export interface IViewForm {
  valid: boolean;
  errorMessage: string[];
  clear(): void;
}

export interface IViewFormOrder {
  paymentMethod: TPaymentMethod | null;
  address: string;
  valid: boolean;}

export type TViewForm = {valid: boolean; errorMessage: string[];}

export interface IViewFormContacts {
  email: string;
  telephone: string;
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

export type TCategoryClassNames = 'soft' | 'other' | 'additional' | 'button' | 'hard';
export type TCategoryClasses = Record<string, TCategoryClassNames>;
export type TId = {id: string}



