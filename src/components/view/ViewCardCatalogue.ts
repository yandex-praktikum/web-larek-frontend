import { IViewCardCatalogue, TViewCardCatalogue } from "../../types/index";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { ViewCard } from "./ViewCard";

export class ViewCardCatalogue<TViewCardCatalogue> extends ViewCard<TViewCardCatalogue> implements IViewCardCatalogue {
  constructor (container: HTMLElement, events: IEvents) {
    super(container, events)  
    this.container.addEventListener('click', () => this.events.emit('viewCardPreview:open', {id: this.id}))    
  }
}
