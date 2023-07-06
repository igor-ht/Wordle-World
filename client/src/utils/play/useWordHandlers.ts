import useAxiosAuth from '../hooks/useAxiosAuth';
import { useSession } from 'next-auth/react';
import { gameStateType } from './reducers';

export default function useWordHandlers() {
	const axiosAuth = useAxiosAuth();
	const { update } = useSession();

	const getRandomWord = async () => {
		try {
			const res = await axiosAuth.get(`/api/word`);
			const cypherWord = await res.data;
			return cypherWord;
		} catch (error) {
			await Promise.resolve(error);
			await update();
			throw '';
		}
	};

	const handleWordExists = async (gameState: gameStateType) => {
		const reqBody = { word: gameState.currentGuess.toLowerCase() };
		const res = await axiosAuth.post(`/api/word`, reqBody, {
			params: {
				wordExists: true,
			},
		});
		return await res.data;
	};

	const sendUserGuessToServer = async (gameState: gameStateType) => {
		const reqBody = {
			cyphertext: gameState.word,
			guess: gameState.currentGuess,
		};
		const res = await axiosAuth.post(`/api/word`, reqBody, {
			params: {
				checkGuess: true,
			},
		});
		return res.data;
	};

	return { getRandomWord, handleWordExists, sendUserGuessToServer };
}
