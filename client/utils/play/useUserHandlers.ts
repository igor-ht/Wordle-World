import { useSession } from 'next-auth/react';
import useAxiosAuth from '../hooks/useAxiosAuth';

const useUserHandlers = () => {
	const axiosAuth = useAxiosAuth();
	const { data: session } = useSession();

	const handleUserNewGame = async (gameStats: { state: boolean; chances: number; word: string }) => {
		await axiosAuth.post('http://localhost:5000/user/updateUserRanking', {
			email: session?.user?.email,
			gameStats: gameStats,
		});
	};

	return { handleUserNewGame };
};

export default useUserHandlers;
