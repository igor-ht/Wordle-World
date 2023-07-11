import { useReducer } from 'react';

type genericActionType = {
	type: 'setValue' | 'resetValue';
	payload: any;
};
type genericReducer = {
	(state: any, action: genericActionType): any;
};

export const localStorageReducer: genericReducer = (storedValue, action) => {
	switch (action.type) {
		case 'setValue':
			return { ...action.payload };
		case 'resetValue':
			return {};
		default:
			return { ...storedValue };
	}
};

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void, () => void] {
	let currentInitialValue;
	if (typeof window !== 'undefined')
		currentInitialValue = localStorage?.getItem(key) ? JSON.parse(localStorage.getItem(key)!) : initialValue;
	const [storedValue, dispatchStoredValue] = useReducer(localStorageReducer, currentInitialValue ? currentInitialValue : initialValue);

	const setValue = (value: T) => {
		dispatchStoredValue({ type: 'setValue', payload: value });
		if (typeof window !== 'undefined') window.localStorage.setItem(key, JSON.stringify(value));
	};

	const removeValue = () => {
		dispatchStoredValue({ type: 'resetValue', payload: initialValue });
		if (typeof window !== 'undefined') window.localStorage.removeItem(key);
	};
	return [storedValue, setValue, removeValue];
}
