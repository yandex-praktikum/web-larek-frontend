import {
  IOrder, ICard
} from '../types/index'
import { IEvents } from './base/events';

class OrderData {
  protected paymentType: string;
  protected address: string;
  protected telephone: string;
  protected email: string;
  protected total: number;
  protected items: ICard[];
  protected events: IEvents

  constructor(events:IEvents) {
    this.events = events;
  }

  
}

