import './inputContainer.scss';
import { MutableRefObject } from 'react';
import { GameSettingsType } from '@/utils/play/state/reducers';
import { useBadGuess } from '@/utils/play/state/useBadGuess';
import NotValidGuess from '../NotValidGuess/NotValidGuess';

export interface InputContainerInterface {
	gameSettings: MutableRefObject<GameSettingsType>;
	currentInputElement: MutableRefObject<HTMLInputElement | null>;
}

export default function InputContainer({ gameSettings, currentInputElement }: InputContainerInterface) {
	const { badGuess, handleAnimation } = useBadGuess();

	return (
		<div
			id="input-container"
			className="input-container">
			{badGuess === 'short' && <NotValidGuess text="Guess is too short" />}
			{badGuess === 'notfound' && <NotValidGuess text="Guess not found" />}
			{new Array(gameSettings.current.totalChances).fill(null).map((_, indexA) => {
				return (
					<span
						key={indexA}
						id={indexA + ''}
						onAnimationStart={(event) => handleAnimation(event)}>
						{new Array(gameSettings.current.wordLength).fill(null).map((_, indexB) => {
							return (
								<input
									type="text"
									ref={indexA === 0 && indexB === 0 ? currentInputElement : null}
									key={gameSettings.current.wordLength * indexA + indexB}
									// id starts from 1 to gameSettings.current.totalChances * gameSettings.wordLength
									id={gameSettings.current.wordLength * indexA + indexB + 1 + ''}
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
