import './scss/styles.scss';
import { IAppApi, ICard, IViewCardCatalogue } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/appApi';
import { EventEmitter } from './components/base/events';
import { CardsData } from './components/model/CardsData';
import { BasketData } from './components/model/BasketData';
import { OrderData } from './components/model/OrderData';
import { TId } from './types/index';
import { ViewFormOrder } from './components/view/ViewFormOrder';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ViewCardCatalogue } from './components/view/ViewCardCatalogue';
import { ViewCardPreview } from './components/view/ViewCardPreview';
import { ViewPage } from './components/view/ViewPage';
import { ViewModal} from './components/view/ViewModal';
import { ViewCardBasket } from './components/view/ViewCardBasket';
import { ViewBasket } from './components/view/ViewBasket';
import { ViewFormContacts } from './components/view/ViewFormContacts';
import { TOrderSuccess } from './types/index';
import { OrderSuccess } from './components/model/OrderSuccess';
import { ViewSuccess } from './components/view/ViewSuccess'


//константы данных: инстансы классов данных
const events = new EventEmitter;
const cardsData = new CardsData(events);
const basketData = new BasketData(events);
const orderData = new OrderData;
const orderSuccess = new OrderSuccess( events);

//константы представления: контейнеры
const containerViewPage = ensureElement<HTMLElement>('.page');
const containerViewModal = ensureElement<HTMLElement>('#modal-container');

//константы представления: шаблоны
const templateViewCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const templateViewCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');
const templateViewCardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const templateViewBasket = ensureElement<HTMLTemplateElement>('#basket');
const templateViewOrder = ensureElement<HTMLTemplateElement>('#order');
const templateViewContacts = ensureElement<HTMLTemplateElement>('#contacts');
const templateViewSuccess = ensureElement<HTMLTemplateElement>('#success');


//константы представления: инстансы классов представления
const viewPage = new ViewPage(containerViewPage, events);
const viewModal = new ViewModal(containerViewModal, events);
const viewCardPreview = new ViewCardPreview (cloneTemplate(templateViewCardPreview), events); 

// const viewCardBasket = new ViewCardBasket (cloneTemplate(templateViewCardBasket), events);
const viewBasket = new ViewBasket (cloneTemplate(templateViewBasket), events);
const viewFormOrder = new ViewFormOrder (cloneTemplate(templateViewOrder), events);
const viewFormContacts = new ViewFormContacts(cloneTemplate(templateViewContacts), events);
const viewSuccess = new ViewSuccess(cloneTemplate(templateViewSuccess), events);

//получаем Api - экземпляр класса AppApi
const api:IAppApi = new AppApi(CDN_URL, API_URL);

//получение данных о товарах с сервера
api.getCards().then((data) => {
    cardsData.cards = data
  }).catch(console.error) 



//выведение карточек товаров в каталог   
events.on('cards:changed', (cards: ICard[]) => {
  const cardsList = cards.map((card) => {
    const viewCard = new ViewCardCatalogue<IViewCardCatalogue>(cloneTemplate(templateViewCardCatalog), events);
    return viewCard.render(card)
 })

  viewPage.render({catalog: cardsList})
});

//блокировка страницы при открытии модального окна
events.on('viewModal:open', () => {
  viewPage.lockScreen(true);
});

//разблокировка страницы при закрытии модального окна
events.on('viewModal:close', () => {
  viewPage.lockScreen(false);
});

//обработка события: открытие модального окна с карточкой превью
events.on('viewCardPreview:open', (dataId: TId) => {
  const cardToPreview = cardsData.getCard(dataId.id);
  if(cardToPreview) { 
  viewModal.render({content: viewCardPreview.render({...cardToPreview, invalidPrice: Boolean(!cardToPreview.price), buttonValidation: basketData.isInBasket(cardToPreview.id)})});
  viewModal.open();
  }
});


//обработка события: добавления товара в корзину 
events.on('viewCard:addToBasket', (dataId: TId) => {
  const cardToAdd = cardsData.getCard(dataId.id);
  if(cardToAdd) {
  basketData.addToBasket(cardToAdd)}
  }
);

//обработка события: удаление товара из корзины
events.on('viewCard:deleteFromBasket', (dataId: TId) => {
    basketData.removeFromBasket(dataId.id)}
);

//обработка события: изменение данных в корзине, отражается на счетчике и содержимом корзины
events.on('basketData:changed', (dataId: TId) => {
  const cardPreview = cardsData.getCard(dataId.id)
  if (cardPreview){
  viewCardPreview.render({invalidPrice: Boolean(!cardPreview.price), buttonValidation: basketData.isInBasket(dataId.id)})}
  viewPage.render({counter: basketData.getGoodsNumber()})                                                     //обновление счетчика
  const goodsList = basketData.goods.map((good, index) => {                                                   //создание из массива товаров в корзине DOM-элементов - инстансов ViewCardBasket 
    const viewCardBasket = new ViewCardBasket(cloneTemplate(templateViewCardBasket), events);
    return viewCardBasket.render({...good, index: index++})
    })
  viewBasket.render({cards: goodsList, total: basketData.getTotal()})
  }
)

//обработка события: клик по иконке(кнопке) корзины на главной старанице - открытие корзины
events.on('viewBasket:open', () => {
  viewModal.render({ content: viewBasket.render({total: basketData.getTotal(), emptyCheck: basketData.emptyValidation()})});
  viewModal.open();
});

//обработка события: открытие формы с информацией о заказе
events.on('viewOrder:open', () =>{
  orderData.total = basketData.getTotal()
  orderData.items = basketData.getIdsOfGoods()
  viewModal.render({ 
    content: viewFormOrder.render({
      valid: viewFormOrder.valid,
      errorMessage: 'Выберите метод платежа и заполните поле адреса'
    })})
})

events.on('payment:input', () => {
  if (viewFormOrder.payment) {
  orderData.paymentType = viewFormOrder.payment
  }
})

events.on('address:input', () => {
  orderData.address = viewFormOrder.address
}
)

// обработка события: запись введенных данных в заказ (информация о заказе)
events.on('order:valid', () => {
  viewFormOrder.valid = viewFormOrder.valid
})

//обработка события открытие формы с информацией о контактах
events.on(`order:submit`, () => {
    return viewModal.render({ content: viewFormContacts.render({
    valid: viewFormContacts.valid,
    errorMessage: 'Заполните поля электронной почты и телефона'
  }) });
});

events.on('email:input', () => {
  orderData.email = viewFormContacts.email
})

events.on('telephone:input', () => {
  orderData.telephone = viewFormContacts.telephone
})


//обработка события: запись введенных данных в заказ (информация о контактах)
events.on('contacts:valid', () => {
  viewFormContacts.valid = viewFormContacts.valid;
});


// передача записанных данных о заказе на сервер
events.on('contacts:submit', () => {
  const order = orderData.orderFullInfo
  api.postOrder(order).then((data: TOrderSuccess) => {
    console.log(data);
    orderSuccess.orderSuccess = data;
    viewFormOrder.clear();
    viewFormContacts.clear();
    basketData.clearBasket();
   }).catch(console.error)
      viewModal.render({
      content: viewSuccess.render({
      message: String(order.total)
    })
  })
});

//закрытие окна при нажатии кнопки "За новыми покупками"
events.on('success:submit', () => {
  console.log(viewModal)
  viewModal.close();
})