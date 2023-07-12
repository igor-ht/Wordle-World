import { signOut, useSession } from 'next-auth/react';
import useAxiosAuth from '../hooks/useAxiosAuth';
import { useQuery } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export default function useDashboardData() {
	const { data: session, update } = useSession();
	const axiosAuth = useAxiosAuth();

	const getDashboardData = async () => {
		try {
			if (!session) return null;
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

	const dashboardDataQuery = useQuery({
		queryKey: ['dashboardData'],
		queryFn: getDashboardData,
		retry: 2,
		onError: async () => {
			if (session) return await signOut();
			await update();
		},
	});

	return dashboardDataQuery;
}
