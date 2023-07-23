import useAxiosAuth from '../hooks/useAxiosAuth';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { gameStateType } from './reducers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function useWordHandlers(gameState: gameStateType) {
	const axiosAuth = useAxiosAuth();
	const { update } = useSession();
	const queryClient = useQueryClient();

	const getRandomWord = async () => {
		try {
			const res = await axiosAuth.get(`/api/word`);
			const cypherWord = await res.data;
			return cypherWord;
		} catch {
			await update();
			throw new Error();
		}
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
		retry: 2,
	});

	const handleWordExistsMutation = useMutation({
		mutationKey: ['handleWordExists'],
		mutationFn: handleWordExists,
		cacheTime: Infinity,
		retry: 2,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['handleWordExists'] });
		},
		onError: async () => {
			await signOut();
			redirect('signin');
		},
	});

	const sendUserGuessToServerMutation = useMutation({
		mutationKey: ['sendUserGuessToServer'],
		mutationFn: sendUserGuessToServer,
		cacheTime: Infinity,
		retry: 2,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['sendUserGuessToServer'] });
		},
		onError: async () => {
			await signOut();
			redirect('signin');
		},
	});

	return {
		getRandomWord: getRandomWordQuery,
		handleWordExists: handleWordExistsMutation,
		sendUserGuessToServer: sendUserGuessToServerMutation,
	};
}
