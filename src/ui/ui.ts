import { ensureElement } from '../utils/utils';

export const uiTemplates = {
	successTemplate: ensureElement<HTMLTemplateElement>('#success'),
	cardCatalogTemplate: ensureElement<HTMLTemplateElement>('#card-catalog'),
	cardPreviewTemplate: ensureElement<HTMLTemplateElement>('#card-preview'),
	cardBasketTemplate: ensureElement<HTMLTemplateElement>('#card-basket'),
	basketTemplate: ensureElement<HTMLTemplateElement>('#basket'),
	orderTemplate: ensureElement<HTMLTemplateElement>('#order'),
	contactsTemplate: ensureElement<HTMLTemplateElement>('#contacts'),
};

export type UITemplates = typeof uiTemplates;
