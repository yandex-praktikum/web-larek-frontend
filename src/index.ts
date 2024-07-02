import './scss/styles.scss';
import {Card} from './components/Card'
import { IAppApi, ICard } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/appApi';
import { EventEmitter } from './components/base/events';
import { CardsData } from './components/model/CardsData';
import { BasketData } from './components/model/BasketData';
import { OrderData } from './components/model/OrderData';
import { IOrder } from './types/index';
import { OrderBuilder } from './components/model/OrderBuilder';
import { View } from './components/view/View';
import { ViewForm } from './components/view/ViewForm';
import { ViewFormOrder } from './components/view/ViewFormOrder';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ViewCard } from './components/view/ViewCard';
import { ViewCardCatalogue } from './components/view/ViewCardCatalogue';
import { TCategoryClasses } from './types/index';
// import { categories } from './utils/constants';
// import { CardsData } from './components/CardsData';

const cardFullTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement
const cardContainer = document.querySelector('.gallery') as HTMLElement;

const cardSample: ICard =  {
    category: 'sample category',
    id: '12345',
    name: 'sample name',
    description: 'sample description',
    image: 'https://multivarenie.ru/images/multivarenie/2015/01/83.jpg',
    price: 15}

const orderSample: IOrder = {
  paymentType: 'cash',
  address: 'Moscow',
  telephone: '999 99 99',
  email: '12345@inbox.ru',
  total: 1,
  items: ['c101ab44-ed99-4a54-990d-47aa2bb4e7d9']
} 

const events = new EventEmitter;
const cardsData = new CardsData(events);
const basketData = new BasketData(events);
const orderData = new OrderData
//


//получаем Api - экземпляр класса AppApi
const api:IAppApi = new AppApi(CDN_URL, API_URL);

//получаем данные о продуктах с сервера
api.getCards().then((data) => {
    cardsData.cards = data
    const productCard = new Card(cardFullTemplate);
    cardsData.cards.forEach((item) => {
      cardContainer.prepend(productCard.render(item))
    })
    
  }).catch(console.error) 

  api.getCardById('c101ab44-ed99-4a54-990d-47aa2bb4e7d9').then((data) => {
    cardsData.setPreview(data);
  })


  //check View
  // const modalContainer = document.querySelector ('.modal__container') as HTMLElement;
  // const view = new View (modalContainer, events)
  // const viewButton = modalContainer.querySelector('.modal__close') as HTMLElement;
  // view.setDisabled(viewButton, false)
  
  // console.log (view.render())

  // const headerContainer = document.querySelector('.header__container') as HTMLElement;
  // const view1 = new View (headerContainer, events);
  // const viewImage = document.querySelector('.header__logo-image') as HTMLImageElement;
  // view1.setImage(viewImage, 'https://multivarenie.ru/images/multivarenie/2015/01/83.jpg')

  // check ViewCard
  // const basketContainer = document.querySelector ('.basket__item') as HTMLElement;
  // const viewCard = new ViewCard (basketContainer, events);
  // viewCard.id = 'c101ab44-ed99-4a54-990d-47aa2bb4e7d9'
  // console.log(viewCard.price)
  // console.log(viewCard)

  // check ViewCardCatalogue
    const gallery = document.querySelector('.gallery') as HTMLElement;
    const template = ensureElement<HTMLTemplateElement>('#card-catalog')
    const viewCardCatalogue = new ViewCardCatalogue (cloneTemplate(template), events)
    viewCardCatalogue.category = 'другое'
    console.log(viewCardCatalogue)



