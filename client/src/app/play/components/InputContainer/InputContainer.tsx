'use client';

import './inputContainer.scss';
import { useState, AnimationEvent, MutableRefObject } from 'react';
import ShortGuessTooltip from '../NotValidGuess/ShortGuessTooltip';
import GuessNotFoundTooltip from '../NotValidGuess/GuessNotFoundTooltip';
import { gameSettingsType } from '@/src/utils/play/reducers';

export interface InputContainerInterface {
	gameSettings: gameSettingsType;
	currentInputElement: MutableRefObject<HTMLInputElement | null>;
}

export default function InputContainer({ gameSettings, currentInputElement }: InputContainerInterface) {
	const [shortGuess, setShortGuess] = useState(false);
	const [GuessNotfound, setGuessNotfound] = useState(false);

	const handleAnimation = async (event: AnimationEvent<HTMLSpanElement>) => {
		switch (event.animationName) {
			case 'ShortGuess':
				setShortGuess(true);
				setTimeout(() => {
					setShortGuess(false);
					currentInputElement.current!.parentElement!.classList.remove('short-guess');
				}, 1200);
				break;
			case 'NotFoundGuess':
				setGuessNotfound(true);
				setTimeout(() => {
					setGuessNotfound(false);
					currentInputElement.current!.parentElement!.classList.remove('notfound-guess');
					currentInputElement.current!.parentElement!.classList.remove('pop');
				}, 1200);
				break;
		}
	};

	return (
		<div className="input-container">
			{shortGuess ? <ShortGuessTooltip /> : <></>}
			{GuessNotfound ? <GuessNotFoundTooltip /> : <></>}
			{Array.from(Array(gameSettings.totalChances).keys(), (x) => x + 1).map((elA, indexA) => {
				return (
					<span
						key={elA}
						id={'' + elA}
						onAnimationStart={(event: AnimationEvent<HTMLSpanElement>) => handleAnimation(event)}>
						{Array.from(Array(gameSettings.wordLength).keys(), (x) => x + 1).map((num: number, indexB: number) => {
							return (
								<input
									type="text"
									ref={indexA === 0 && indexB === 0 ? currentInputElement : null}
									key={num + 5 * indexA + ''}
									id={num + 5 * indexA + ''}
									className={indexA === 0 && indexB === 0 ? 'current-input' : ''}
									minLength={1}
									maxLength={1}
									disabled
									required
								/>
							);
						})}
					</span>
				);
			})}
		</div>
	);
}
