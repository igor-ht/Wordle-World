import { useReducer } from 'react';
import { playStateReducer, gameStateReducer, gameSettingsReducer, PlayStateType } from './reducers';

export const useGameStates = () => {
	const [gameSettings, gameSettingsDispatch] = useReducer(gameSettingsReducer, { language: 'en', wordLength: 5, totalChances: 6 });
	const [playState, playStateDispatch] = useReducer(playStateReducer, 'start');
	const [gameState, gameStateDispatch] = useReducer(gameStateReducer, { word: '', currentGuess: '', guessNumber: 1 });

	const sePlayState = (state: PlayStateType) => {
		playStateDispatch({ type: 'setState', payload: state });
	};

	const setNewGame = (word: string) => {
		gameStateDispatch({ type: 'resetState' });
		gameStateDispatch({ type: 'setRandomWord', payload: word });
		sePlayState('play');
	};

	const setGameCurrentGuess = (str: string) => {
		gameStateDispatch({ type: 'setCurrentGuess', payload: str });
	};

	const setNewGuess = () => {
		gameStateDispatch({ type: 'setGuessNumber', payload: gameState.guessNumber + 1 });
		gameStateDispatch({ type: 'setCurrentGuess', payload: '' });
	};

	return { gameSettings, playState, gameState, sePlayState, setNewGame, setGameCurrentGuess, setNewGuess };
};
