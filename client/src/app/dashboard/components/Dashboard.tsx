'use client';

import Ranking from './Ranking/Ranking';
import UserStats from './UserStats/UserStats';
import { useQuery } from '@tanstack/react-query';
import LoadingDashboardData from './LoadingDashboardData';
import { rankType, userStatsType } from '@/src/utils/dashboard/reducer';
import useAxiosAuth from '@/src/utils/hooks/useAxiosAuth';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
	const { data: session, update } = useSession();
	const axiosAuth = useAxiosAuth();

	const useDashboardData = async () => {
		const res = await axiosAuth.post('api/dashboard', { id: session?.id, email: session?.email });
		const dashboardData = await res.data;
		if (!dashboardData) throw 'Data could not be fetched';
		dashboardData.userStats.discoveredWords = dashboardData.userStats.discoveredWords.map((obj: { word: string }) => obj.word);
		return dashboardData;
	};

	const { isLoading, isError, data } = useQuery({
		queryKey: ['dashboardData'],
		queryFn: () => useDashboardData().then((data) => data),
	}) as { isLoading: any; isError: any; data: { rank: rankType; userStats: userStatsType } };

	if (isLoading) return <LoadingDashboardData />;

	if (isError) {
		update();
	}
	console.log(data);

	return (
		<>
			<UserStats {...data?.userStats} />
			<Ranking {...data?.rank} />
		</>
	);
}
