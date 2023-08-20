import { MouseEventHandler, MutableRefObject, useEffect, useReducer, useRef } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { gameSettingsReducer, gameSettingsType, gameStateReducer, gameStateType, playStateReducer, playStateType } from './reducers';
import { GameSounds } from '@/utils/sounds';
import useWordHandlers from './useWordHandlers';
import useGuestHandlers from './useGuestHandlers';
import useUserHandlers from './useUserHandlers';
import { awaitFunction } from '../general/await';
export interface IGameApi {
	playState: playStateType;
	startNewGame: () => Promise<void>;
	gameSettings: gameSettingsType;
	gameState: gameStateType;
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
			if (!session && status === 'unauthenticated') await handleGuestFinishGame();
			await setRandomWord();
			if (playState !== 'play') playStateDispatch({ type: 'setPlay' });
		} catch (error) {
			if (error !== 'Guest exceed daily games limit.') playStateDispatch({ type: 'setStart' });
			await Promise.resolve(error);
		}
	};

	const setRandomWord = async () => {
		try {
			const randomWord = (await wordHandlers.getRandomWord()).data;
			gameStateDispatch({ type: 'setRandomWord', payload: randomWord });
		} catch {
			playStateDispatch({ type: 'setStart' });
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
		handleInputCellChange();
		ASYNC_RUN = false;
	};

	const handleKeyPressedFromDigitalKeyboard = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (ASYNC_RUN) return;
		ASYNC_RUN = true;
		event.currentTarget.blur();
		if (event.currentTarget.name === 'Enter') return handleEnter();
		if (event.currentTarget.name === '⌫') return handleBackSpace();
		if (currentInputElement.current!.value.length > 0) return (ASYNC_RUN = false);
		GameSounds?.insertLetter?.play();
		handleGameStateUpdate(event.currentTarget.name);
		handleInputCellChange();
		ASYNC_RUN = false;
	};

	const handleInputCellChange = () => {
		gameStateDispatch({ type: 'setCurrentLetter', payload: '' });
		if (currentInputElement.current && +currentInputElement.current.id % gameSettings.wordLength === 0) {
			currentInputElement.current?.classList.remove('current-input');
			currentInputElement.current?.parentElement?.classList.add('span-complete');
			currentInputElement.current?.parentElement?.classList.add('pop');
		} else {
			currentInputElement.current?.classList.remove('current-input');
			currentInputElement.current = currentInputElement.current?.nextElementSibling as HTMLInputElement;
			currentInputElement.current.classList.add('current-input');
		}
	};

	const handleInputRowChange = async () => {
		gameStateDispatch({ type: 'setGuessNumber', payload: gameState.guessNumber + 1 });
		gameStateDispatch({ type: 'setCurrentGuess', payload: '' });
		gameStateDispatch({ type: 'setCurrentLetter', payload: '' });
		currentInputElement.current?.parentElement?.classList.remove('span-complete');
		const nextRow = currentInputElement.current?.parentElement?.nextElementSibling as HTMLSpanElement;
		const firstInput = nextRow.firstElementChild as HTMLInputElement;
		currentInputElement.current?.classList.remove('current-input');
		currentInputElement.current = firstInput;
		currentInputElement.current.classList.add('current-input');
	};

	const handleBackSpace = () => {
		const currentInput = currentInputElement.current! as HTMLInputElement;
		if ((+currentInput.id - 1) % 5 !== 0) GameSounds?.insertLetter?.play();
		// check if input is the first or last in the row
		if ((+currentInput.id - 1) % 5 === 0 || (+currentInput.id % 5 === 0 && currentInput.value.length > 0)) {
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
				await handleInputCellsUpdate(ans);
				await handleKeyboardUpdate(ans);
				GameSounds?.guessSent?.play();
				if (!(await handleUserGuessResponse(ans))) await handleInputRowChange();
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
		currentInputElement.current ? (currentInputElement.current.value = char) : null;
		gameStateDispatch({ type: 'setCurrentLetter', payload: char });
		gameStateDispatch({ type: 'setCurrentGuess', payload: gameState.currentGuess + char });
	};

	const handleInputCellsUpdate = async (ans: [string]) => {
		const currentRow = currentInputElement?.current?.parentElement as HTMLSpanElement;
		const inputCells = currentRow?.childNodes as NodeListOf<HTMLInputElement>;
		ans.map((guess: string, i: number) => {
			switch (guess) {
				case 'bull':
					inputCells[i]?.classList?.add('bull');
					break;
				case 'cow':
					inputCells[i]?.classList?.add('cow');
					break;
				case 'wrong':
					inputCells[i]?.classList?.add('wrong');
					break;
			}
		});
	};

	const handleKeyboardUpdate = async (ans: [string]) => {
		const keyboardContainer = keyboardContainerElement.current;
		const keyboardRows = keyboardContainer?.childNodes as NodeListOf<HTMLDivElement>;
		ans.map((guess: string, i: number) => {
			keyboardRows.forEach((row) => {
				const currentRowKeys = row.childNodes as NodeListOf<HTMLButtonElement>;
				currentRowKeys.forEach((key) => {
					if (key.name === gameState.currentGuess[i]) {
						switch (guess) {
							case 'bull':
								if (key.classList.contains('cow')) key.classList.remove('cow');
								key.classList.add('bull');
								break;
							case 'cow':
								if (key.classList.contains('bull')) break;
								key.classList.add('cow');
								break;
							case 'wrong':
								key.classList.add('wrong');
								break;
						}
					}
				});
			});
		});
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
			if (session && status === 'authenticated') return await handleUserFinishGame(true);
		});
	};

	const handleDefeat = async () => {
		awaitFunction(700, async () => {
			GameSounds?.defeat?.play();
			playStateDispatch({ type: 'setDefeat' });
			if (session && status === 'authenticated') return await handleUserFinishGame(false);
		});
	};

	const handleResetGame = async () => {
		try {
			if (!session && status === 'unauthenticated') await handleGuestFinishGame();
			playStateDispatch({ type: 'setPlay' });
			gameStateDispatch({ type: 'resetState' });
			await resetGameComponents();
			await setRandomWord();
		} catch (error) {
			await Promise.resolve(error);
		}
	};

	const resetGameComponents = async () => {
		const keysRow = keyboardContainerElement.current?.childNodes as NodeListOf<HTMLDivElement>;
		keysRow?.forEach((row) => {
			const keysButtons = row.childNodes as NodeListOf<HTMLButtonElement>;
			keysButtons.forEach((input) => {
				input.classList.remove('bull');
				input.classList.remove('cow');
				input.classList.remove('wrong');
			});
		});
		const inputContainer = currentInputElement.current?.parentElement?.parentElement as HTMLDivElement;
		const inputRows = inputContainer?.childNodes as NodeListOf<HTMLSpanElement>;
		inputRows?.forEach((row, i) => {
			row.classList.remove('span-complete');
			row.classList.remove('pop');
			const inputCells = row.childNodes as NodeListOf<HTMLInputElement>;
			inputCells.forEach((input, j) => {
				input.value = '';
				input.blur();
				input.classList.remove('current-input');
				input.classList.remove('bull');
				input.classList.remove('cow');
				input.classList.remove('wrong');
				if (i === 0 && j === 0) {
					input.classList.add('current-input');
					currentInputElement.current = input;
				}
			});
		});
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

	const handleGuestFinishGame = async () => {
		try {
			await guestHandler();
			if (playState !== 'play') playStateDispatch({ type: 'setPlay' });
		} catch {
			playStateDispatch({ type: 'setGuestLimit' });
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
