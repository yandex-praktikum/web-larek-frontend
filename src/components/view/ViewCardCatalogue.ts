import { IViewCardCatalogue } from "../../types/index";
import { categories } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { ViewCard } from "./ViewCard";

export class ViewCardCatalogue<T> extends ViewCard<T> implements IViewCardCatalogue {
  protected _image: HTMLImageElement;
  protected _category: HTMLSpanElement;

  constructor (container: HTMLElement, events: IEvents) {
    super(container, events)
    this._image = ensureElement<HTMLImageElement>('.card__image', container);
    this._category = ensureElement<HTMLSpanElement>('.card__category', container);
    this.container.addEventListener('click', () => this.events.emit('viewCardPreview:open', {id: this.id}))    
  }

  set image(src: string) {                                  // запись изображения товара
    this.setImage(this._image, src, this.title);
  }

  get image() {                                             // получение ссылки на изображение товара
    return this._image.src
  }


  addClassToCategory(value: string) {                       // добавление дополнительных классов категории в зависимости от ее содержания 
    if (value in categories) {
      this._category.classList.replace('card__category_soft', `card__category_${categories[value]}`)
    }
  }

  set category(value: string) {                             // запись данных категории товара (текстКонтент и доп класс)
    this.setText(this._category, value);
    this.addClassToCategory(value);
  }

  get category() {                                          // получение категории товара (текстКонтента или ничего, если категория нулевая или неопределенная)
    return this._category.textContent ?? '';
  }
}
