import { useSession } from 'next-auth/react';
import useAxiosAuth from '../hooks/useAxiosAuth';
import { useMutation } from '@tanstack/react-query';

const useUserHandlers = () => {
	const axiosAuth = useAxiosAuth();
	const { data: session, update } = useSession();

	const handleUserNewGame = async (gameStats: { state: boolean; chances: number; word: string }) => {
		await axiosAuth.post(`api/user`, {
			email: session?.email,
			gameStats: gameStats,
		});
	};

	const { isError, mutate, reset } = useMutation({
		mutationKey: ['userNewGame'],
		mutationFn: handleUserNewGame,
		cacheTime: Infinity,
	});

	if (isError) update().then(() => reset());

	return { handleUserNewGame: mutate };
};

export default useUserHandlers;
