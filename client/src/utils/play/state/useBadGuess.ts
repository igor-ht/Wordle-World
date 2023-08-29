import { AnimationEvent, useState } from 'react';
import { awaitFunction } from '@/utils/general/await';

export const useBadGuess = () => {
	const [badGuess, setBadGuess] = useState<'short' | 'notfound' | null>(null);

	const handleAnimation = async (event: AnimationEvent<HTMLSpanElement>) => {
		const currentTarget = event.currentTarget;
		switch (event.animationName) {
			case 'ShortGuess':
				setBadGuess('short');
				awaitFunction(1000, () => {
					setBadGuess(null);
					currentTarget.classList.remove('short-guess');
				});
				break;
			case 'NotFoundGuess':
				setBadGuess('notfound');
				awaitFunction(1000, () => {
					setBadGuess(null);
					currentTarget.classList.remove('notfound-guess');
					currentTarget.classList.remove('pop');
				});
				break;
		}
	};

	return { badGuess, handleAnimation };
};
