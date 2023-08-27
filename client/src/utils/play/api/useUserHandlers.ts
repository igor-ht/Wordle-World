import { signOut, useSession } from 'next-auth/react';
import useAxiosAuth from '../../hooks/useAxiosAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GameSettingsType } from '../state/reducers';

type GameStatsType = { state: boolean; chances: number; word: string; gameSettings: GameSettingsType };

const useUserHandlers = () => {
	const axiosAuth = useAxiosAuth();
	const { data: session, update } = useSession();
	const queryClient = useQueryClient();

	const handleUserEndGameMutation = async (gameStats: GameStatsType) => {
		try {
			await axiosAuth.post(`/user/updateUserRanking`, {
				email: session?.email,
				gameStats: gameStats,
			});
		} catch {
			await update();
		}
	};

	const { mutate: handleUserEndGame } = useMutation({
		mutationFn: handleUserEndGameMutation,
		cacheTime: 1000 * 60 * 60,
		retry: 3,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
		},
		onError: async () => {
			await signOut({ callbackUrl: '/signin', redirect: true });
		},
	});

	return { handleUserEndGame };
};

export default useUserHandlers;
