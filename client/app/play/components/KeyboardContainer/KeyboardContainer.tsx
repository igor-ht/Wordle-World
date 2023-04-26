'use client';

import { MouseEventHandler, MutableRefObject } from 'react';
import './keyboardContainer.scss';

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
			<div className="container-row">
				{KEYBOARD[0].map((letter, index) => (
					<button
						key={index}
						name={letter}
						onClick={handleKeyPressedFromDigitalKeyboard}>
						{letter}
					</button>
				))}
			</div>

			<div className="container-row">
				{KEYBOARD[1].map((letter, index) => (
					<button
						key={index}
						name={letter}
						onClick={handleKeyPressedFromDigitalKeyboard}>
						{letter}
					</button>
				))}
			</div>

			<div className="container-row">
				{KEYBOARD[2].map((letter, index) => (
					<button
						key={index}
						name={letter}
						className={letter === 'Enter' ? 'enter' : letter === '⌫' ? 'backspace' : ''}
						onClick={handleKeyPressedFromDigitalKeyboard}>
						{letter}
					</button>
				))}
			</div>
		</div>
	);
}
