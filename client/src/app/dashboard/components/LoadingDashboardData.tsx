import '../dashboard.scss';
import RankingLoadingSkeleton from './Ranking/RankingLoadingSkeleton';
import UserStatsLoadingSkeleton from './UserStats/UserStatsLoadingSkeleton';

export default function LoadingDashboardData() {
	return (
		<div className={`dashboard-container`}>
			<UserStatsLoadingSkeleton />
			<RankingLoadingSkeleton />
		</div>
	);
}
