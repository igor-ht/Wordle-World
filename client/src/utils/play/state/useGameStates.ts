import { useReducer, useRef, useState } from 'react';
import { gameStateReducer, GameSettingsType, PlayStateType } from './reducers';

export const useGameStates = () => {
	const gameSettings = useRef<GameSettingsType>({ language: 'EN', wordLength: 5, totalChances: 6 });
	const [playState, setPlayState] = useState<PlayStateType>('start');
	const [gameState, gameStateDispatch] = useReducer(gameStateReducer, { word: '', currentGuess: '', guessNumber: 1 });

	const setNewGame = (word: string) => {
		gameStateDispatch({ type: 'resetState' });
		gameStateDispatch({ type: 'setRandomWord', payload: word });
		setPlayState('play');
	};

	const setGameCurrentGuess = (str: string) => {
		gameStateDispatch({ type: 'setCurrentGuess', payload: str });
	};

	const setNewGuess = () => {
		gameStateDispatch({ type: 'setGuessNumber', payload: gameState.guessNumber + 1 });
		gameStateDispatch({ type: 'setCurrentGuess', payload: '' });
	};

	return { gameSettings, playState, gameState, setPlayState, setNewGame, setGameCurrentGuess, setNewGuess };
};
