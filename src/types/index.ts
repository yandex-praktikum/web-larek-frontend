
export interface ICard {
  category: string,
  id: string,
  name: string,
  description: string,
  image: string,
  price: number
};

export interface IOrder {
  paymentType: string,
  address: string,
  telephone: string,
  email: string,
  total: number,
  items: ICard[]
}

export interface ICardsData {
  _cards: ICard[],
  _preview: string | null,
}

export interface IOrderData {
  orderInfo: IOrder;
  addCard(card: ICard): void;
  deleteCard(id: string): void;
}

// export interface IBasketData {
//   cardsInBasket: ICard[];
//   addCard(value: ICard): void;
//   deleteCard(id: string): void;
//   getNumber(): number;
//   inBasket(id: string): boolean;
//   getTotal(): number;
//   getIdList(): string[];
//   clear(): void;
// }



export type TCardInfo = Pick<ICard, 'category' | 'name' | 'image' | 'price'>

export type TCardPreview = Pick<ICard, 'category' | 'name' | 'description' | 'image' | 'price'>;

export type TBasket = Pick<ICard, 'name' | 'price'>;

export type TOrder = Partial<IOrder>;

export type TOrderOrder = Pick<IOrder, 'paymentType' | 'address'>;

export type TOrderContacts = Pick<IOrder, 'email' | 'telephone'>;

export type TOrderSuccess = Pick<IOrder, 'total'>;

export interface IAppApi {
  getProducts(): Promise<ICard[]>;
  getProductById(id: string): Promise<ICard>;
  postOrder(order: IOrder): Promise<TOrderSuccess>;
}

// ________________________________________________





// export interface IOrderDataBuilder {
//   purchasesInfo: TPurchasesInfo;
//   deliveryInfo: TDeliveryInfo;
//   contactsInfo: TContactsInfo;
//   getOrderData(): ICustomer;
// }

// export interface IOrderConstructor {
//   new (): IOrderData;
// }

// export interface ISuccessData {
//   orderSuccess: TSuccessData;
// }



// export interface ICardCatalog {
//   image: string;
//   category: string;
// }

// export interface ICardBasket {
//   index: number;
// }

// export interface ICardPreview {
//   description: string;
//   priceCheck: boolean;
//   state: boolean;
// }

// export interface IPage {
//   catalog: HTMLElement[];
//   counter: number;
//   lockScreen(value: boolean): void;
// }

// export interface IBasket {
//   cardsList: HTMLElement[];
//   emptyCheck: boolean;
//   total: number
// }

// export interface IModal {
//   content: HTMLElement;
//   open(): void;
//   close(): void;
// }

// export interface IForm {
//   valid: boolean;
//   errorMessage: string;
//   clear(): void;
// }

// export interface IFormOrder {
//   payment: TPayment | null;
//   address: string;
//   valid: boolean;
//   clear(): void; 
//   render(data: object ): HTMLElement; 
// }

// export interface IFormContacts {
//   email: string;
//   phone: string;
//   valid: boolean;
// }

// export interface ISuccess {
//   description: string;
// }

// export type TPurchasesInfo = Pick<ICustomer, 'total' | 'items'>;
// export type TDeliveryInfo = Pick<ICustomer, 'payment' | 'address'>;
// export type TContactsInfo = Pick<ICustomer, 'email' | 'phone' >
// export type TCardCatalog = Omit<IProduct, 'description'>;
// export type TCategoryClassNames = 'card__category_soft' |'card__category_other' | 'card__category_additional' | 'card__category_button' | 'card__category_hard';
// export type TCategoryClasses = Record<string, TCategoryClassNames>;
// export type TCardBasket = Pick<IProduct, 'id' | 'title' | 'price'> & {index: number};
// export type TCardPreview = IProduct & {priceCheck: boolean; state: boolean};
// export type TPage = {counter: number, catalog: HTMLElement[]};
// export type TBasket = {cardsList: HTMLElement[]; total: number; emptyCheck: boolean};
// export type TModal ={content: HTMLElement};
// export type TForm = {valid: boolean}
// export type TPayment = 'card' | 'cash';
// export type TFormOrder = {payment: TPayment; address: string};
// export type TFormContacts = {email: string; phone: string};
// export type TSuccessData = {id: string; total: number};
// export type TSuccess = {description: string};
// export type TId = {id: string};
