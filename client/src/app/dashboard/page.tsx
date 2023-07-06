import './dashboard.scss';
import Dashboard from './components/Dashboard';

export default async function Page() {
	return (
		<div className={`dashboard-container`}>
			<Dashboard />
		</div>
	);
}
