import { MouseEventHandler, MutableRefObject, useEffect, useRef } from 'react';
import { GameSettingsType, GameStateType, PlayStateType } from './state/reducers';
import { handleInputCellChange, handleInputCellsUpdate, handleKeyboardUpdate, handleRowChange } from './dom/domHandlers';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { GameSounds } from '@/utils/general/sounds';
import useWordHandlers from './api/useWordHandlers';
import useGuestHandlers from './api/useGuestHandlers';
import useUserHandlers from './api/useUserHandlers';
import { awaitFunction } from '../general/await';
import { useGameStates } from './state/useStates';

export interface IGameApi {
	playState: PlayStateType;
	startNewGame: () => Promise<void>;
	gameSettings: GameSettingsType;
	gameState: GameStateType;
	currentInputElement: MutableRefObject<HTMLInputElement | null>;
	handleKeyPressedFromDigitalKeyboard: MouseEventHandler<HTMLButtonElement>;
}

let ASYNC_RUN = false;

const useStartGame: () => IGameApi = () => {
	const { gameSettings, playState, gameState, setGameState, setNewGame, setGameCurrentGuess, setNewGuess } = useGameStates();
	const currentInputElement = useRef<HTMLInputElement | null>(null);

	const wordHandlers = useWordHandlers(gameState);
	const userHandlers = useUserHandlers();
	const guestHandler = useGuestHandlers();

	const { data: session, status } = useSession();

	const startNewGame = async () => {
		try {
			if (!session && status === 'unauthenticated') await handleGuestNewGame();
			const word = (await wordHandlers.getRandomWord()).data;
			setNewGame(word);
		} catch (error) {
			if (error === 'Guest exceed daily games limit.') setGameState('guestLimit');
			else setGameState('start');
		}
	};

	const handleKeyPressed = (event: KeyboardEvent) => {
		if (playState !== 'play' || ASYNC_RUN) return;
		ASYNC_RUN = true;
		if (event.key === 'Enter') return handleEnter();
		if (event.key === 'Backspace') return handleBackSpace();
		if (!/^[a-zA-Z]$/.test(event.key) || currentInputElement.current!.value.length > 0) return (ASYNC_RUN = false);
		GameSounds?.insertLetter?.play();
		currentInputElement.current!.value = event.key.toUpperCase();
		setGameCurrentGuess(gameState.currentGuess + event.key.toUpperCase());
		console.log(currentInputElement.current);
		currentInputElement.current = handleInputCellChange(currentInputElement.current, gameSettings.wordLength);
		console.log(currentInputElement.current);
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
		currentInputElement.current!.value = event.currentTarget.id;
		setGameCurrentGuess(gameState.currentGuess + event.currentTarget.id);
		console.log(currentInputElement.current);
		currentInputElement.current = handleInputCellChange(currentInputElement.current, gameSettings.wordLength);
		console.log(currentInputElement.current);
		ASYNC_RUN = false;
	};

	const handleBackSpace = () => {
		const currentInput = currentInputElement.current! as HTMLInputElement;
		if ((+currentInput.id - 1) % gameSettings.wordLength === 0) return (ASYNC_RUN = false);
		// check if input is the last in the row and is not empty
		if (+currentInput.id % gameSettings.wordLength === 0 && currentInput.value.length > 0) {
			currentInput.value = '';
			currentInput.classList.add('current-input');
			currentInputElement.current?.parentElement?.classList.remove('span-complete');
			currentInputElement.current?.parentElement?.classList.remove('pop');
		} else {
			currentInput.classList.remove('current-input');
			const previousInputElement = currentInput.previousElementSibling! as HTMLInputElement;
			previousInputElement.value = '';
			previousInputElement.classList.add('current-input');
			currentInputElement.current = previousInputElement;
		}
		GameSounds?.insertLetter?.play();
		setGameCurrentGuess(gameState.currentGuess.slice(0, -1));
		ASYNC_RUN = false;
	};

	const handleEnter = async () => {
		if (gameState.currentGuess.length === gameSettings.wordLength) {
			const ans = (await wordHandlers.sendUserGuessToServer()).data;
			if (ans) {
				await handleInputCellsUpdate(ans);
				await handleKeyboardUpdate(ans, gameState.currentGuess);
				GameSounds?.guessSent?.play();
				if (!(await handleUserGuessResponse(ans))) {
					setNewGuess();
					console.log(currentInputElement.current);
					currentInputElement.current = await handleRowChange();
					console.log(currentInputElement.current);
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

	const handleUserGuessResponse = async (guess: [string]) => {
		let checker = true;
		for (let ans of guess) {
			if (ans !== 'bull') checker = false;
		}
		if (checker) await handleEndGame('victory');
		else if (!checker && gameState.guessNumber === gameSettings.totalChances) {
			await handleEndGame('defeat');
			checker = true;
		}
		return checker;
	};

	const handleEndGame = async (result: 'victory' | 'defeat') => {
		awaitFunction(500, async () => {
			result === 'victory' ? GameSounds?.victory?.play() : GameSounds?.defeat?.play();
			setGameState(result);
			if (session && status === 'authenticated') await handleUserFinishGame(true);
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
	};
};

export default useStartGame;
