'use client';

import './inputContainer.scss';
import { MutableRefObject } from 'react';
import { gameSettingsType } from '@/utils/play/reducers';
import { useBadGuess } from '@/utils/play/useBadGuess';
import NotValidGuess from '../NotValidGuess/NotValidGuess';

export interface InputContainerInterface {
	gameSettings: gameSettingsType;
	currentInputElement: MutableRefObject<HTMLInputElement | null>;
}

export default function InputContainer({ gameSettings, currentInputElement }: InputContainerInterface) {
	const { badGuess, handleAnimation } = useBadGuess();

	return (
		<div className="input-container">
			{badGuess === 'short' && <NotValidGuess text="Guess is too short" />}
			{badGuess === 'notfound' && <NotValidGuess text="Guess not found" />}
			{Array.from(Array(gameSettings.totalChances).keys(), (x) => x + 1).map((elA, indexA) => {
				return (
					<span
						key={elA}
						id={'' + elA}
						onAnimationStart={(event) => handleAnimation(event)}>
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
