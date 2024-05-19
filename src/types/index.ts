
export interface ICard {
  category: string,
  id: string,
  name: string,
  description: string,
  picture: string,
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
  addCard(card: ICard): void,
  deleteCard(cardId: string): void,
  getCard(cardId: string): ICard
}

export interface IOrderData {
  paymentType: TOrder | string,
  address: TOrder | string,
  telephone: TOrder |string,
  email: TOrder | string,
  total: TOrderSuccess | number,
  items: ICard[],
  addOrder (order: TOrder) : void
  checkValidation (order: TOrder) : boolean
}

export type TCardInfo = Pick<ICard, 'category' | 'name' | 'picture' | 'price'>

export type TCardPreview = Pick<ICard, 'category' | 'name' | 'description' | 'picture' | 'price'>;

export type TBasket = Pick<ICard, 'name' | 'price'>;

export type TOrder = Partial<IOrder>;

export type TOrderStepOne = Pick<IOrder, 'paymentType' | 'address'>;

export type TOrderStepTwo = Pick<IOrder, 'email' | 'telephone'>;

export type TOrderSuccess = Pick<IOrder, 'total'>;