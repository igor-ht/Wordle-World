import { signOut, useSession } from 'next-auth/react';
import useAxiosAuth from '../hooks/useAxiosAuth';
import { useQuery } from '@tanstack/react-query';

export default function useDashboardData() {
	const { data: session, update } = useSession();
	const axiosAuth = useAxiosAuth();

	const getDashboardData = async () => {
		try {
			const res = await axiosAuth.post('api/dashboard', { id: session?.id, email: session?.email });
			const dashboardData = await res.data;
			if (!dashboardData) throw 'Data could not be fetched';
			dashboardData.userStats.discoveredWords = dashboardData.userStats.discoveredWords.map((obj: { word: string }) => obj.word);
			return dashboardData;
		} catch {
			await update();
			throw new Error();
		}
	};

	const dashboardDataMutation = useQuery({
		queryKey: ['dashboardData'],
		queryFn: getDashboardData,
		retry: 3,
		staleTime: Infinity,
		onError: async () => {
			if (session) return await signOut();
			await update();
		},
	});

	return dashboardDataMutation;
}
