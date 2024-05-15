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
export interface IProduct {
  category: string,
  _id: number,
  name: string,
  description: string,
  picture: string,
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
  items: IProduct[]
}
```

Интерфейс для модели данных карточек
```
export interface IProductsData {
  products: IProduct[],
  preview: string | null
}
```

Данные карточки, которые выводятся на главной странице
```
export type TProductInfo = Pick<IProduct, 'category' | 'name' | 'picture' | 'price'>
```

Данные карточки, которые выводятся в отдельном поле
```
export type TProductDetails = Pick<IProduct, 'category' | 'name' | 'description' | 'pic
```

Данные карточки, которые выводятся в корзине
```
export type TCart = Pick<IProduct, 'name' | 'price'>;
```

Данные заказа, которые выводятся в первом модальном окне оформления заказа
```
export type TOrderStepOne = Pick<IOrder, 'paymentType' | 'address'>;
```

Данные заказа, которые выводятся во втором модальном окне оформления заказа
```
export type TOrderStepTwo = Pick<IOrder, 'email' | 'telephone'>;
```

Данные заказа, которые выводятся в модальном окне успешно завершенного заказа
```
export type TOrderSuccess = Pick<IOrder, 'total'>;
```
## Архитектура проекта

Код проекта написан в парадигме MVP и разделен на следующие слои: 
- слой View (представление): отображение данных на странице;
- слой Data (данные): хранение и изменение данных;
- Presenter (презентер): связя данных и представления

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
- `trigger`: устанавливает триггер, который инициирует событие

### Слой данных

#### Класс ProductData

отвечает за хранение и логику работы данных карточек с продуктами. 

Конструктор класса принимает инстант брокера событий.
В классе хранятся следующие данные:
-  массив карточек продуктов: _products: IProduct[]
- id карточки выбранной для детального просмотра: _preview: string | null
- экземпляр класса `EventEmitter` для инициирования событий при изменении данных: events: IEvent

Также класс имеет определенные методы для взаимодействия с данными:
- addProduct(product: IProduct): void - добавление продукта (в корзину);
- deleteProduct(productId: string): void - удаление продукта (из корзины);
- getProduct(productId: string): IProduct - возвращение карточки продукта по его id;
а также набор геттеров и сеттеров для сохранения и возвращения свойств класса.



