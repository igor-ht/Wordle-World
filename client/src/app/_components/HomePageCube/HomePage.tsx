import './HomePage.scss';
import Cube from './Cube/Cube';
import Title from '../Title/Title';

export default function HomePage() {
	return (
		<div className="home-page">
			<Title text={'WELCOME'} />
			<Cube />
		</div>
	);
}
