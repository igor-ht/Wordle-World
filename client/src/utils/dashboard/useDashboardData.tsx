import { useSession } from 'next-auth/react';
import { useEffect, useReducer } from 'react';
import useAxiosAuth from '../hooks/useAxiosAuth';
import { dashboardDataInitialState, dashboardDataReducer } from './reducer';

export default function useDashboardData() {
	const [dashboard, dashboardDispatch] = useReducer(dashboardDataReducer, dashboardDataInitialState);
	const { data: session, update } = useSession();
	const axiosAuth = useAxiosAuth();

	useEffect(() => {
		const getDashboardData = async () => {
			try {
				const res = await axiosAuth.post('api/dashboard', { id: session?.id, email: session?.email });
				const dashboardData = await res.data;
				if (!dashboardData) throw 'Data could not be fetched';
				dashboardDispatch({ type: 'setPoints', payload: dashboardData.userStats.points });
				dashboardDispatch({
					type: 'setDiscoveredWords',
					payload: dashboardData.userStats.discoveredWords.map((obj: { word: string }) => obj.word),
				});
				dashboardDispatch({ type: 'setFollowing', payload: dashboardData.userStats.following });
				dashboardDispatch({ type: 'setRanking', payload: dashboardData.rank.ranking });
				dashboardDispatch({ type: 'setUserRanking', payload: dashboardData.rank.user });
			} catch (error) {
				await Promise.resolve(error);
				return await update();
			}
		};

		if (session) getDashboardData();
	}, [axiosAuth, session, update]);

	return dashboard;
}
