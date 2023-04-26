import useAxiosAuth from '../hooks/useAxiosAuth';
import { gameStateType } from './reducers';

export default function useWordHandlers() {
	const axiosAuth = useAxiosAuth();

	const getRandomWord = async () => {
		const res = await axiosAuth.get('http://localhost:5000/word/randWord');
		const { cypherWord } = await res.data;
		return cypherWord;
	};

	const handleWordExists = async (gameState: gameStateType) => {
		const reqBody = { word: gameState.currentGuess.toLowerCase() };
		const res = await axiosAuth.post('http://localhost:5000/word/searchGuess', reqBody);
		return await res.data;
	};

	const sendUserGuessToServer = async (gameState: gameStateType) => {
		const reqBody = {
			cyphertext: gameState.word,
			guess: gameState.currentGuess,
		};
		const res = await axiosAuth.post('http://localhost:5000/word/checkGuess', reqBody);
		return res.data;
	};

	return { getRandomWord, handleWordExists, sendUserGuessToServer };
}
