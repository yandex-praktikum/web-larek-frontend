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
    console.log(cardsData.cards)
    const productCard = new Card(cardFullTemplate);
    cardsData.cards.forEach((item) => {
      cardContainer.prepend(productCard.render(item))
    })
    
  }).catch(console.error) 

  api.getCardById('c101ab44-ed99-4a54-990d-47aa2bb4e7d9').then((data) => {
    cardsData.setPreview(data);
    console.log(data.id)
    console.log(cardsData.getPreview())


  })

// console.log(basketData.goods);
// basketData.addToBasket(cardSample)
// console.log(basketData.goods)


// orderData.paymentType = orderSample.paymentType;
// orderData.address = orderSample.address;
// orderData.telephone = orderSample.telephone;
// orderData.email = orderSample.email;
// orderData.items = orderSample.items;
// orderData.total = basketData.total;


// const orderBuilder = new OrderBuilder(events, orderData);
// orderBuilder.setOrderContacts(orderData);
// orderBuilder.setOrderDelivery(orderData);
// orderBuilder.setOrderInfo(orderData);
// console.log(orderBuilder.getOrderData())
// // orderBuilder.orderDelivery = orderData;
// // orderBuilder.orderContacts = orderData;
// // console.log(orderBuilder.getOrderData())

// // const productCard = new Card(cardFullTemplate);
// // cardContainer.prepend(productCard.render(cardSample))



