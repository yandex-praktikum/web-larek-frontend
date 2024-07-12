import { Api, ApiListResponse } from "./base/api";
import { IAppApi, ICard, IOrder, TOrderSuccess } from "../types/index"

export class AppApi extends Api implements IAppApi {
  protected cdn: string; 

  constructor(cdn: string, baseUrl: string, options: RequestInit={}) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getCards(): Promise<ICard[]> {
    return this.get('/product').then((list: ApiListResponse<ICard>) => {
      return list.items.map((item) => { return {...item, image: this.cdn + item.image}})
    })
  }

  getCardById(id: string): Promise<ICard> {
    return this.get('/product/' + id).then((card: ICard) => {
      return {...card, image: this.cdn + card.image}
    })
  }

  postOrder(order: IOrder): Promise<TOrderSuccess> {
    return this.post('/order', order).then((success: TOrderSuccess) => success)
    
  }
  
}  