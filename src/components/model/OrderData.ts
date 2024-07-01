import { IOrder, TPaymentMethod
} from '../../types/index'


export class OrderData implements IOrder {
  protected _paymentType: TPaymentMethod;
  protected _address: string;
  protected _telephone: string;
  protected _email: string;
  protected _total: number;
  protected _items: string[];
  
  constructor() {
  }

  set paymentType(type: TPaymentMethod) {      //метод оплаты
    this._paymentType = type;
  }
  
  set email(value: string) {                  //email покупателя
    this._email = value;
  }

  set address(value: string){                 //адрес покупателя
    this._address = value;
  }

  set telephone(value: string){               //номер телефона
    this._telephone = value;
  }

  set total(value: number) {                  // общая стоимость покупок
    this._total = value;;
  }

  set items(value: string[]) {                // массив всех id товаров в заказе
    this._items = value;    
  } 
  
  get orderInfo() {                           // вся информация о заказе. 
    return {
      paymentType: this._paymentType,
      email: this._email,
      telephone: this._telephone,
      address: this._address,
      total: this._total,
      items: this._items
    }
  }
}



    

  

    

    

    
    

    

    

