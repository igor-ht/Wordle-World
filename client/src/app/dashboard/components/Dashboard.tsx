'use client';

import Ranking from './Ranking/Ranking';
import UserStats from './UserStats/UserStats';
import LoadingDashboardData from './LoadingDashboardData';
import useDashboardData from '@/src/utils/dashboard/useDashboardData';

export default function Dashboard() {
	const { isLoading, isError, data } = useDashboardData();

	if (isLoading) return <LoadingDashboardData />;

	if (isError) {
		// update();
	}

	return (
		<>
			<UserStats {...data.userStats} />
			<Ranking {...data.rank} />
		</>
	);
}
