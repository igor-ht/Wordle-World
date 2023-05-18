'use client';

import { useEffect, useReducer } from 'react';
import { useSession } from 'next-auth/react';
import { userStatsInitialState, userStatsReducer } from './reducer';
import useAxiosAuth from '../hooks/useAxiosAuth';

export default function useUserStats() {
	const axiosAuth = useAxiosAuth();
	const { data: session, update } = useSession();
	const [userStats, userStatsDispatch] = useReducer(userStatsReducer, userStatsInitialState);

	const getUserStats = async () => {
		try {
			const res = await axiosAuth.post(
				'/api/dashboard',
				{ id: session?.user?.id, email: session?.user?.email },
				{ params: { getUserStats: true } }
			);
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
		} catch {
			await update();
		}
	};

	useEffect(() => {
		getUserStats();
	}, []);

	return { userStats };
}
