import useAxiosAuth from '../hooks/useAxiosAuth';
import { gameStateType } from './reducers';
import { useMutation, useQuery } from '@tanstack/react-query';

export default function useWordHandlers(gameState: gameStateType) {
	const axiosAuth = useAxiosAuth();

	const getRandomWord = async () => {
		const res = await axiosAuth.get(`/api/word`);
		const cypherWord = await res.data;
		return cypherWord;
	};

	const handleWordExists = async () => {
		const reqBody = { word: gameState.currentGuess.toLowerCase() };
		const res = await axiosAuth.post(`/api/word`, reqBody, {
			params: {
				wordExists: true,
			},
		});
		return await res.data;
	};

	const sendUserGuessToServer = async () => {
		const reqBody = {
			cyphertext: gameState.word,
			guess: gameState.currentGuess,
		};
		const res = await axiosAuth.post(`/api/word`, reqBody, {
			params: {
				checkGuess: true,
			},
		});
		return await res.data;
	};

	const getRandomWordQuery = useQuery({
		queryKey: ['getRandomWord'],
		queryFn: getRandomWord,
		staleTime: Infinity,
		enabled: false,
	});

	const handleWordExistsMutation = useMutation({
		mutationKey: ['handleWordExists'],
		mutationFn: handleWordExists,
		cacheTime: Infinity,
	});

	const sendUserGuessToServerMutation = useMutation({
		mutationKey: ['sendUserGuessToServer'],
		mutationFn: sendUserGuessToServer,
		cacheTime: Infinity,
	});

	return {
		getRandomWord: getRandomWordQuery,
		handleWordExists: handleWordExistsMutation,
		sendUserGuessToServer: sendUserGuessToServerMutation,
	};
}
