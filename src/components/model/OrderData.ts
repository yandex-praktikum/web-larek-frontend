import { IOrder, TPaymentMethod} from '../../types/index'
import { IEvents } from '../base/events';


export class OrderData implements IOrder {
  protected _payment: TPaymentMethod;
  protected _address: string;
  protected _phone: string;
  protected _email: string;
  protected _total: number;
  protected _items: string[];
  events: IEvents;

  set payment(type: TPaymentMethod) {      //записывает данные в метод оплаты
    this._payment = type;
  }
  
  get payment() {
    return this._payment
  }
  
  set email(value: string) {                  //записывает данные в email покупателя
    this._email = value;
  }

  set address(value: string){                 //записывает данные в адрес покупателя
    this._address = value;
  }

  set phone(value: string){               //записывает данные в номер телефона
    this._phone = value;
  }

  set total(value: number) {                  // записывает данные в общая стоимость покупок
    this._total = value;;
  }

  set items(value: string[]) {                // записывает данные в массив всех id товаров в заказе
    this._items = value;    
  } 
  
  get orderFullInfo () {                       // возвращает всю информация о заказе. 
    return {
      payment: this._payment,
      email: this._email,
      phone: this._phone,
      address: this._address,
      total: this._total,
      items: this._items
    }
  }

  
}



    

  

    

    

    
    

    

    

