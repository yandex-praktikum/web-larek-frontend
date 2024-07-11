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

```
интерфейсы данных
```
export interface ICard {            
  category: string,
  id: string,
  title: string,
  description: string,
  image: string,
  price: number
};

export interface IOrder {           
  paymentType: TPaymentMethod,
  address: string,
  telephone: string,
  email: string,
  total: number,
  items: string[]
}

export interface ICardsData {
 _cards: ICard[],
}

export interface IOrderData extends IOrder {
  orderFullInfo: IOrder;
}

export interface IOrderConstructor {
  new (): IOrderData;
}

export interface IOrderSuccess {
  orderSuccess: TOrderSuccess;
}

export interface IBasketData {
  goods: ICard[];
  total: number;
  isInBasket(id:string): boolean;
  addToBasket(card: ICard): void;
  removeFromBasket(id: string): void;
  clearBasket(): void;
  getGoodsNumber(): number;
  getTotal(): number;
  getIdsOfGoods(): string[]
}

`export type TPaymentMethod = 'cash' | 'card';`
`export type TCardInfo = Pick<ICard, 'category' | 'title' | 'image' | 'price'>`
`export type TCardPreview = Pick<ICard, 'category' | 'title' | 'description' | 'image' | 'price'>;`
`export type TBasket = Pick<ICard, 'title' | 'price'>;`
`export type TOrder = Partial<IOrder>;`
`export type TPayment = Pick<IOrder, 'paymentType'>;`
`export type TOrderSuccess =  Pick<IOrder, 'items' | 'total'>;`

`export interface IAppApi {`
`getCards(): Promise<ICard[]>;`
`getCardById(id: string): Promise<ICard>;`
`postOrder(order: IOrder): Promise<TOrderSuccess>;}`

export interface IOrderConstructor {
  new (): IOrderData;
}`

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
  image: string;
  description: string;
}

export interface IViewCardCatalogue {
  category: string;
}

export interface IViewCardPreview {
  category: string;
  invalidPrice: boolean;
  buttonValidation: boolean;
}

export interface IViewBasket {
  cards: HTMLElement[];
  total: number;
  emptyCheck: boolean;
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
  payment: TPaymentMethod | null;
  address: string;
  resetButtons(): void;
  valid: boolean;
}


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

export type TViewForm = {valid: boolean; errorMessage: string;}
export type TCategoryClassNames = 'soft' | 'other' | 'additional' | 'button' | 'hard';
`export type TCategoryClasses = Record<string, TCategoryClassNames>;`
export type TId = {id: string};
export type TViewFormOrder = {payment: TPayment; address: string};
export type TViewFormContacts = {email: string; telephone: string};
export type TViewBasket = {cards: HTMLElement[], total: number, emptyCheck: boolean}
export type TViewSuccess = {message: string};
export type TViewCardPreview = ICard & {invalidPrice: boolean; buttonValidation: boolean};
`export type TViewCardBasket = Pick<ICard, 'id' | 'title' | 'price'> & {index: number};`
`export type TViewCardCatalogue = Pick<ICard, 'id' | 'title' | 'price' | 'category' | 'image'>`


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

#### Класс OrderSuccess
конструктор класса: 
- protected _orderSuccess: TOrderSuccess;    - информация об успешном заказе 
- events: IEvents;

### Слой отображения на сайте (View)

#### Класс View
Абстрактный класс View служит шаблоном для всех классов слоя представления. Внутри него будет выводиться контент, созданный дополнительно. 

Принимает в конструктор параметры: 
- `container: HTMLElement`        - контейнер, в котором будут рендериться элементы разметки, создаваемые в дочерних классах. 
- `events:IEvents`                - событие из брокера событий


В классе хранятся следующие поля:

- protected _container: HTMLElement - DOM элемент, передаваемый в конструкторе
- protected events: IEvents - объект класса `EventEmitter` для инициации событий при изменении данных.

Методы, геттеры и сеттеры:

- render(data?: Partial<T>): HTMLElement - возвращает отрисованный html элемент по переданным данным
- toggleClass(element: HTMLElement, className: string, method?: boolean) - переключает класс элемента
- protected setText(element: HTMLElement, value: unknown) - устанавливает тест (textContent) элементу
- setDisabled(element: HTMLElement, state: boolean)  - устанваливает параметр disabled элементу
- protected setImage(element: HTMLImageElement, src: string, alt?: string) - устанавливает изображение (ссылка для src) для элементов изображения

##### Абстрактный класс ViewCard
Расширяет класс `View`, служит шаблоном для всех карточек слоя представления, на основании класса создается инстанс с интерфейсом IViewCard.

Принимает в конструктор параметр родителя `container: HTMLElement` и `events:IEvents`.

В классе содержатся следующие поля:
-  protected _id: string;                     - уникальный id карточки для ее идентификации 
-  protected _title: HTMLHeadingElement;       - DOM элемент (заголовок) названия товара в карточке
-  protected _price: HTMLSpanElement;         - спан цены товара в карточке
- protected _image: HTMLImageElement| null - DOM-элемент изображения в карточке, может принимать значение null, если изображение в элементе отсутствует
- protected _description: HTMLParagraphElement | null; - DOM-элемент (параграф) описания в карточке, может принимать значение null, если описание в элементе отсутствует
-  protected _category: HTMLSpanElement | null; - DOM-элемент (спан) категории в карточке, может принимать значение null, если категория в элементе отсутствует


Методы, геттеры и сеттеры:
геттеры и сетеры полей интерфейса IViewCard:
- set id  -   устанавливает значение id 
- get id  -   получает значение id
- set title  -   запись имени карточки товара в DOM-элемент
- get title -   получение имени карточки товара 
- set price -   запись цены товара в DOM-элемент
- get price -   получение цены товара 
- set image(src: string) - запись изображения товара
- get image - получение ссылки на изображение товара
- description - записывет текста в DOM-элементе описания
- set category(value: string) - запись данных категории товара (текстКонтент и доп класс)
- get category - получение категории товара (текстКонтента или ничего, если категория нулевая или неопределенная)
- addClassToCategory(value: string) - добавление дополнительных классов категории в зависимости от ее содержания 


###### Класс ViewCardCatalogue
Расширяет класс `ViewCard`, служит шаблоном для всех карточек слоя представления, на основании класса создается инстанс с интерфейсом IViewCardCatalogue.

Принимает в конструктор параметр родителя `container: HTMLElement` и `events:IEvents`.

###### Класс ViewCardPreview
Расширяет класс `ViewCard`, служит шаблоном для карточки в формате Preview (представление одной карточки на странице).
Принимает в конструктор параметр родителя `container: HTMLElement` и `events:IEvents`.

В классе содержатся следующие поля:
- protected buttonBuy: HTMLButtonElement;             - DOM элемент кнопки "добавить в корзину" 

Методы, геттеры и сеттеры:

  - set invalidPrice (value: boolean) - устанавливает значение не-валидности (отсутствия) цены, для элементов с ценой "Бесценно";
  - get invalidPrice - возвращает значение не-валидности и блокирует кнопку, если значение true
  - set buttonValidation  - устанавливает значение текста при различных вариантах: если товар бесценный, если товар добавлен в корзину

###### Класс ViewCardBasket
Расширяет класс `ViewCard`, служит шаблоном для представления карточки корзине, на основании класса создается инстанс с интерфейсом IViewCardBasket.

Принимает в конструктор параметры родителя `container: HTMLElement` и `events:IEvents`.

В классе содержатся следующие поля:
- protected _index: HTMLSpanElement;          - DOM элемент (спан) порядкового номера товара в корзине
- protected buttonDelete: HTMLButtonElement;  - DOM элемент кнопки удаления товара из корзины

Методы, геттеры и сеттеры:

  - set index(value: number) - устанавливает значение порядкового номера товара в корзине;
  - get index -  возвращает значение порядкового номера товара в корзине;

##### Класс ViewBasket 
Расширяет класс `View`, служит шаблоном для корзины, на основании класса создается инстанс с интерфейсом IView Basket.
Принимает в конструктор параметры родителя `container: HTMLElement` и `events:IEvents`.
Методы, геттеры и сеттеры:
- set cards(items: HTMLElement[]) - устанавливает список карточек добавленных товаров в корзину
- set total(value: number) - устанавливает общую стоимость товаров
- set emptyCheck(state: boolean) - блокирует кнопку "Оформить" в пустой корзине


##### Абстрактный класс ViewForm
Расширяет класс `View`, служит шаблоном для всех форм слоя представления, на основании класса создается инстанс с интерфейсом IViewForm.

Принимает в конструктор параметры родителя `container: HTMLElement` и `events:IEvents`.

В классе содержатся следующие поля:

- protected container: HTMLFormElement;         - DOM элемент формы
- protected inputs: HTMLInputElement[];         - все поля ввода формы
- protected submitButton: HTMLButtonElement;    - кнопка сабмита формы
- protected errorSpan: HTMLSpanElement;             - спан с текстом ошибки

Методы, геттеры и сеттеры:
- set valid                                           - активация/блокировка кнопки сабмита при валидности/невалидности кнопки; 
- get valid                                           - проверка валидности формы (валидна/невалидна);
- clear()                                             - функция очистки формы;
- set errorMessage(value: string) - устанавливает сообщение об ошибке
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
- getButtonActive(): HTMLButtonElement | null - возвращает кнопку, которая активна
- resetButtons(): void - сбрасывает активный статус кнопки
- set payment - устанавливает метод оплаты (online/cash);
- get payment - возвращает имя активной кнопки типа платежа
- set address - устанавливает адрес из данных, введенных в поле ввода адреса
- get valid() - возвращает "валидность" при разных сценариях нажатия кнопки и ввода данных
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
- get valid()

##### Класс ViewModal 
Расширяет класс `View`, определяет форму модального окна.
Принимает в конструктор параметр родителя `container: HTMLElement` и `events:IEvents`.

В классе содержатся следующие поля:
- protected _content: HTMLElement;
- protected _buttonClose: HTMLButtonElement;

Методы, геттеры и сеттеры:
- open() - открывает модальное окно
- close() - закрывает модальное окно
- set content(value: HTMLElement) - устанавливает содержание контента (внутри модального окна)

##### Класс ViewPage
Расширяет класс `View`, определяет внешний страницы.
Принимает в конструктор параметр родителя `container: HTMLElement` и `events:IEvents`. 

В классе содержатся следующие поля:
- protected _gallery: HTMLElement;
- protected buttonBasket: HTMLButtonElement;
- protected _counter: HTMLSpanElement;
- protected screen: HTMLDivElement;

Методы, геттеры и сеттеры:
- set catalog(viewCards: HTMLElement[]) - устанавливает содержание каталога карточек - заменяет отрендеренными карточками товаров имеющиеся в каталоге 
- set counter(value: number) - устанавливает значение счетчика товаров в корзине
- lockScreen(value: boolean) - блокирует/разблокирует экран при открытии/закрытии модального окна 

#### ViewSuccess
Расширяет класс `View`, определяет внешний страницы сообщения об успешном заказе.
Принимает в конструктор параметр родителя `container: HTMLElement` и `events:IEvents`. 

В классе содержатся следующие поля:
- _message: HTMLParagraphElement;
- buttonSuccess: HTMLButtonElement;

Методы, геттеры и сеттеры:
- set message (value: number) - устанавливает текст сообщения об успешном заказе

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
<!-- - `preview:changed` - изменение превью карточки (вывод/удаление с экрана); -->
- `basket:changed` - изменение корзины с товарами;
- `order:changed` - изменение данных заказа;
- `order:succeeded` - заказ выполнен;
- `payment:input ` - добавление данных о методе оплаты
- `address:input` - добавление данных об адресе
- `email:input` - добавление данных об эмейле
- `telephone:input` -  добавление данных о номере телефона



*События взаимодействия пользователя с интерфейсом*
- `viewModal: open` - блокировка экрана при открытии модального окна;
- `viewModal:close` - снятия блокрировки экрана при закрытии модального окна;
- `viewCardPreview:open` - открытие модального окна детального просмотра продукта;
- `viewCard:addToBasket` - добавления товара в корзину;
- `viewCard:deleteFromBasket` - удаление товара из корзины;
- `basketData:changed` - изменение данных в корзине;
- `viewBasket:open` - открытие корзины;
- `viewOrder:open` - открытие формы с информацией о заказе;
- `order:valid` - валидация данных в форме заказа (для блокировки/разблокировки кнопки и сообщения об ошибке);
- `order:submit` - рендер следующей формы;
- `contacts:valid` - валидация данных в форме контактов (для блокировки/разблокировки кнопки и сообщения об ошибке);
- `contacts:submit` - передача записанных данных о заказе на сервер;
- `success:submit` - закрытие окна при нажатии кнопки "За новыми покупками";



