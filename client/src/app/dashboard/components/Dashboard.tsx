'use client';

import Ranking from './Ranking/Ranking';
import UserStats from './UserStats/UserStats';
import LoadingDashboardData from './LoadingDashboardData';
import useDashboardData from '@/src/utils/dashboard/useDashboardData';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
	const dashboardDataMutation = useDashboardData();
	const { data: session } = useSession();

	if (dashboardDataMutation?.isLoading || dashboardDataMutation?.isError || !dashboardDataMutation?.data || !session)
		return <LoadingDashboardData />;

	return (
		<>
			<UserStats {...dashboardDataMutation?.data?.userStats} />
			<Ranking {...dashboardDataMutation?.data?.rank} />
		</>
	);
}
