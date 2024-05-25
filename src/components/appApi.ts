// import { Api, ApiListResponse } from "./base/api";
// import { IAppApi, ICard, IOrder, TOrderSuccess } from "../types/index"

// export class AppApi extends Api implements IAppApi {
//   protected cdn: string; 

//   constructor(cdn: string, baseUrl: string, options: RequestInit = {}) {
//     super(baseUrl, options);
//     this.cdn = cdn;
//   }

//   getProducts(): Promise<ICard[]> {
//     return this.get('/product').then((list: ApiListResponse<ICard>) => {
//       return list.items.map((item) => { return {...item, image: this.cdn + item.image}})
//     })
//   }

//   getProductById(id: string): Promise<ICard> {
//     return this.get('/product/' + id).then((product: ICard) => {
//       return {...product, image: this.cdn + product.image}
//     })
//   }

//   postOrder(order: ICustomer): Promise<TSuccessData> {
//     return this.post('/order', order).then((success: TSuccessData) => {
//       return success
//     })
//   }
// }  