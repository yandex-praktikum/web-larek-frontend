import { IOrderSuccess, TOrderSuccess } from "../../types";
import { IEvents } from "../base/events";

class OrderSuccess implements IOrderSuccess {
  protected _orderSuccess: TOrderSuccess;
  events: IEvents;

  constructor (events:IEvents) {
    this.events = events;
  }

  set orderSuccess (value: TOrderSuccess) {
    this._orderSuccess = value;
    this.events.emit('order:succeeded', this._orderSuccess)
  }

  get orderSuccess(){
    return this._orderSuccess;
  }
}