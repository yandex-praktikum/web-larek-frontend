import './scss/styles.scss';
import {Card} from './components/Card'
import { IAppApi, ICard } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/appApi';
import { CardsData } from './components/CardsData';

const cardFullTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement
const cardContainer = document.querySelector('.gallery') as HTMLElement;

const cardSample: ICard =  {
    category: 'sample category',
    id: '12345',
    name: 'sample name',
    description: 'sample description',
    image: 'https://multivarenie.ru/images/multivarenie/2015/01/83.jpg',
    price: 15}

//
const cardData = new CardsData (events)//нужно написать EventEmitter

//получаем Api - экземпляр класса AppApi
const api:IAppApi = new AppApi(CDN_URL, API_URL);

//получаем данные о продуктах с сервера
api.getCards().then((data) => {
    cardData.cards = data 
    console.log(cardData.cards)
    // const productCard = new Card(cardFullTemplate)
    // cardContainer.prepend(productCard.render(cardData.cards))

  }).catch(console.error) 

  
const productCard = new Card(cardFullTemplate);
cardContainer.prepend(productCard.render(cardSample))



