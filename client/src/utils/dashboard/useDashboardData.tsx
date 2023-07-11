import { useSession } from 'next-auth/react';
import useAxiosAuth from '../hooks/useAxiosAuth';
import { rankType, userStatsType } from './reducer';
import { useQuery } from '@tanstack/react-query';

export default function useDashboardData() {
	const { data: session, update } = useSession();
	const axiosAuth = useAxiosAuth();

	const getDashboardData = async () => {
		const res = await axiosAuth.post('api/dashboard', { id: session?.id, email: session?.email });
		const dashboardData = await res.data;
		if (!dashboardData) throw 'Data could not be fetched';
		dashboardData.userStats.discoveredWords = dashboardData.userStats.discoveredWords.map((obj: { word: string }) => obj.word);
		return dashboardData;
	};

	const { isLoading, isError, data, refetch } = useQuery({
		queryKey: ['dashboardData'],
		queryFn: getDashboardData,
	});

	if (isError) {
		update().then(() => {
			refetch();
		});
	}

	return { isLoading, isError, data } as { isLoading: boolean; isError: boolean; data: { rank: rankType; userStats: userStatsType } };
}
