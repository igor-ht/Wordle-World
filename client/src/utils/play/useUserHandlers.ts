import { signOut, useSession } from 'next-auth/react';
import useAxiosAuth from '../hooks/useAxiosAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

const useUserHandlers = () => {
	const axiosAuth = useAxiosAuth();
	const { data: session, update } = useSession();
	const queryClient = useQueryClient();

	const handleUserNewGame = async (gameStats: { state: boolean; chances: number; word: string }) => {
		try {
			const res = await axiosAuth.post(`api/user`, {
				email: session?.email,
				gameStats: gameStats,
			});
			return await res.data;
		} catch {
			await update();
			throw new Error();
		}
	};

	const handleUserNewGameMutation = useMutation({
		mutationKey: ['userNewGame'],
		mutationFn: handleUserNewGame,
		cacheTime: Infinity,
		retry: 2,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
		},
		onError: async () => {
			await signOut();
			redirect('signin');
		},
	});

	return handleUserNewGameMutation;
};

export default useUserHandlers;
