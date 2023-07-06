import { MouseEventHandler, MutableRefObject, useEffect, useReducer, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useWordHandlers from './useWordHandlers';
import useGuestHandlers from './useGuestHandlers';
import useUserHandlers from './useUserHandlers';
import {
	gameSettingsInitialState,
	gameSettingsReducer,
	gameSettingsType,
	gameStateInitialState,
	gameStateReducer,
	gameStateType,
	playStateInitialState,
	playStateReducer,
	playStateType,
} from './reducers';

export interface IGameApi {
	playState: playStateType;
	startNewGame: () => Promise<void>;
	gameSettings: gameSettingsType;
	gameState: gameStateType;
	currentInputElement: MutableRefObject<HTMLInputElement | null>;
	handleKeyPressedFromDigitalKeyboard: MouseEventHandler<HTMLButtonElement>;
	keyboardContainerElement: MutableRefObject<HTMLDivElement | null>;
	handleResetGame: () => Promise<void>;
	guestLimitGames: boolean;
}

const useStartGame: () => IGameApi = () => {
	const [asyncRun, setAsyncRun] = useState(false);
	const [playState, playStateDispatch] = useReducer(playStateReducer, playStateInitialState);
	const [gameSettings, gameSettingsDispatch] = useReducer(gameSettingsReducer, gameSettingsInitialState);
	const [gameState, gameStateDispatch] = useReducer(gameStateReducer, gameStateInitialState);

	const currentInputElement = useRef<HTMLInputElement | null>(null);
	const keyboardContainerElement = useRef<HTMLDivElement | null>(null);

	const { data: session, status } = useSession();
	const router = useRouter();

	const { getRandomWord, handleWordExists, sendUserGuessToServer } = useWordHandlers();
	const { handleGuestUser, guestLimitGames } = useGuestHandlers();
	const { handleUserNewGame } = useUserHandlers();

	const startNewGame = async () => {
		try {
			if (!session && status === 'unauthenticated') await handleGuestFinishGame();
			await setRandomWord();
			if (!playState.play) playStateDispatch({ type: 'setPlay', payload: true });
		} catch {
			playStateDispatch({ type: 'setPlay', payload: false });
		}
	};

	const setRandomWord = async () => {
		try {
			const randomWord = await getRandomWord();
			gameStateDispatch({ type: 'setRandomWord', payload: randomWord });
		} catch {
			playStateDispatch({ type: 'setPlay', payload: false });
			throw '';
		}
	};

	const handleKeyPressed = (event: KeyboardEvent) => {
		if (playState.defeat || playState.victory) return;
		if (asyncRun) return;
		setAsyncRun(true);
		if (event.key === 'Enter') return handleEnter();
		if (event.key === 'Backspace') return handleBackSpace();
		if (!/^[a-zA-Z]$/.test(event.key)) return setAsyncRun(false);
		if (currentInputElement.current!.value.length > 0) return setAsyncRun(false);
		handleGameStateUpdate(event.key.toUpperCase());
		handleInputCellChange();
		setAsyncRun(false);
	};

	const handleKeyPressedFromDigitalKeyboard = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (asyncRun) return;
		setAsyncRun(true);
		event.currentTarget.blur();
		if (event.currentTarget.name === 'Enter') return handleEnter();
		if (event.currentTarget.name === '⌫') return handleBackSpace();
		if (currentInputElement.current!.value.length > 0) return setAsyncRun(false);
		handleGameStateUpdate(event.currentTarget.name);
		handleInputCellChange();
		setAsyncRun(false);
	};

	const handleInputCellChange = () => {
		gameStateDispatch({ type: 'setCurrentLetter', payload: '' });
		if (currentInputElement.current?.id === gameSettings.wordLength + '')
			return (
				currentInputElement.current?.classList.remove('current-input'),
				currentInputElement.current?.parentElement?.classList.add('span-complete'),
				currentInputElement.current?.parentElement?.classList.add('pop')
			);
		currentInputElement.current?.classList.remove('current-input');
		currentInputElement.current = currentInputElement.current!.nextElementSibling as HTMLInputElement;
		currentInputElement.current.classList.add('current-input');
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
		setAsyncRun(false);
	};

	const handleBackSpace = () => {
		const currentInput = currentInputElement.current! as HTMLInputElement;
		if (currentInput.id === '1' || (currentInput.id === gameSettings.wordLength + '' && currentInput.value.length > 0)) {
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
		setAsyncRun(false);
	};

	const handleEnter = async () => {
		gameState.currentLetter = '';
		if (gameState.currentGuess.length === gameSettings.wordLength) {
			if (!(await handleWordExists(gameState)))
				return currentInputElement.current!.parentElement!.classList.add('notfound-guess'), setAsyncRun(false);
			const ans = await sendUserGuessToServer(gameState);
			await handleInputCellsUpdate(ans);
			await handleKeyboardUpdate(ans);
			if (!(await handleUserGuessResponse(ans))) return await handleInputRowChange();
			setAsyncRun(false);
		} else {
			const currentRow = currentInputElement.current!.parentElement as HTMLSpanElement;
			currentRow.classList.add('short-guess');
			setAsyncRun(false);
		}
	};

	const handleGameStateUpdate = (char: string) => {
		currentInputElement.current!.value = char;
		gameStateDispatch({ type: 'setCurrentLetter', payload: char });
		gameStateDispatch({ type: 'setCurrentGuess', payload: gameState.currentGuess + char });
	};

	const handleInputCellsUpdate = async (ans: [string]) => {
		const currentRow = currentInputElement.current!.parentElement! as HTMLSpanElement;
		const inputCells = currentRow.childNodes! as NodeListOf<HTMLInputElement>;
		ans.map((guess: string, i: number) => {
			switch (guess) {
				case 'bull':
					inputCells[i].classList.add('bull');
					break;
				case 'cow':
					inputCells[i].classList.add('cow');
					break;
				case 'wrong':
					inputCells[i].classList.add('wrong');
					break;
			}
		});
	};

	const handleKeyboardUpdate = async (ans: [string]) => {
		const keyboardContainer = keyboardContainerElement.current!;
		const keyboardRows = keyboardContainer.childNodes! as NodeListOf<HTMLDivElement>;
		ans.map((guess: string, i: number) => {
			keyboardRows.forEach((row) => {
				const currentRowKeys = row.childNodes! as NodeListOf<HTMLButtonElement>;
				currentRowKeys.forEach((key) => {
					if (key.name === gameState.currentGuess[i]) {
						switch (guess) {
							case 'bull':
								key.classList.remove('cow');
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
		if (checker) handleVictory();
		else if (!checker && gameState.guessNumber === gameSettings.totalChances) {
			handleDefeat();
			checker = true;
		}
		return checker;
	};

	const handleVictory = () => {
		setTimeout(async () => {
			playStateDispatch({ type: 'setVictory', payload: true });
			if (session && status === 'authenticated') return await handleUserFinishGame(true);
			if (!session && status === 'unauthenticated') return await handleGuestFinishGame();
		}, 200);
	};

	const handleDefeat = () => {
		setTimeout(async () => {
			playStateDispatch({ type: 'setDefeat', payload: true });
			if (session && status === 'authenticated') return await handleUserFinishGame(false);
			if (!session && status === 'unauthenticated') return await handleGuestFinishGame();
		}, 200);
	};

	const handleResetGame = async () => {
		if (playState.victory) playStateDispatch({ type: 'setVictory', payload: false });
		if (playState.defeat) playStateDispatch({ type: 'setDefeat', payload: false });
		gameStateDispatch({ type: 'resetState' });
		await resetGameComponents();
		await setRandomWord();
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
			await handleUserNewGame(gameStats);
		} catch (error) {
			console.log(error);
		}
	};

	const handleGuestFinishGame = async () => {
		try {
			await handleGuestUser();
		} catch {
			if (playState.play) playStateDispatch({ type: 'setPlay', payload: false });
			return router.replace('/signup');
		}
	};

	useEffect(() => {
		if (playState.play) {
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
		guestLimitGames,
	};
};

export default useStartGame;
