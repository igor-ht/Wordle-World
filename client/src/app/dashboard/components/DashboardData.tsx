'use client';

import Ranking from './Ranking/Ranking';
import UserStats from './UserStats/UserStats';
import LoadingDashboardData from './LoadingDashboardData';
import useDashboardData from '@/utils/dashboard/useDashboardData';
import { signOut, useSession } from 'next-auth/react';

export default function DashboardData() {
	const dashboardDataQuery = useDashboardData();
	const { data: session } = useSession();

	if (dashboardDataQuery?.status === 'error') signOut({ redirect: true, callbackUrl: '/signin' });
	if (dashboardDataQuery?.status === 'loading' || dashboardDataQuery?.status === 'error' || !dashboardDataQuery?.data || !session)
		return <LoadingDashboardData />;

	return (
		<>
			<UserStats {...dashboardDataQuery?.data?.userStats} />
			<Ranking {...dashboardDataQuery?.data?.rank} />
		</>
	);
}
