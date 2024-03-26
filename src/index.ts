import { AppApi } from './components/appApi';
import { EventEmitter } from './components/base/events';
import { API_URL, CDN_URL } from './utils/constants';

import './scss/styles.scss';
import { Product } from './types';

type Model = {
	products: Product[];
};

const initModel: Model = {
	products: [],
};

class Dispatcher {
	private state: Model = initModel;
	static setState(value: Model) {
		// оповестить об изменении state
	}
}

const events = new EventEmitter();
const api = new AppApi(CDN_URL, API_URL);

events.on('app:load', (model: Model) => {
	api.getProducts().then((products) => {});
});

events.emit('app:load');
