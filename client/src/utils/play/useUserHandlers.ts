import { useSession } from 'next-auth/react';
import useAxiosAuth from '../hooks/useAxiosAuth';

const useUserHandlers = () => {
	const axiosAuth = useAxiosAuth();
	const { data: session, update } = useSession();

	const handleUserNewGame = async (gameStats: { state: boolean; chances: number; word: string }) => {
		try {
			await axiosAuth.post(`api/user`, {
				email: session?.email,
				gameStats: gameStats,
			});
		} catch {
			await update();
		}
	};

	return { handleUserNewGame };
};

export default useUserHandlers;
