import './scss/styles.scss';
import {Card} from './components/Card'
import { IAppApi, ICard, IViewCardCatalogue } from './types';
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
import { ViewCardPreview } from './components/view/ViewCardPreview';
import { ViewPage } from './components/view/ViewPage';
// import { categories } from './utils/constants';
// import { CardsData } from './components/CardsData';

const cardFullTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement
const cardContainer = document.querySelector('.gallery') as HTMLElement;


const orderSample: IOrder = {
  paymentType: 'cash',
  address: 'Moscow',
  telephone: '999 99 99',
  email: '12345@inbox.ru',
  total: 1,
  items: ['c101ab44-ed99-4a54-990d-47aa2bb4e7d9']
} 

//константы данных
const events = new EventEmitter;
const cardsData = new CardsData(events);
const basketData = new BasketData(events);
const orderData = new OrderData

//константы представления
const containerPage = ensureElement<HTMLElement>('.page');
const templateCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const page = new ViewPage(containerPage, events);
//


//получаем Api - экземпляр класса AppApi
const api:IAppApi = new AppApi(CDN_URL, API_URL);

//получаем данные о продуктах с сервера
api.getCards().then((data) => {
    cardsData.cards = data
  }).catch(console.error) 

  api.getCardById('c101ab44-ed99-4a54-990d-47aa2bb4e7d9').then((data) => {
    cardsData.setPreview(data);
  })


//реагируем на изменение (получение) данных о продуктах 
events.on('cards:changed', (cards: ICard[]) => {
  const cardsList = cards.map((card) => {
    const viewCard = new ViewCardCatalogue<IViewCardCatalogue>(cloneTemplate(templateCardCatalog), events);
    return viewCard.render(card)
 })

  page.render({catalog: cardsList})
});

