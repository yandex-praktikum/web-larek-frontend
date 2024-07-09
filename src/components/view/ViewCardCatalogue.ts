import { IViewCardCatalogue } from "../../types/index";
import { categories } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { ViewCard } from "./ViewCard";

export class ViewCardCatalogue<T> extends ViewCard<T> implements IViewCardCatalogue {
  protected _category: HTMLSpanElement;

  constructor (container: HTMLElement, events: IEvents) {
    super(container, events)
    this._category = ensureElement<HTMLSpanElement>('.card__category', container);
    this.container.addEventListener('click', () => this.events.emit('viewCardPreview:open', {id: this.id}))    
  }

  set category(value: string) {                             // запись данных категории товара (текстКонтент и доп класс)
    this.addClassToCategory(value);
    this.setText(this._category, value);
  }

  get category() {                                          // получение категории товара (текстКонтента или ничего, если категория нулевая или неопределенная)
    return this._category.textContent ?? '';
  }
}
