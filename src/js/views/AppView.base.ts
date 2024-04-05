import { cloneTemplate, ensureElement } from '../utils/utils';
import { IAppView } from '../types';
import { Component } from '../ui/Component';

export type AvailableContainer =
	| keyof typeof AppView.templates
	| keyof typeof AppView.predefinedElements;

export abstract class AppView<T>
	extends Component<T>
	implements IAppView<T, HTMLElement>
{
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
					super(AppView.predefinedElements.modalContainer);
					break;
				default:
					super(cloneTemplate(AppView.templates[element]));
			}
		}
	}
}
