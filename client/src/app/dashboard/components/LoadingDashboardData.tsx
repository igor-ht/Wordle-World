import '../dashboard.scss';
import LoadingSkeleton from '../../components/LoadingSkeleton/LoadingSkeleton';
import RankingLoadingSkeleton from './Ranking/RankingLoadingSkeleton';
import UserStatsLoadingSkeleton from './UserStats/UserStatsLoadingSkeleton';

export default function LoadingDashboardData() {
	return (
		<div className={`dashboard-container`}>
			<UserStatsLoadingSkeleton />
			<RankingLoadingSkeleton />
			<LoadingSkeleton />
		</div>
	);
}
