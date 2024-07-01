import { IOrder, IOrderBuilder, TOrderContacts, TOrderDelivery, TOrderInfo } from "../../types";
import { IEvents } from "../base/events";

export class OrderBuilder implements IOrderBuilder {
  protected order: IOrder;
  events: IEvents;

  constructor(events: IEvents) {
    this.events = events
  }

  set orderInfo(info: TOrderInfo) {
    this.order.total = info.total;
    this.order.items = info.items
    this.events.emit('order:changed', this.order);
  } 

  set orderDelivery (info: TOrderDelivery) {
    this.order.paymentType = info.paymentType;
    this.order.address = info.address;
    this.events.emit('order:changed', this.order);
  }
  
  set orderContacts (info: TOrderContacts) {
    this.order.email = info.email;
    this.order.telephone = info.telephone;
    this.events.emit('order:changed', this.order);
  }

  getOrderData () {
    return this.order;
  }
}