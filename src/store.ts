export function createStore<S, A>(reducer: (state: S, action: A) => S) {
	type Handler = (action: A) => void;

	let state: S = undefined;
	const subscribers: Handler[] = [];

	return {
		dispatch: (action: A) => {
			state = reducer(state, action);
			subscribers.forEach((handler) => handler(action));
		},
		getState: () => state,
		subscribe: (handler: Handler) => {
			subscribers.push(handler);
			return () => {
				const index = subscribers.indexOf(handler);
				if (index > 0) {
					subscribers.splice(index, 1);
				}
			};
		},
		createAction: <T extends string, P>(type: T, payload?: P) => ({
			type,
			payload,
		}),
	};
}
