# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей 
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Данные и типы данных, используемые в проекте



Карточка продукта
```
export interface ICard {
  category: string,
  id: string,
  name: string,
  description: string,
  image: string,
  price: number
};
```

Заказ
```
export interface IOrder {
  paymentType: string,
  address: string,
  telephone: string,
  email: string,
  total: number,
  items: ICard[]
}
```

Интерфейс для модели данных карточек
```
export interface ICardsData {
_cards: ICard[],
}
```

Интерфейс для модели данных заказа
```
export interface IOrderData {
  orderFullInfo: IOrder;
}
```

Интерфейс для бильдера данных заказа
```
export interface IOrderBuilder{
    orderInfo: TOrderInfo;
    orderDelivery: TOrderDelivery;
    orderContacts: TOrderContacts;
    getOrderData(): IOrder;
}
```

Интерфейс для конструктора инстанса c интерфейсом IOrderData
```
export interface IOrderConstructor {
  new (): IOrderData;
}
```

Интерфейс для данных в корзине
```
export interface IBasketData {
  goods: ICard[];
  total: number;
  isInBasket(id:string): boolean;
  addToBasket(card: ICard): void;
  removeFromBasket(card: ICard): void;
  clearBasket(): void;
  getGoodsNumber(): number;
  getTotal(): number;
  getIdsOfGoods(): string[];
}
```

Интерфейс для данных успешного заказа
```
export interface IOrderSuccess {
  orderSuccess: TOrderSuccess;
}
```

Данные карточки, которые выводятся на главной странице
```
export type TCardInfo = Pick<ICard, 'category' | 'name' | 'image' | 'price'>
```

Данные карточки, которые выводятся в отдельном поле
```
export type TCardPreview = Pick<ICard, 'category' | 'name' | 'description' | 'image' | 'price'>;
```

Данные карточки, которые выводятся в корзине
```
export type TBasket = Pick<ICard, 'name' | 'price'>;
```

Данные заказа в общем виде
```
export type TOrder = Partial<IOrder>;
```

Данные заказа, которые выводятся в первом модальном окне оформления заказа
```
export type TOrderOrder = Pick<IOrder, 'paymentType' | 'address'>;
```

Данные заказа, которые выводятся во втором модальном окне оформления заказа
```
export type TOrderContacts = Pick<IOrder, 'email' | 'telephone'>;
```

Данные заказа, которые выводятся в модальном окне успешно завершенного заказа
```
export type TOrderSuccess = Pick<IOrder, 'total'>;
```

Интерфейс обработки Api
```
export interface IAppApi {
  getCards(): Promise<ICard[]>;
  getCardById(id: string): Promise<ICard>;
  postOrder(order: IOrder): Promise<TOrderSuccess>;
}
```

// интерфейсы представления

export interface IViewModal {
  content: HTMLElement;
  buttonClose: HTMLButtonElement;
  open(): void;
  close(): void
}

export interface IViewCard {
  id: string;
  title: string;
  price: string;
}

export interface IViewCardCatalogue {
  image: string;
  category: string;
}

export interface IViewCardPreview {
  description: string;
  state: boolean;
}

export interface IViewCardBasket {
  index: number;
}

export interface IViewForm {
  valid: boolean;
  errorMessage: string;
  clear(): void;
}

export interface IViewFormOrder {
  paymentMethod: TPaymentMethod | null;
  address: string;
  valid: boolean;}

export type TViewForm = {valid: boolean; errorMessage: string[];}

export interface IViewFormContacts {
  email: string;
  telephone: string;
  valid: boolean;
}

export interface IViewSuccess {
  message: string;
}

export interface IViewPage {
  catalog: HTMLElement[];
  counter: number;
  lockScreen(value: boolean): void;
}

export type TCategoryClassNames = 'soft' | 'other' | 'additional' | 'button' | 'hard';
export type TCategoryClasses = Record<string, TCategoryClassNames>;
export type TId = {id: string};
export type TViewFormOrder = {payment: TPayment; address: string};
export type TViewFormContacts = {email: string; telephone: string};
export type TViewBasket = {cards: HTMLElement[], total: number}
export type TViewSuccess = {message: string};


## Архитектура проекта

Код проекта написан в парадигме MVP и разделен на следующие слои: 
- слой Data (данные): хранение и изменение данных;
- слой View (представление): отображение данных на странице;
- Presenter (презентер): связь данных и представления

### Базовый код

#### Класс API

Описывает логику обмена данными с сервером. В конструктор передается базовый адрес сервера baseUrl, а также options: заголовок запроса формата 
```
  headers: {
    'Content-Type': 'application/json',
     ...(options.headers as object ?? {})
    }
```

Используемые метода класса:
- `get`: в качестве параметра принимает uri: string и выполняет GET-запрос на сервер на основании заданных параметров: "this.baseUrl + uri" и возвращает с сервера Промис с объектом 
- `post`: в качестве параметров принимает uri: string и data: object; через POST-запрос направляет на сервер с адресом "this.baseUrl + uri" объект "data", обработанный методом JSON.stringify

#### Класс EventEmitter

Класс создан с использованием типов
```
type EventName = string | RegExp;
type Subscriber = Function;
type EmitterEvent = {
    eventName: string,
    data: unknown
};
```

и интерфейса
```
export interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
```
использумемые методы:
- `on`: устанавлливает обработчик на событие;
- `off`: снимает обработчик с события;
- `onAll`: устанавливает обработчики на все события;
- `offAll`: снимает обработчики со всех событий;
- `emit`: инициирует событие;
- `trigger`: возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие.

### Слой данных (Model)
отвечает за хранение и обработку данных страницы.

#### Класс CardsData

отвечает за хранение и логику работы данных карточек с продуктами. 

Конструктор класса принимает `events: IEvents` - объект класса `EventEmitter` для инициации событий при изменении данных.

В классе хранятся следующие поля:\
- _cards: ICard[] -  массив карточек продуктов; 
- _preview: ICard - карточка, выводимая в превью;

Методы, геттеры и сеттеры.
- set cards(cards: ICard[]): void - записывает массив карточек в _cards
- get cards(): ICard[]            - возвращает массив продуктов _cards
- getCard (id: string)            - находит карточку товара по id 

#### Класс BasketData
Класс отвечает за хранение и логику товаров, добавленных покупателем в корзину

Конструктор класса принимает параметры: `events: IEvents` - объект класса `EventEmitter` для инициации событий при изменении данных.
В классе хранятся следующие данные:\
- _goods: ICard[] - массив добавленных товаров в корзине покупателя;
- total: number - общая стоимость товаров, добавленных в корзину, начальное знаение = 0
- events: IEvents;

Методы, геттеры и сеттеры:

- get goods()                               - получает значения товаров, добавленных в корзину
- set goods(cards: ICard[])                 - записывает данные товаров, добавлыенных в корзину
- isInBasket(card: ICard): boolean          - проверяет, есть ли карточка в корзине 
- addToBasket(card: ICard): IBasketData     - добавляет карточку в корзину
- removeFromBasket(card:ICard): IBasketData - удаляет карточку из корзины
- clearBasket(): IBasketData                - очищает корзину
- getGoodsNumber(): number                  - получает количество товаров в корзине 
- getTotal(): number                        - получает стоимость всех товаров, добавленных в корзину
- getIdsOfGoods()                           - получает массив id всех товаров, добавленных в корзину

#### Класс OrderData
отвечает за хранение и логику работы данных пользователя при оформлении заказа.\

В классе хранятся следующие данные:\
- _paymentType: PaymentMethod   - выбранный тип оплаты заказа;
- _address: string              - адрес доставки заказа;
- _telephone: string            - номер телефона заказчика;
- _email: string                - адрес электронной почты заказчика;
- _total: number                - общая стоимость заказа;
- _items: string[]              - перечень заказанных продуктов;
- events: IEvents               - события брокера событий

Методы, геттеры и сеттеры:
- getOrderInfo (): IOrder               - возвращение всей информации о заказе;
- set paymentType(type: PaymentMethod)  - записывает данные в метод оплаты
- set email(value: string): void        - записывает данные в email покупателя
- set telephone(value: string): void    - записывает данные в номер телефона покупателя
- set address(value: string): void      - записывает данные в адрес покупателя
- set total(value: number): void        - запись общей суммы покупок
- set items(value: string[])            - запись id товаров заказа

#### Класс OrderDataBuilder
Позволяет выполнять формирование экземпляра класса `OrderData` поэтапно (добавление товаров, выбор способа покупки и указание класса доставки, указание е-мейл и телефона). 

Конструктор класса принимает параметры: `events: IEvents` - объект класса `EventEmitter` для инициации событий при изменении данных и orderConstructor: IOrderConstructor - класс, создающий объекты интерфейса IOrderData.

В классе хранятся следующие данные:\
- protected order: IOrder;
- events: IEvents;

Методы, геттеры и сеттеры:

- set orderInfo: TOrderInfo - запись информации о заказе
- set orderDelivery: TOrderOrder - запись информацию о доставке: тип оплаты и адрес
- set orderContacts: TOrderContacts - информацию о контактах: эмейл и телефон
- getOrderData(): IOrder - возвращает все данные о заказе.

#### Класс OrderSuccess
конструктор класса: 
- protected _orderSuccess: TOrderSuccess;    - информация об успешном заказе 
- events: IEvents;
### Слой отображения на сайте (View)

#### Класс View
Класс View служит шаблоном для всех классов слоя представления. Внутри него будет выводиться контент, созданный дополнительно. 

Принимает в конструктор параметры: 
- `container: HTMLElement`        - контейнер, в котором будут рендериться элементы разметки, создаваемые в дочерних классах. 
- `events:IEvents`                - событие из брокера событий


В классе хранятся следующие поля:

- protected _container: HTMLElement - DOM элемент, передаваемый в конструкторе
- protected events: IEvents - объект класса `EventEmitter` для инициации событий при изменении данных.
- private _valid: any; 

Методы, геттеры и сеттеры:

- render(data?: Partial<T>): HTMLElement - возвращает отрисованный html элемент по переданным данным
- toggleClass(element: HTMLElement, className: string, method?: boolean) - переключает класс элемента
- protected setText(element: HTMLElement, value: unknown) - устанавливает тест (textContent) элементу
- setDisabled(element: HTMLElement, state: boolean)  - устанваливает параметр disabled элементу
- protected setImage(element: HTMLImageElement, src: string, alt?: string) - устанавливает изображение (ссылка для src) для элементов изображения


##### Класс ViewPage
Расширяет класс `View`, служит шаблоном для представления страницы.

Принимает в конструктор параметры `container: HTMLElement` и `events:IEvents`.

В классе хранятся следующие поля:

  - protected _gallery: HTMLElement;              - галерея/каталог, контейнер для отрендереных карточек товаров на стартовой странице 
  - protected buttonBasket: HTMLButtonElement;    - кнопка корзины
  - protected _counter: HTMLSpanElement;          - спан счетчика товаров в корзине
  - protected screen: HTMLDivElement;             - DOM элемент (div), оборачивающий содержание страницы

Методы, геттеры и сеттеры:
- set catalog(viewCards: HTMLElement[]) - устанавливает содержание каталога карточек - заменяет отрендеренными карточками товаров имеющиеся в каталоге\
- set counter(value: number) - устанавливает значение счетчика товаров в корзине\
- lockScreen(value: boolean) - блокирует экран (добавляет соответствующие класс экрану)

##### Класс ViewCard
Расширяет класс `View`, служит шаблоном для всех карточек слоя представления, на основании класса создается инстанс с интерфейсом IViewCard.

Принимает в конструктор параметр родителя `container: HTMLElement` и `events:IEvents`.

В классе содержатся следующие поля:
-  protected _id: string;                     - уникальный id карточки для ее идентификации 
-  protected _name: HTMLHeadingElement;       - DOM элемент (заголовок) названия товара в карточке
-  protected _price: HTMLSpanElement;         - спан цены товара в карточке

Методы, геттеры и сеттеры:
геттеры и сетеры полей интерфейса IViewCard:
- set id  -   устанавливает значение id 
- get id  -   получает значение id
- set title  -   запись имени карточки товара в DOM-элемент
- get title -   получение имени карточки товара 
- set price -   запись цены товара в DOM-элемент
- get price -   получение цены товара 

###### Класс ViewCardCatalogue
Расширяет класс `ViewCard`, служит шаблоном для всех карточек слоя представления, на основании класса создается инстанс с интерфейсом IViewCardCatalogue.

Принимает в конструктор параметр родителя `container: HTMLElement` и `events:IEvents`.

В классе содержатся следующие поля:
- protected _image: HTMLImageElement;       - DOM элемент (img) изображения в карточке
- protected _category: HTMLSpanElement;     - спан названия категории


Методы, геттеры и сеттеры:
геттеры и сетеры полей интерфейса IViewCardCatalogue:
- set image  -   устанавливает изображение товара (ссылку и альт-текст)
- get image  -   получает ссылку изображения товара
- set category  -  устанавливает название категории и доп класс в зависимости от названия
- get category - получает название категории (текстКОнтент)
- addClassToCategory(value: string) - добавление дополнительных классов категории в зависимости от ее содержания 

###### Класс ViewCardPreview
Расширяет класс `ViewCard`, служит шаблоном для карточки в формате Preview (представление одной карточки на странице).
Принимает в конструктор параметр родителя `container: HTMLElement` и `events:IEvents`.

В классе содержатся следующие поля:
- protected _description: HTMLParagraphElement;       - DOM элемент (р) описания товара
- protected buttonBuy: HTMLButtonElement;             - DOM элемент кнопки "добавить в корзину" 

Методы, геттеры и сеттеры:

  - set description - устанавливает текст описания товара;
  - get description - возвращает текст из DOM-элемента описания или '', если текста в DOM-элементе нет;

###### Класс ViewCardBasket
Расширяет класс `ViewCard`, служит шаблоном для представления карточки корзине, на основании класса создается инстанс с интерфейсом IViewCardBasket.

Принимает в конструктор параметры родителя `container: HTMLElement` и `events:IEvents`.

В классе содержатся следующие поля:
- protected _index: HTMLSpanElement;          - DOM элемент (спан) порядкового номера товара в корзине
- protected buttonDelete: HTMLButtonElement;  - DOM элемент кнопки удаления товара из корзины

Методы, геттеры и сеттеры:

  - set index(value: number) - устанавливает значение порядкового номера товара в корзине;
  - get index -  возвращает значение порядкового номера товара в корзине;

##### Класс ViewForm
Расширяет класс `View`, служит шаблоном для всех форм слоя представления, на основании класса создается инстанс с интерфейсом IViewForm.

Принимает в конструктор параметры родителя `container: HTMLElement` и `events:IEvents`.

В классе содержатся следующие поля:

- protected container: HTMLFormElement;         - DOM элемент формы
- protected inputs: HTMLInputElement[];         - все поля ввода формы
- protected submitButton: HTMLButtonElement;    - кнопка сабмита формы
- protected errorSpan: HTMLSpanElement;             - спан с текстом ошибки

Методы, геттеры и сеттеры:
- changeInput(inputName: string, inputValue: string)  - функция изменения данных ввода с эмитом брокера события input:change;
- set valid                                           - активация/блокировка кнопки сабмита при валидности/невалидности кнопки; 
- get valid                                           - проверка валидности формы (валидна/невалидна);
- clear()                                             - функция очистки формы;
- render(data: Partial<TViewForm> & TViewForm )       - рендер формы в разметку;

###### Класс ViewFormOrder

Расширяет класс `ViewForm`, определяет форму ввода информации о заказе.
Принимает в конструктор параметр родителя `container: HTMLElement` и `events:IEvents`.

В классе содержатся следующие поля:
- protected buttonsContainer: HTMLElement;        - DOM-элемент контейнера с кнопками
- protected buttonOnline: HTMLButtonElement;      - DOM-элемент кнопки оплаты онлайн   
- protected buttonOnDelivery: HTMLButtonElement;  - DOM-элемент кнопки оплаты по получении
- protected addressInput: HTMLInputElement;       - DOM-элемент поля ввода адреса

Методы, геттеры и сеттеры:
- protected getButtonActive(): HTMLButtonElement | null - возвращает кнопку, которая активна
- protected resetButtons(): void - сбрасывает активный статус кнопки
- set paymentMethod - устанавливает метод оплаты (card/cash);
- set address - устанавливает адрес из данных, введенных в поле ввода адреса
- get valid() - возвращает "валидность"
- set valid(value: boolean) - устанавливает значение параметра valid
- clear() - очищает форму, сбрасывает кнопки

###### Класс ViewFormContacts

Расширяет класс `ViewForm`, определяет форму ввода контактных данных заказчика, на основании класса создается инстанс с интерфейсом IViewFormContacts.
Принимает в конструктор параметр родителя `container: HTMLElement` и `events:IEvents`.

В классе содержатся следующие поля:
- protected emailInput: HTMLInputElement;
- protected telephoneInput: HTMLInputElement;

Методы, геттеры и сеттеры:
- get email()           - устанавливает эмейл из данных, введенных в поле ввода эмейла
- get telephone()       - устанавливает номе телефона из данных, введенных в поле ввода номера телефона


### Слой коммуникации

#### Класс AppApi

расширяет класс `Api` и предоставляет методы реализующие взаимодействие с бэкендом сервиса.

Поля

- protected cdn: string - базовый путь до изображений карточек, передаваемый в конструкторе
Параметры в конструкторе:

параметры Api
- cdn: string - базовый путь до изображений карточек

Методы, геттеры и сеттеры:

- getProducts(): Promise<ICard[]> - получает с сервера массив объектов всех товаров
- getProductById(id: string): Promise<ICard> - получает с сервера конкретный товар по id
- postOrder(order: IOrder): Promise<TOrderSuccess>  - отправляет post запрос на сервер, содержащий данные о заказе и получает по итогу номер заказа (id) и общую сумму заказ (total)

## Взаимодействие компонентов 
Код, описывающий взаимодействие компонентов, находится в файле `index.ts`, который выполняет роль презентера.
Взаимодействие происходит за счет событий, генерируемых с помощью брокера событий и обработчиков событий, описанных в `index.ts`.

*Список событий, генерируемых в системе:*
*События, связанные с данными*
- `cards:changed` - изменение массива карточек продуктов;
- `preview:changed` - изменение превью карточки (вывод/удаление с экрана);
- `basket:changed` - изменение корзины с товарами;
- `order:changed` - изменение данных заказа;
- `order:succeeded` - заказ выполнен;


*События взаимодействия пользователя с интерфейсом*
- `viewModal: open` - блокировка экрана при открытии модального окна;
- `viewModal:close` - снятия блокрировки экрана при закрытии модального окна;
- `viewCardPreview:open` - открытие модального окна детального просмотра продукта;
- `viewCard:addToBasket` - добавления товара в корзину;
- `viewCard:deleteFromBasket` - удаление товара из корзины;
- `basketData:changed` - изменение данных в корзине;
- `viewBasket:open` - открытие корзины;
- `viewOrder:open` - открытие формы с информацией о заказе;
- `order:valid` - запись введенных данных в заказ;
- `order:submit` - передача данных в следующую форму, рендер следующей формы;
- `contacts:valid` - обработка события: запись введенных данных в заказ (информация о контактах);
- `contacts:submit` - передача записанных данных о заказе на сервер;
- `success:submit` - закрытие окна при нажатии кнопки "За новыми покупками";



