import { ICard } from "../types";

export class Card {
protected cardItem: HTMLElement
protected cardCategory: HTMLElement
protected cardName: HTMLElement
protected cardImage: HTMLImageElement
protected cardPrice: HTMLElement



constructor (template: HTMLTemplateElement) {
  const cardElement = template.content.cloneNode(true) as HTMLElement;
  this.cardItem = cardElement.querySelector('.card') as HTMLButtonElement;
  this.cardCategory = this.cardItem.querySelector('.card__category') as HTMLElement;
  this.cardName = this.cardItem.querySelector('.card__title') as HTMLElement;
  this.cardImage = this.cardItem.querySelector('.card__image') as HTMLImageElement
  this.cardPrice = this.cardItem.querySelector('.card__price') as HTMLElement
  
} 

render(data:ICard) {
  this.cardCategory.textContent = data.category;
  this.cardName.textContent = data.name;
  this.cardImage.src = data.image;
  this.cardPrice.textContent = `${data.price} синапсов`
  return this.cardItem
}
}

