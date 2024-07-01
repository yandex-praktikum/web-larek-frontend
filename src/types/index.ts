//интерфейсы данных
export interface ICard {            //данные карточки продукта
  category: string,
  id: string,
  name: string,
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


export type TCardInfo = Pick<ICard, 'category' | 'name' | 'image' | 'price'>

export type TCardPreview = Pick<ICard, 'category' | 'name' | 'description' | 'image' | 'price'>;

export type TBasket = Pick<ICard, 'name' | 'price'>;

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

export interface IViewCard {
  id: string;
  name: string;
  price: string;
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


