import './scss/styles.scss';
import { IAppApi, ICard, IViewCardCatalogue } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/appApi';
import { EventEmitter } from './components/base/events';
import { CardsData } from './components/model/CardsData';
import { BasketData } from './components/model/BasketData';
import { OrderData } from './components/model/OrderData';
import { IOrder, TId } from './types/index';
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
import { ViewModal} from './components/view/ViewModal';



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

//константы представления: контейнеры
const containerViewPage = ensureElement<HTMLElement>('.page');
const containerViewModal = ensureElement<HTMLElement>('#modal-container');

//константы представления: шаблоны
const templateViewCardPreview = ensureElement<HTMLTemplateElement>('#card-preview');
const templateViewCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog');

//константы представления: инстансы классов представления
const viewPage = new ViewPage(containerViewPage, events);
const viewModal = new ViewModal(containerViewModal, events);
const viewCardPreview = new ViewCardPreview (cloneTemplate(templateViewCardPreview), events); 



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

//блокировка страницы при открытии модального окна - перенести в конец?
events.on('viewModal:open', () => {
  viewPage.lockScreen(true);
});

//разблокировка страницы при закрытии модального окна
events.on('viewModal:close', () => {
  viewPage.lockScreen(false);
});

//обработка события на клик по карточке каталога - открытия модального окна с карточкой превью
events.on('viewCardPreview:open', (dataId: TId) => {
  const cardToPreview = cardsData.getCard(dataId.id);
  if(cardToPreview) { 
  const viewCardToPreview = viewCardPreview.render(cardToPreview)
  viewModal.render({content: viewCardToPreview});
  // viewModal.render(viewCardPreview.render(cardToPreview));
  // console.log(viewModal.render(viewCardPreview.render(cardToPreview)))
  viewModal.open();
  }
});

