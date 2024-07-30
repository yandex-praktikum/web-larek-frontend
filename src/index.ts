import './scss/styles.scss';

import { API_URL, CDN_URL } from './utils/constants';
import { ensureElement, cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { Page } from './components/Page';
import { Modal } from './components/modal';
import { AppState } from './components/AppState';
import { StoreAPI } from './components/StoreAPI';
import { Card } from './components/Card';
import { IProduct, IFormOrder, IFormContact, IValidateFormOrder} from './types';
import { Basket } from './components/Basket';
import { OrderForm } from './components/OrderForm';
import { ContactsForm } from './components/ContactsForm';
import { Success } from './components/Success';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const orderFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const api = new StoreAPI(CDN_URL, API_URL);
const events = new EventEmitter();

const appData = new AppState({}, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const page = new Page(document.body, events);

const basket = new Basket('basket', cloneTemplate(basketTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsFormTemplate), events);
const orderForm = new OrderForm('order', cloneTemplate(orderFormTemplate), events);
const success = new Success('order-success', cloneTemplate(successTemplate), {onClick: () => modal.close()});

api
	.getProducts()
	.then(appData.setCatalog.bind(appData))
	.catch(err => {
        console.error(err);
    });

events.on('catalog:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new Card('card', cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});

		return card.render({
			category: item.category,
			title: item.title,
			image: item.image,
			price: item.price,
		});
	});
});

events.on('card:select', (item: IProduct) => {
	const card = new Card('card', cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (item.inBasket){
				events.emit('basket:remove', item);
			}else{
				events.emit('basket:add', item);
			}
			card.updateButton(item.inBasket);
			modal.close();
		},
	});

	return modal.render({
		content: card.render({
			category: item.category,
			title: item.title,
			image: item.image,
			price: item.price,
			description: item.description,
			inBasket: item.inBasket,
		}),
	});
});

events.on('basket:add', (item: IProduct) => {
	appData.addToBasket(item);
	item.inBasket = true;
	basket.total = appData.getTotalBasket();
	page.counter = appData.getCountBasket();
});

events.on('basket:remove', (item: IProduct) => {
	appData.removeFromBasket(item);
	item.inBasket = false;
	basket.total = appData.getTotalBasket();
	page.counter = appData.getCountBasket();
	basket.items = appData.basket.map((item, index) => {
		const card = new Card('card', cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				events.emit('basket:remove', item);
			},
		});

		return card.render({
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});

	return modal.render({
		content: basket.render({
			total: appData.getTotalBasket(),
		}),
	});
});

events.on('basket:open', () => {
	basket.items = appData.basket.map((item, index) => {
		const card = new Card('card', cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				events.emit('basket:remove', item);
			},
		});

		return card.render({
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});

	return modal.render({
		content: basket.render({
			total: appData.getTotalBasket(),
		}),
	});
});

events.on('modal:close', () => {
  page.locked = false;
});

events.on('modal:open', () => {
    page.locked = true;
});

events.on('order:open', () => {
	modal.render({
		content: orderForm.render({
			address: '',
			payment: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on(
	'orderInput:change',
	(data: {field: keyof IValidateFormOrder; value: string}) => {
		appData.setOrderFields(data.field, data.value);
	}
);

events.on('orderFormErrors:change', (errors: Partial<IFormOrder>) => {
	const { payment, address } = errors;
	orderForm.valid = !payment && !address;
	orderForm.errors = Object.values({payment, address}).filter((i) => !!i).join('; ');
});

events.on('order:submit', () => {
	appData.order.total = appData.getTotalBasket();
	appData.order.items = appData.basket.map((item) => item.id);

	modal.render({
		content: contactsForm.render({
			valid: false,
			errors: [],
		}),
	});
});

events.on('contactsFormErrors:change', (errors: Partial<IFormContact>) => {
	const { email, phone } = errors;
	contactsForm.valid = !email && !phone;
	contactsForm.errors = Object.values({phone, email}).filter((i) => !!i).join('; ');
});

events.on('contacts:submit', () => {
	api
		.sendOrder(appData.order)
		.then(() => {
			modal.render({
				content: success.render({
					total: appData.getTotalBasket(),
				}),
			});

			appData.clearBasket();
			appData.clearOrder();
			orderForm.clearButtons();
			page.counter = 0;
		})
		.catch(err => {
			console.error(err);
		});
});