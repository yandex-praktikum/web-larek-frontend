import { IOrder, TPaymentMethod} from '../../types/index'
import { IEvents } from '../base/events';


export class OrderData implements IOrder {
  protected _paymentType: TPaymentMethod;
  protected _address: string;
  protected _telephone: string;
  protected _email: string;
  protected _total: number;
  protected _items: string[];
  events: IEvents;

  set paymentType(type: TPaymentMethod) {      //записывает данные в метод оплаты
    this._paymentType = type;
  }
  
  get paymentType() {
    return this._paymentType
  }
  
  set email(value: string) {                  //записывает данные в email покупателя
    this._email = value;
  }

  set address(value: string){                 //записывает данные в адрес покупателя
    this._address = value;
  }

  set telephone(value: string){               //записывает данные в номер телефона
    this._telephone = value;
  }

  set total(value: number) {                  // записывает данные в общая стоимость покупок
    this._total = value;;
  }

  set items(value: string[]) {                // записывает данные в массив всех id товаров в заказе
    this._items = value;    
  } 
  
  get orderFullInfo () {                       // возвращает всю информация о заказе. 
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



    

  

    

    

    
    

    

    

