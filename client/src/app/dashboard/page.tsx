import './dashboard.scss';
import UserStats from './components/UserStats/UserStats';
import Ranking from './components/Ranking/Ranking';

export default async function Page() {
	return (
		<div className={`dashboard-container`}>
			<UserStats />
			<Ranking />
		</div>
	);
}