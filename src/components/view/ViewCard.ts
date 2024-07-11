import { ICard, IViewCard } from "../../types/index";
import { IEvents } from "../base/events";
import { View } from '../view/View';
import { ensureElement } from "../../utils/utils";
import { categories } from "../../utils/constants";


export abstract class ViewCard<T> extends View<T> implements IViewCard {
  protected _id: string;
  protected _title: HTMLHeadingElement;
  protected _price: HTMLSpanElement;
  protected _image: HTMLImageElement| null;
  protected _description: HTMLParagraphElement | null;
  protected _category: HTMLSpanElement | null;
  
  constructor (container: HTMLElement, events:IEvents) {
    super(container, events);
    this._title = ensureElement<HTMLHeadingElement>('.card__title', container);
    this._price = ensureElement<HTMLSpanElement>('.card__price', container);
    this._image = container.querySelector('.card__image');
    this._category = container.querySelector('.card__category');
    this._description = container.querySelector('.card__text');
  }

set id(value: string) {                                                          // запись id карточки товара
    this._id = value;
}

get id() {                                                                        // получение id карточки товара 
    return this._id;
}

set title(value: string) {                                                        //запись имени карточки товара
    this.setText(this._title, value);
}

get title() {                                                                     // получение имени карточки товара
    return this._title.textContent ?? '';
}

set price(value: string) {                                                       // запись цены товара
    this.setText(this._price, value ? `${value} синапсов` : `Бесценно`)
}


get price(){                                                                   // получение цены товара
  return this._price.textContent ?? ''
  }

set image(src: string) {
  if (this._image){                                  // запись изображения товара
  this.setImage(this._image, src, this.title);}
}

  get image() {    
    if (this._image)  {                                // получение ссылки на изображение товара
    return this._image.src}
    return ''
  }

  set description (value: string) {     
    if (this._description)                            //записывет текста в DOM-элементе описания
    this.setText(this._description, value);
  }

  addClassToCategory(value: string) {                       // добавление дополнительных классов категории в зависимости от ее содержания 
    if (this._category && value in categories) {
      let classes = Array.from(this._category.classList)
      classes.forEach((item: string) => {
        if (item.includes('card__category_') && this._category) {
          this._category.classList.remove(item)
        }
      })
      this._category.classList.add(`card__category_${categories[value]}`)
    }
  }

  set category(value: string) {                             // запись данных категории товара (текстКонтент и доп класс)
    this.addClassToCategory(value);
    if (this._category) {
    this.setText(this._category, value);
    }
  }

  get category() {      
    if (this._category) {                                    // получение категории товара (текстКонтента или ничего, если категория нулевая или неопределенная)
    return this._category.textContent ?? '';
    }
    return ''
  }
}

