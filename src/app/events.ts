// Хорошая практика даже простые типы выносить в алиасы

// Зато когда захотите поменять это достаточно сделать в одном месте
type EventName = '*' | RegExp;
// eslint-disable-next-line @typescript-eslint/ban-types
type Subscriber = Function;
type EmitterEvent = {
	eventName: string;
	data: unknown;
};

export interface IEvents<E> {
	on<T>(eventName: E, callback: (data: T) => void): void;
	emit<T>(eventName: E, data?: T): void;
}

/**
 *
 *
 * @export
 * @class EventEmitter
 * @implements {IEvents<E>}
 * @template E - тип имени события
 * 
 * Брокер событий, классическая реализация
 * В расширенных вариантах есть возможность подписаться на все события
 * или слушать события по шаблону например
*/
export class EventEmitter<E extends string | EventName> implements IEvents<E> {
	_events: Map<E | EventName, Set<Subscriber>>;

	constructor() {
		this._events = new Map<E | EventName, Set<Subscriber>>();
	}

	/**
	 * Установить обработчик на событие
	 */
	on<T>(eventName: E, callback: (event: T) => void) {
		if (!this._events.has(eventName)) {
			this._events.set(eventName, new Set<Subscriber>());
		}
		this._events.get(eventName)?.add(callback);
	}

	/**
	 * Снять обработчик с события
	 */
	off(eventName: E, callback: Subscriber) {
		if (this._events.has(eventName)) {
			this._events.get(eventName)!.delete(callback);
			if (this._events.get(eventName)?.size === 0) {
				this._events.delete(eventName);
			}
		}
	}

	/**
	 * Инициировать событие с данными
	 */
	emit<T>(eventName: Exclude<E, RegExp>, data?: T) {
		this._events.forEach((subscribers, name) => {
			// чтобы вернуть начальный вариант, нужно удалить блок
			// со сравнением с '*'
			if (name === '*') {
				subscribers.forEach((callback) => callback({ eventName, data }));
				return;
			}
			if (
				(name instanceof RegExp && name.test(eventName)) ||
				name === eventName
			) {
				subscribers.forEach((callback) => callback(data));
			}
		});
	}

	/**
	 * Слушать все события
	 */
	onAll(callback: (event: EmitterEvent) => void) {
		this.on('*' as E, callback);
	}

	/**
	 * Сбросить все обработчики
	 */
	offAll() {
		this._events = new Map<E, Set<Subscriber>>();
	}
}
