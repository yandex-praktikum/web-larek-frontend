
export interface IProduct {
  category: string,
  _id: number,
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
  items: IProduct[]
}

export interface IProductsData {
  products: IProduct[],
  preview: string | null,
  addProduct(product: IProduct): void,
  deleteProduct(productId: string): void,
  getProduct(productId: string): IProduct
}


export type TProductInfo = Pick<IProduct, 'category' | 'name' | 'picture' | 'price'>

export type TProductDetails = Pick<IProduct, 'category' | 'name' | 'description' | 'picture' | 'price'>;

export type TCart = Pick<IProduct, 'name' | 'price'>;

export type TOrder = Partial<IOrder>;

export type TOrderStepOne = Pick<IOrder, 'paymentType' | 'address'>;

export type TOrderStepTwo = Pick<IOrder, 'email' | 'telephone'>;

export type TOrderSuccess = Pick<IOrder, 'total'>;