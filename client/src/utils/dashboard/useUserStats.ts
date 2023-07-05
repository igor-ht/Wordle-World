import { useEffect, useReducer } from 'react';
import { useSession } from 'next-auth/react';
import { userStatsInitialState, userStatsReducer } from './reducer';
import useAxiosAuth from '../hooks/useAxiosAuth';

export default function useUserStats() {
	const { data: session, update } = useSession();
	const [userStats, userStatsDispatch] = useReducer(userStatsReducer, userStatsInitialState);
	const axiosAuth = useAxiosAuth();

	useEffect(() => {
		const getUserStats = async () => {
			const res = await axiosAuth.post(
				'/api/dashboard',
				{ id: session?.user?.id, email: session?.user?.email },
				{ params: { getUserStats: true } }
			);
			const user = res.data;
			if (!user) return null;
			userStatsDispatch({ type: 'setPoints', payload: user.points });
			userStatsDispatch({ type: 'setDiscoveredWords', payload: user.discoveredWords.map((obj: { word: string }) => obj.word) });
			userStatsDispatch({ type: 'setFollowing', payload: user.following });
		};

		try {
			if (!session) throw 'Session expired.';
			Promise.resolve(getUserStats());
		} catch {
			Promise.resolve(update());
		}
	}, [axiosAuth, session, update]);

	return { userStats };
}
