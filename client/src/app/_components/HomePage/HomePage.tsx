import './HomePage.scss';
import Cube from './Cube/Cube';
import Title from '../common/Title/Title';

export default function HomePage() {
	return (
		<div className="home-page">
			<Title text={'WELCOME'} />
			<Cube />
		</div>
	);
}
