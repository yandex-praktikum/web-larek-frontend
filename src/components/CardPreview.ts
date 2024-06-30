import { ICard } from "../types"
import { Card } from "./Card"

export class CardPreview extends Card {
  protected cardDescription: HTMLElement;
  protected basketButton: HTMLButtonElement;
  protected closeButton: HTMLButtonElement;
  constructor (template: HTMLTemplateElement) {
    super(template);
    const cardItem = template.content.cloneNode(true) as HTMLElement;
    this.cardDescription = cardItem.querySelector('.card__text') as HTMLElement;
    this.basketButton = cardItem.querySelector('.button') as HTMLButtonElement;
    // this.basketButton.addEventListener('click', () => addToBasket(evt))
  }

  render(data: ICard): HTMLElement {
    this.cardCategory.textContent = data.category;
    this.cardName.textContent = data.name;
    this.cardImage.src = data.image;
    this.cardPrice.textContent = `${data.price} синапсов`;
    this.cardDescription.textContent = data.description;
    return this.cardItem;
  }
}