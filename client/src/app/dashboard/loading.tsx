import './dashboard.scss';
import RankingLoadingSkeleton from './components/Ranking/RankingLoadingSkeleton';
import UserStatsLoadingSkeleton from './components/UserStats/UserStatsLoadingSkeleton';

export default function Loading() {
	return (
		<div className={`dashboard-container`}>
			<UserStatsLoadingSkeleton />
			<RankingLoadingSkeleton />
		</div>
	);
}
