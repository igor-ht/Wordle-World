import { MouseEventHandler, MutableRefObject, createContext } from 'react';
import { PlayStateType, GameSettingsType, GameStateType } from '../state/reducers';

export type GameApiContextType = {
	playState: PlayStateType;
	startNewGame: () => Promise<void>;
	gameSettings: MutableRefObject<GameSettingsType>;
	gameState: GameStateType;
	currentInputElement: MutableRefObject<HTMLInputElement | null>;
	keyboardContainerElement: MutableRefObject<HTMLDivElement | null>;
	handleKeyPressedFromDigitalKeyboard: MouseEventHandler<HTMLButtonElement>;
};

const GameContext = createContext<GameApiContextType | null>(null);

export default GameContext;
