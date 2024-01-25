import './keyboardContainer.scss';
import GameContext, { GameApiContextType } from '@/utils/play/context/context';
import { useContext } from 'react';

const KEYBOARD = [
	['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
	['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

export default function KeyboardContainer() {
	const { keyboardContainerElement, handleKeyPressedFromDigitalKeyboard } = useContext(GameContext) as GameApiContextType;

	return (
		<div
			ref={keyboardContainerElement}
			className="keyboard-container">
			{KEYBOARD.map((row, index) => (
				<div
					className="container-row"
					key={index}>
					{row.map((letter, index) => (
						<button
							type="button"
							id={letter}
							key={index}
							className={`btn-digital-keyboard ${(letter === 'Enter' || letter === '⌫') && 'enter-backspace'}`}
							autoFocus={false}
							onFocus={(event) => event.currentTarget.blur()}
							onClick={handleKeyPressedFromDigitalKeyboard}>
							{letter}
						</button>
					))}
				</div>
			))}
		</div>
	);
}
