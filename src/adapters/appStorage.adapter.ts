export class AppStorage<T> {
	constructor(appName: string) {
		this._keyPrefix = `${appName}/`;
	}

	private _keyPrefix: string;

	private generateItemKey(key: string) {
		return `${this._keyPrefix}${key}`;
	}

	getItem(key: string): T {
		return JSON.parse(localStorage.getItem(this.generateItemKey(key))) as T;
	}

	setItem(key: string, value: T): void {
		localStorage.setItem(this.generateItemKey(key), JSON.stringify(value));
	}

	clear(): void {
		const keysToRemove = Object.keys(localStorage).filter((key) =>
			key.startsWith(this._keyPrefix)
		);
		keysToRemove.forEach((key) => localStorage.removeItem(key));
	}
}
