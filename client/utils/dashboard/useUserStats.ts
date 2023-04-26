import { useEffect, useReducer } from 'react';
import { useSession } from 'next-auth/react';
import { userStatsInitialState, userStatsReducer } from './reducer';
import useAxiosAuth from '../hooks/useAxiosAuth';

export default function useUserStats() {
	const axiosAuth = useAxiosAuth();
	const { data: session } = useSession();
	const [userStats, userStatsDispatch] = useReducer(userStatsReducer, userStatsInitialState);

	useEffect(() => {
		if (session) getUserStats();
	}, [session]);

	const getUserStats = async () => {
		const res = await axiosAuth.post('http://localhost:5000/user/getUserStats', { id: session?.user?.id, email: session?.user?.email });
		const user = res.data;
		if (!user) return null;
		const currentUser = {
			...user,
			points: user.points,
			discoveredWords: user.discoveredWords.map((obj: { word: string }) => obj.word),
			following: user.following,
		};
		userStatsDispatch({ type: 'setPoints', payload: currentUser!.points });
		userStatsDispatch({ type: 'setDiscoveredWords', payload: currentUser!.discoveredWords });
		userStatsDispatch({ type: 'setFollowing', payload: currentUser!.following });
	};

	return { userStats };
}
