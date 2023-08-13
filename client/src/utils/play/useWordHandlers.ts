import useAxiosAuth from '../hooks/useAxiosAuth';
import { useSession } from 'next-auth/react';
import { gameStateType } from './reducers';
import { useQuery } from '@tanstack/react-query';

export default function useWordHandlers(gameState: gameStateType) {
	const axiosAuth = useAxiosAuth();
	const { data: session, update } = useSession();

	const getRandomWordQuery = async () => {
		try {
			const res = await axiosAuth.get(`/word/randWord`);
			const cypherWord = await res.data;
			return cypherWord;
		} catch (error) {
			if (session) return await update();
			return Promise.reject(error);
		}
	};

	const sendUserGuessToServerQuery = async () => {
		const res = await axiosAuth.get(`/word/checkGuess`, {
			headers: { cyphertext: gameState.word },
			params: { guess: gameState.currentGuess.toLowerCase() },
		});
		if (!res.data) return null;
		return res.data;
	};

	const getRandomWord = useQuery({
		queryKey: ['secretWord'],
		queryFn: getRandomWordQuery,
		staleTime: 1000 * 60 * 60,
		cacheTime: 1000 * 60 * 60,
		enabled: false,
		retry: 3,
	});

	const sendUserGuessToServer = useQuery({
		queryKey: ['guessResponse'],
		queryFn: sendUserGuessToServerQuery,
		staleTime: 1000 * 60 * 60,
		cacheTime: 1000 * 60 * 60,
		enabled: false,
		retry: 3,
	});

	return {
		getRandomWord: getRandomWord.refetch,
		sendUserGuessToServer: sendUserGuessToServer.refetch,
	};
}
