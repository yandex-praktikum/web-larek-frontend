import { Component } from '../ui/Component';
import { uiTemplates } from '../ui/ui';
import { ensureElement } from '../utils/utils';

export abstract class PageView<T> extends Component<T> {
	protected templates: typeof uiTemplates;

	constructor() {
		super(ensureElement(document.body));
		this.templates = uiTemplates;
	}
}
