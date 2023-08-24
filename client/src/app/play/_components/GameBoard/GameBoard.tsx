import { GameSettingsType } from '@/utils/play/state/reducers';
import InputContainer from './InputContainer/InputContainer';
import KeyboardContainer from './KeyboardContainer/KeyboardContainer';
import { MutableRefObject, MouseEventHandler } from 'react';

type GameBoardPropsType = {
	gameSettings: MutableRefObject<GameSettingsType>;
	currentInputElement: MutableRefObject<HTMLInputElement | null>;
	keyboardContainerElement: MutableRefObject<HTMLDivElement | null>;
	handleKeyPressedFromDigitalKeyboard: MouseEventHandler<HTMLButtonElement>;
};

export default function GameBoard({
	gameSettings,
	currentInputElement,
	keyboardContainerElement,
	handleKeyPressedFromDigitalKeyboard,
}: GameBoardPropsType) {
	return (
		<>
			<InputContainer
				gameSettings={gameSettings}
				currentInputElement={currentInputElement}
			/>
			<KeyboardContainer
				keyboardContainerElement={keyboardContainerElement}
				handleKeyPressedFromDigitalKeyboard={handleKeyPressedFromDigitalKeyboard}
			/>
		</>
	);
}
