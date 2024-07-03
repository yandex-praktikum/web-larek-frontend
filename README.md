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
  _preview: string | null,
}
```

Интерфейс для модели данных заказа
```
export interface IOrderData {
  orderInfo: IOrder;
  addCard(card: ICard): void;
  deleteCard(id: string): void;
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

#### Класс AppData 
служит шаблоном для классов слоя данных.

Принимает в конструктор параметр `events: IEvents` - объект класса `EventEmitter` для инициации событий при изменении данных.

#### Класс CardsData

отвечает за хранение и логику работы данных карточек с продуктами. 

Конструктор класса принимает инстант брокера событий.\
В классе хранятся следующие поля:\
- _cards: ICard[] -  массив карточек продуктов; 
- _preview: ICard - карточка, выводимая в превью;


Методы класса
- set cards(cards: ICard[]): void - записывает массив карточек в _cards
- get cards(): ICard[] - возвращает массив продуктов _cards
- setPreview(card:ICard): ICard - возвращает карточку для превью

#### Класс BasketData
Класс отвечает за хранение и логику товаров, добавленных покупателем в корзину

Конструктор класса принимает параметры: `events: IEvents` - объект класса `EventEmitter` для инициации событий при изменении данных.
В классе хранятся следующие данные:\
_goods: ICard[] - массив добавленных товаров в корзине покупателя.
total: number - общая стоимость товаров, добавленных в корзину

Методы, геттеры и сеттеры:


- isInBasket(card: ICard): boolean - проверяет, есть ли карточка в корзине 
- addToBasket(card: ICard): IBasketData - добавляет карточку в корзину
- removeFromBasket(card:ICard): IBasketData - удаляет карточку из корзины
- clearBasket(): IBasketData - очищает корзину
- getGoodsNumber(): number - получает количество товаров в корзине 

#### Класс OrderData
отвечает за хранение и логику работы данных пользователя при оформлении заказа.\
В классе хранятся следующие данные:\
- _paymentType: PaymentMethod - выбранный тип оплаты заказа;
- _address: string - адрес доставки заказа;
- _telephone: string - номер телефона заказчика;
- _email: string - адрес электронной почты заказчика;
- _total: number - общая стоимость заказа;
- _items: string[] - перечень заказанных продуктов;

а также методы: 
- getOrderInfo (): IOrder - возвращение всей информации о заказе;
- set paymentType(type: PaymentMethod) - запись способа оплаты
- set email(value: string): void - запись email покупателя
- set phone(value: string): void - запись номера телефона покупателя
- set address(value: string): void - запись адреса покупателя
- set total(value: number): void - запись общей суммы покупок
- set items(value: string[]) - запись id товаров заказа

#### Класс OrderDataBuilder
Позволяет выполнять формирование экзмепляра класса `OrderData` поэтапно (добавление товаров, выбор способа покупки и указание класса доставки, указание е-мейл и телефона). 

Конструктор класса принимает параметры: `events: IEvents` - объект класса `EventEmitter` для инициации событий при изменении данных и orderConstructor: IOrderConstructor - класс, создающий объекты интерфейса IOrderData.

В классе хранятся следующие данные:\
- protected order: IOrder;
- events: IEvents;

Методы, геттеры и сеттеры:

- set purchasesInfo: TOrderInfo - запись информации с корзины 
- set deliveryInfo: TOrderOrder - запись информации с формы доставки (2 этап)
- set contactsInfo: TOrderContacts - запись информации с формы контактной информации (3 этап)
- getOrderData(): IOrder - возвращение готового результата.



#### Класс SuccessData
Класс отвечает за данные, получаемые с сервера после успешного оформления заказа

Конструктор класса принимает следующие параметры: параметры класса `AppData`.

В классе хранятся следующие поля:
- protected _orderSuccess: TSuccessData - данные об успешном заказе, поступающие с сервера.

Методы, геттеры и сеттеры:
- set orderSuccess (value: TSuccessData): void - запись данных оформленного заказа, поступающие с сервера.


### Слой отображения на сайте (View)

#### Класс View
Абстрактный класс View служит шаблоном для классов слоя представления

Принимает в конструктор параметры `container: HTMLElement` и `evenits:IEvents`

В классе хранятся следующие поля:

protected _container: HTMLElement - DOM элемент, передаваемый в конструкторе
protected events: IEvents - объект класса `EventEmitter` для инициации событий при изменении данных.

Методы, геттеры и сеттеры:

render(data?: Partial<T>): HTMLElement - возвращает отрисованный html элемент по переданным данным

##### Класс ViewPage
Расширяет класс `View`, служит шаблоном для представления страницы.

Принимает в конструктор параметры `container: HTMLElement` и `evenits:IEvents.

В классе хранятся следующие поля:

  - protected _gallery: HTMLElement;              - галерея/каталог, контейнер для отрендереных карточек товаров на стартовой странице 
  - protected buttonBasket: HTMLButtonElement;    - кнопка корзины
  - protected _counter: HTMLSpanElement;          - спан счетчика товаров в корзине
  - protected screen: HTMLDivElement;             - DOM элемент (div), оборачивающий содержание страницы

##### Класс ViewCard
Расширяет класс `View`, служит шаблоном для всех карточек слоя представления.
Принимает в конструктор параметры родителя `container: HTMLElement` и `evenits:IEvents`.

В классе содержатся следующие поля:
-  protected _id: string;                     - уникальный id карточки для ее идентификации 
-  protected _name: HTMLHeadingElement;       - DOM элемент (заголовок) названия товара в карточке
-  protected _price: HTMLSpanElement;         - спан цены товара в карточке

Методы, геттеры и сеттеры:
геттеры и сетеры полей интерфейса IViewCard:
- set id  -   устанавливает значение id 
- get id  -   получает значение id
- set name  -   устанавливает значение name
- get name  -   получает значение name
- set price -   устанавливает значение price 
- get price -   получает значение price

###### Класс ViewCardCatalogue
Расширяет класс `ViewCard`, служит шаблоном для всех карточек слоя представления.
Принимает в конструктор параметры родителя `container: HTMLElement` и `events:IEvents`.

В классе содержатся следующие поля:
- protected _image: HTMLImageElement;       - DOM элемент (img) изображения в карточке
- protected _category: HTMLSpanElement;     - спан названия категории


Методы, геттеры и сеттеры:
геттеры и сетеры полей интерфейса IViewCardCatalogue:
- set image  -   устанавливает изображение товара (ссылку и альт-текст)
- get image  -   получает ссылку изображения товара
- set category  -  устанавливает название категории и доп класс в зависимости от названия
- get category - получает название категории (текстКОнтент)
- addClassToCategory(value: string) - добавляет спану категории доп класс в зависимости от ее текстКонтента

###### Класс ViewCardPreview
Расширяет класс `ViewCard`, служит шаблоном для карточки в формате Preview (представление одной карточки на странице).
Принимает в конструктор параметры родителя `container: HTMLElement` и `events:IEvents`.

В классе содержатся следующие поля:
- protected _description: HTMLParagraphElement;       - DOM элемент (р) описания товара
- protected buttonBuy: HTMLButtonElement;             - DOM элемент кнопки "добавить в корзину" 


Методы, геттеры и сеттеры:

  - set description - устанавливает текст описания товара;
  - get description - возвращает текст описания товара;
  - setButtonBuy(value: string) - устанавливает текст кнопки

##### Класс ViewForm
Расширяет класс `View`, служит шаблоном для всех форм слоя представления.

Принимает в конструктор параметры родителя `container: HTMLElement` и `events:IEvents`.

В классе содержатся следующие поля:

- protected container: HTMLFormElement; - DOM элемент формы
- protected inputs: HTMLInputElement[]; - все поля ввода формы
- protected submitButton: HTMLButtonElement; - кнопка сабмита формы
- protected errorSpan: HTMLElement; - спан с текстом ошибки

Методы, геттеры и сеттеры:
- changeInput(inputName: string, inputValue: string) - функция изменения данных ввода с эмитом брокера события input:change
- clear() - функция очистки формы
- render(data: Partial<TViewForm> & TViewForm ) - рендер формы в разметку
- set valid - активация/блокировка кнопки сабмита при валидности/невалидности кнопки 
- get valid - проверка валидности формы (валидна/невалидна)
- set errorMessage(value: string[]) - установка сообщения об ошибке

###### Класс ViewFormOrder

Расширяет класс `ViewForm`, определяет форму ввода информации о заказе.
Принимает в конструктор параметры родителя `container: HTMLElement` и `evenits:IEvents`.

В классе содержатся следующие поля:
- protected buttonsContainer: HTMLElement; - DOM-элемент контейнера с кнопками
- protected buttonOnline: HTMLButtonElement; - DOM-элемент кнопки оплаты онлайн   
- protected buttonOnDelivery: HTMLButtonElement; - DOM-элемент кнопки оплаты по получении
- protected addressInput: HTMLInputElement; - DOM-элемент поля ввода адреса

Методы, геттеры и сеттеры:
- protected getButtonActive(): HTMLButtonElement | null - возвращает кнопку, которая активна
- set paymentMethod - устанавливает метод оплаты (card/cash);
- set address - устанавливает адрес из данных, введенных в поле ввода адреса

###### Класс ViewFormContacts

Расширяет класс `ViewForm`, определяет форму ввода контактных данных заказчика.
Принимает в конструктор параметры родителя `container: HTMLElement` и `evenits:IEvents`.

В классе содержатся следующие поля:
- protected emailInput: HTMLInputElement;
- protected telephoneInput: HTMLInputElement;

Методы, геттеры и сеттеры:
- get email() - устанавливает эмейл из данных, введенных в поле ввода эмейла
- get telephone() - устанавливает номе телефона из данных, введенных в поле ввода номера телефона



#### Класс ModalView 
Расширяет класс `View`, отвечает за работу универсального модального окна, внутри которого будет выводиться контент, созданный дополнительно. 
Конструктор: constructor (container: HTMLElement, content: HTMLElement, _events:IEvent) - принимает в качестве параметров контейнер из разметки, элемент разметки, который будет составлять содержание (контент) модельного окна и событие брокера

Поля класса: 
- поля класса `View`
- _content: HTMLElement - содержание модального окна;
- closeButton: HTMLButtonElement - кнопка закрытия модального окна;
- submitButton: HTMLButtonElement - кнопка сабмита модального окна;

Методы класса:
- open(): void - открывает модальное окно;
- close(): void - закрывает модальное окно;
- submitModal(): void - передает данные из модального окна при наступлении действия;
- handleSubmit(): void - функция, привязанная к event'y
- render(data: <T>): HTMLElement - возвращает HTMLElement модального окна, заполненного контентом


#### Класс CardView

Расширяет класс View. Является абстрактным классом, имеющий 
Расширяет класс `View`. Универсальный класс карточки, в котором задаются общие поля у трех разновидностей карточек в приложении: карточка в каталоге на главной странице (CardCatalogView), карточка подробного описания товара в модальном окне (CardPreviewView) и карточка товара в корзине (CardBasketView), на основании данных с интерфейсом ICard.
В конструктор передается темплейт и инстанс класса `EventEmitter`.\
Методы:
- render(data: ICard): HTMLElement - возвращает заполненный элемент на базе темплейта и данных карточки в зависимости от имеющихся в темплейте полей;\
а также набор сеттеров и геттеров для получения свойств класса. 


#### Класс OrderView
Отвечает за отображение формы заказа, которая создается на основании заданного в разметке темплейта.
Принимает в конструктор темплейт из разметки, инстанс класса `EventEmitter`.\
- protected container: HTMLFormElement - соответствующая форма
- protected inputsList: HTMLInputElement[] - массив input элементов формы
- protected submitButton: HTMLButtonElement - кнопка отправки формы
- protected _errorMessage: HTMLSpanElement - html элемент для отображения ошибок формы.


Метод класса:
- get valid(): boolean - получения статуса валидности формы
- set valid(value: boolean):void - запись для блокировки (true) / разблокировки (false) кнопки submit
- set errorMessage(value: string) - установка текста ошибок
- clear():void - очистка формы
- render(data: ): HTMLElement - возвращает HTMLElement формы заказа, заполненной контентом

### Слой коммуникации

#### Класс AppApi

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
- `card:select` - выбор карточки из массива главного окна для просмотра в модальном окне детального просмотра;
- `card:delete` - удаление карточки продукта из массива карточек, добавленных в корзину;
- `cardPreview:open` - открытие модального окна детального просмотра продукта;
- `cardPreview:addToBasket` - добавление продукта в корзину:
- `cardPreview:close` - закрытие модального окна детального просмотра продукта;
- `basket:open` - открытие модального окна с массивом карточек, добавленных в корзину;
- `basket:close` - закрытие модального окна с массивом карточек, добавленных в корзину;
- `basket:addToOrder` - передача массива объектов продуктов в информацию о заказе;
- `order:open` - открытие модальной карточки с оформлением заказа;
- `order:changed` - добавление данных в поля формы оформления заказа;
- `order:submit` - передача данных в следующую форму;
- `order:close` - закрытие модальной карточки;
- `order:validation` - валидация формы при вводе данных;
- `contacts:open` - открытие модальной карточки с оформлением заказа;
- `contacts:change` - добавление данных в поля формы оформления заказа;
- `contacts:submit` - передача данных о заказе;
- `contacts:validation` - валидация формы при вводе данных;
- `contacts:close` - закрытие модальной карточки;
- `success:open` - открытие модального окна с успешным заказом;
- `success:close`- закрытие модального окна с успешным заказом;
- `success:submit` - передача данных об успешном заказе;



