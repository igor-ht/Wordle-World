'use client';

import './keyboardContainer.scss';
import { MouseEventHandler, MutableRefObject } from 'react';

const KEYBOARD = [
	['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
	['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

export interface KeyboardContainerInterface {
	handleKeyPressedFromDigitalKeyboard: MouseEventHandler<HTMLButtonElement>;
	keyboardContainerElement: MutableRefObject<HTMLDivElement | null>;
}

export default function KeyboardContainer({ handleKeyPressedFromDigitalKeyboard, keyboardContainerElement }: KeyboardContainerInterface) {
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
							key={index}
							name={letter}
							className={`btn-digital-keyboard ${(letter === 'Enter' || letter === '⌫') && 'enter-backspace'}`}
							onClick={handleKeyPressedFromDigitalKeyboard}>
							{letter}
						</button>
					))}
				</div>
			))}
		</div>
	);
}
