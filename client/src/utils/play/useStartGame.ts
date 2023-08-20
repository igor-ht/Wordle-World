import { MouseEventHandler, MutableRefObject, useEffect, useReducer, useRef } from 'react';
import { gameSettingsReducer, GameSettingsType, gameStateReducer, GameStateType, playStateReducer, PlayStateType } from './reducers';
import { handleInputCellChange, handleInputCellsUpdate, handleKeyboardUpdate, handleRowChange, resetGameComponents } from './domHandlers';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { GameSounds } from '@/utils/sounds';
import useWordHandlers from './useWordHandlers';
import useGuestHandlers from './useGuestHandlers';
import useUserHandlers from './useUserHandlers';
import { awaitFunction } from '../general/await';

export interface IGameApi {
	playState: PlayStateType;
	startNewGame: () => Promise<void>;
	gameSettings: GameSettingsType;
	gameState: GameStateType;
	currentInputElement: MutableRefObject<HTMLInputElement | null>;
	handleKeyPressedFromDigitalKeyboard: MouseEventHandler<HTMLButtonElement>;
	keyboardContainerElement: MutableRefObject<HTMLDivElement | null>;
	handleResetGame: () => Promise<void>;
}

let ASYNC_RUN = false;

const useStartGame: () => IGameApi = () => {
	const [playState, playStateDispatch] = useReducer(playStateReducer, 'start');
	const [gameSettings, gameSettingsDispatch] = useReducer(gameSettingsReducer, { language: 'en', wordLength: 5, totalChances: 6 });
	const [gameState, gameStateDispatch] = useReducer(gameStateReducer, { word: '', currentLetter: '', currentGuess: '', guessNumber: 1 });

	const currentInputElement = useRef<HTMLInputElement | null>(null);
	const keyboardContainerElement = useRef<HTMLDivElement | null>(null);

	const { data: session, status } = useSession();

	const wordHandlers = useWordHandlers(gameState);
	const userHandlers = useUserHandlers();
	const guestHandler = useGuestHandlers();

	const startNewGame = async () => {
		try {
			if (!session && status === 'unauthenticated') await handleGuestNewGame();
			await setRandomWord();
			if (playState !== 'play') playStateDispatch({ type: 'setPlay' });
		} catch (error) {
			if (error === 'Guest exceed daily games limit.') playStateDispatch({ type: 'setGuestLimit' });
			else playStateDispatch({ type: 'setStart' });
		}
	};

	const setRandomWord = async () => {
		try {
			const randomWord = (await wordHandlers.getRandomWord()).data;
			gameStateDispatch({ type: 'setRandomWord', payload: randomWord });
		} catch {
			throw 'Could not set secret word from server.';
		}
	};

	const handleKeyPressed = (event: KeyboardEvent) => {
		if (playState !== 'play' || ASYNC_RUN) return;
		ASYNC_RUN = true;
		if (event.key === 'Enter') return handleEnter();
		if (event.key === 'Backspace') return handleBackSpace();
		if (!/^[a-zA-Z]$/.test(event.key) || currentInputElement.current!.value.length > 0) return (ASYNC_RUN = false);
		GameSounds?.insertLetter?.play();
		handleGameStateUpdate(event.key.toUpperCase());

		currentInputElement.current = handleInputCellChange(currentInputElement.current, gameSettings.wordLength);

		gameStateDispatch({ type: 'setCurrentLetter', payload: '' });
		ASYNC_RUN = false;
	};

	const handleKeyPressedFromDigitalKeyboard = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (ASYNC_RUN) return;
		ASYNC_RUN = true;
		event.currentTarget.blur();
		if (event.currentTarget.id === 'Enter') return handleEnter();
		if (event.currentTarget.id === '⌫') return handleBackSpace();
		if (currentInputElement.current!.value.length > 0) return (ASYNC_RUN = false);
		GameSounds?.insertLetter?.play();
		handleGameStateUpdate(event.currentTarget.id);
		currentInputElement.current = handleInputCellChange(currentInputElement.current, gameSettings.wordLength);
		gameStateDispatch({ type: 'setCurrentLetter', payload: '' });
		ASYNC_RUN = false;
	};

	const handleBackSpace = () => {
		const currentInput = currentInputElement.current! as HTMLInputElement;
		if ((+currentInput.id - 1) % gameSettings.wordLength === 0) return (ASYNC_RUN = false);
		GameSounds?.insertLetter?.play();
		// check if input is the last in the row and is not empty
		if (+currentInput.id % gameSettings.wordLength === 0 && currentInput.value.length > 0) {
			currentInput.value = '';
			gameStateDispatch({ type: 'setCurrentGuess', payload: gameState.currentGuess.slice(0, -1) });
			gameStateDispatch({ type: 'setCurrentLetter', payload: '' });
			currentInput.classList.add('current-input');
			currentInputElement.current?.parentElement?.classList.remove('span-complete');
			currentInputElement.current?.parentElement?.classList.remove('pop');
		} else {
			currentInput.classList.remove('current-input');
			const previousInputElement = currentInput.previousElementSibling! as HTMLInputElement;
			previousInputElement.value = '';
			previousInputElement.classList.add('current-input');
			currentInputElement.current = previousInputElement;
			gameStateDispatch({ type: 'setCurrentGuess', payload: gameState.currentGuess.slice(0, -1) });
			gameStateDispatch({ type: 'setCurrentLetter', payload: '' });
		}
		ASYNC_RUN = false;
	};

	const handleEnter = async () => {
		gameStateDispatch({ type: 'setCurrentLetter', payload: '' });
		if (gameState.currentGuess.length === gameSettings.wordLength) {
			const ans = (await wordHandlers.sendUserGuessToServer()).data;
			if (ans) {
				await handleInputCellsUpdate(ans, currentInputElement.current);
				await handleKeyboardUpdate(ans, keyboardContainerElement.current, gameState.currentGuess);
				GameSounds?.guessSent?.play();
				if (!(await handleUserGuessResponse(ans))) {
					gameStateDispatch({ type: 'setGuessNumber', payload: gameState.guessNumber + 1 });
					gameStateDispatch({ type: 'setCurrentGuess', payload: '' });
					gameStateDispatch({ type: 'setCurrentLetter', payload: '' });
					currentInputElement.current = await handleRowChange(currentInputElement.current);
				}
			} else {
				currentInputElement.current?.parentElement?.classList.add('notfound-guess');
				GameSounds?.badGuess?.play();
			}
		} else {
			currentInputElement.current?.parentElement?.classList.add('short-guess');
			GameSounds?.badGuess?.play();
		}
		ASYNC_RUN = false;
	};

	const handleGameStateUpdate = (char: string) => {
		if (currentInputElement.current) currentInputElement.current.value = char;
		gameStateDispatch({ type: 'setCurrentLetter', payload: char });
		gameStateDispatch({ type: 'setCurrentGuess', payload: gameState.currentGuess + char });
	};

	const handleUserGuessResponse = async (guess: [string]) => {
		let checker = true;
		for (let ans of guess) {
			if (ans !== 'bull') checker = false;
		}
		if (checker) await handleVictory();
		else if (!checker && gameState.guessNumber === gameSettings.totalChances) {
			await handleDefeat();
			checker = true;
		}
		return checker;
	};

	const handleVictory = async () => {
		awaitFunction(700, async () => {
			GameSounds?.victory?.play();
			playStateDispatch({ type: 'setVictory' });
			if (session && status === 'authenticated') await handleUserFinishGame(true);
		});
	};

	const handleDefeat = async () => {
		awaitFunction(700, async () => {
			GameSounds?.defeat?.play();
			playStateDispatch({ type: 'setDefeat' });
			if (session && status === 'authenticated') await handleUserFinishGame(false);
		});
	};

	const handleResetGame = async () => {
		try {
			if (!session && status === 'unauthenticated') await handleGuestNewGame();
			playStateDispatch({ type: 'setPlay' });
			gameStateDispatch({ type: 'resetState' });
			currentInputElement.current = await resetGameComponents(keyboardContainerElement.current, currentInputElement.current);
			await setRandomWord();
		} catch (error) {
			console.log(error);
			if (error === 'Guest exceed daily games limit.') playStateDispatch({ type: 'setGuestLimit' });
			else playStateDispatch({ type: 'setStart' });
		}
	};

	const handleUserFinishGame = async (state: boolean) => {
		try {
			const gameStats = {
				state: state,
				chances: gameState.guessNumber,
				word: gameState.word,
			};
			userHandlers.handleUserEndGame(gameStats);
		} catch {
			redirect('/signin');
		}
	};

	const handleGuestNewGame = async () => {
		try {
			await guestHandler();
		} catch {
			throw 'Guest exceed daily games limit.';
		}
	};

	useEffect(() => {
		if (playState === 'play') {
			document.addEventListener('keyup', handleKeyPressed);
			return () => document.removeEventListener('keyup', handleKeyPressed);
		}
	});

	return {
		playState,
		startNewGame,
		gameSettings,
		gameState,
		currentInputElement,
		handleKeyPressedFromDigitalKeyboard,
		keyboardContainerElement,
		handleResetGame,
	};
};

export default useStartGame;
