import './dashboard.scss';
import DashboardData from './components/DashboardData';

export default async function Page() {
	return (
		<div className={`dashboard-container`}>
			<DashboardData />
		</div>
	);
}
