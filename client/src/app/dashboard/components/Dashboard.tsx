'use client';

import useDashboardData from '@/src/utils/dashboard/useDashboardData';
import Ranking from './Ranking/Ranking';
import UserStats from './UserStats/UserStats';

export default function Dashboard() {
	const dashboard = useDashboardData();

	return (
		<>
			<UserStats {...dashboard.userStats} />
			<Ranking {...dashboard.rank} />
		</>
	);
}
