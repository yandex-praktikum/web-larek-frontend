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
- src/styles/styles.scss — корневой файл стилей
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

## Интерфейсы

## IManagement
Интерфейс описывающий управление приложением
- catalog: IProduct[] - каталог товаров
- order: IOrder|null - заказ
- basket: IProduct[] - корзина
- addToBasket(product: IProduct): void - добавляем товар в корзину
- removeFromBasket(product: IProduct): void - удаляем товар из корзины
- setCatalog(items: IProduct[]): void - устанавливаем каталог товаров
- getTotalBasketPrice(): number - метод возвращает общую стоимость товаров в корзине

## IProduct
Интерфейс описывающий поля карточки товара
- itemId: string - айди товара
- image: string - URL адрес карточки товара
- itemTitle: string - названия товара
- itemDescription: string - описание товара
- itemPrice: number|null - стоимость товара
- category: string - категория товара
- selected: boolean - выбор товара

## IOrder
Интерфейс описывающий информацию о заказе
- items: string[] - массив товаров в заказе
- totalCost: number - суммарная стоимость
- payment: string - способ оплаты
- address: string - адрес
- email: string - Email
- phone: string - номер телефона

## IBasket
Интерфейс описывающий корзину товаров
- list: HTMLElement[] - массив товаров в корзине
- totalCost: number - суммарная стоимость

## IProductBasket
Интерфейс описывает товар в списке корзины
- index: number - порядковый номер товара

## Ipage
Интерфейс описывающий страницу
- basketCount: number - количество товаров в корзине
- catalog: HTMLElement[] - массив карточек с товарами

## IModal
Интерфейс описывающий содержимое модельного окна
- content: HTMLElement - DOM элемент модального окна

## IResultPurchase
Интерфейс описывающий ответ успешной покупки
- orderId: number - айди заказа
- totalCost: number - суммарная стоимость

## IFormContact
Интерфейс описывает окно ввода контактных данных
- phone: string - номер телефона
- email: string - Email

## IFormOrder
Интерфейс описывающий форму оплаты
- payment: string - способ оплаты
- address: string - адрес доставки

## IValidateFormOrder
Интерфейс используется для валидации полей при заполнении модели заказа
- phone: string - номер телефона
- email: string - Email
- address: string - адрес доставки
- payment: string - спопоб оплаты

## IFormSuccess
Интерфейс описывает форму успешного заказа
- totalDebited: number - сумма списанных средств 