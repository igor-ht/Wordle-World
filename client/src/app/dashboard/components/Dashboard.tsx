'use client';

import Ranking from './Ranking/Ranking';
import UserStats from './UserStats/UserStats';
import LoadingDashboardData from './LoadingDashboardData';
import useDashboardData from '@/src/utils/dashboard/useDashboardData';

export default function Dashboard() {
	const dashboardDataQuery = useDashboardData();
	
	if (dashboardDataQuery?.isLoading || !dashboardDataQuery?.data || dashboardDataQuery.isError) return <LoadingDashboardData />;

	return (
		<>
			<UserStats {...dashboardDataQuery?.data?.userStats} />
			<Ranking {...dashboardDataQuery?.data?.rank} />
		</>
	);
}
