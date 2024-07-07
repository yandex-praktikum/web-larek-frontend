import { IOrderData, IOrderBuilder, TOrderContacts, TOrderDelivery, TOrderInfo, IOrderConstructor } from "../../types";
import { IEvents } from "../base/events";

export class OrderBuilder implements IOrderBuilder {
  protected order: IOrderData;
  events: IEvents;

  constructor(events: IEvents, orderConstructor: IOrderConstructor) {
    this.order = new orderConstructor();
    this.events = events
  }

  set orderInfo(info: TOrderInfo) {                           //записывает информацию о заказе
    this.order.total = info.total;
    this.order.items = info.items
    this.events.emit('order:changed', this.order);
  } 

  set orderDelivery (info: TOrderDelivery) {                  //записывает информацию о доставке: тип оплаты и адрес
    this.order.paymentType = info.paymentType;
    this.order.address = info.address;
    this.events.emit('order:changed', this.order);
  }
  
  set orderContacts (info: TOrderContacts) {                  //записывает информацию о контактах: эмейл и телефон
    this.order.email = info.email;
    this.order.telephone = info.telephone;
    this.events.emit('order:changed', this.order);
  }

  getOrderData () {                                           // возвращает все данные о                                       
    return this.order;
  }
}