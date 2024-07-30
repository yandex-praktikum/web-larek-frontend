import { Model } from './base/model';
import { IAppState, IProduct, IOrder, IValidateFormOrder, IFormErrors } from '../types/index';

export class AppState extends Model<IAppState> {
	catalog: IProduct[] = [];
	basket: IProduct[] = [];
	order: IOrder = {
		payment: '',
		address: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	};
	formErrors: IFormErrors = {};
    
	setCatalog(items: IProduct[]) {
		this.catalog = items;
		this.emitChanges('catalog:changed', { catalog: this.catalog });
	}

    inBasket(id: string) {
        return !!this.basket.find((item) => item.id === id);
    }

	addToBasket(item: IProduct) {
		this.basket.push(item);
	}

	removeFromBasket(item: IProduct) {
		this.basket = this.basket.filter(basketItem => basketItem !== item);
	}

  getCountBasket() {
		return this.basket.length;
	}

	getTotalBasket() {
		let total: number = 0;
		this.basket.forEach((item) => {
			total = total + item.price;
		});
		return total;
	}

    clearBasket() {
		this.basket.forEach((item) => {
			item.inBasket = false;
		});
		this.basket = [];
	}
    
	setOrderFields(field: keyof IValidateFormOrder, value: string) {
		this.order[field] = value;

		if (!this.validateOrder()) {
			return;
		}

		if (!this.validateContact()) {
			return;
		}
	}

	validateOrder(): boolean {
		const errors: typeof this.formErrors = {};

		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}

		if (!this.order.payment) {
			errors.payment = 'Необходимо выбрать способ оплаты';
		}

		this.formErrors = errors;
		this.events.emit('orderFormErrors:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}
    
	validateContact(): boolean {
		const errors: typeof this.formErrors = {};

		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}

		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		this.formErrors = errors;
		this.events.emit('contactsFormErrors:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}

	clearOrder() {
		this.order.payment = '';
		this.order.address = '';
		this.order.email = '';
		this.order.phone = '';
		this.order.total = 0;
		this.order.items = [];
	}
}