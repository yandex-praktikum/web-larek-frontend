import { Component } from '../ui/Component';
import { cloneTemplate, ensureElement } from '../utils/utils';

export type AvailableContainer =
	| keyof typeof AppComponent.templates
	| keyof typeof AppComponent.predefinedElements;

export abstract class AppComponent<T> extends Component<T> {
	static templates = {
		successTemplate: ensureElement<HTMLTemplateElement>('#success'),
		cardCatalogTemplate: ensureElement<HTMLTemplateElement>('#card-catalog'),
		cardPreviewTemplate: ensureElement<HTMLTemplateElement>('#card-preview'),
		cardBasketTemplate: ensureElement<HTMLTemplateElement>('#card-basket'),
		basketTemplate: ensureElement<HTMLTemplateElement>('#basket'),
		orderTemplate: ensureElement<HTMLTemplateElement>('#order'),
		contactsTemplate: ensureElement<HTMLTemplateElement>('#contacts'),
	};

	static predefinedElements = {
		modalContainer: ensureElement('#modal-container'),
	};

	constructor(element: AvailableContainer | HTMLElement) {
		if (element instanceof HTMLElement) {
			super(element);
		} else {
			switch (element) {
				case 'modalContainer':
					super(AppComponent.predefinedElements.modalContainer);
					break;
				default:
					super(cloneTemplate(AppComponent.templates[element]));
			}
		}
	}
}
