import './HomePage.scss';
import Cube from './Cube/Cube';
import Title from '../common/Title/Title';

export default function HomePage() {
	return (
		<div className="home-page">
			<div className="title-wrapper">
				<Title text="WORDLE" />
				<Title text="WORLD" />
			</div>
			<Cube />
		</div>
	);
}
