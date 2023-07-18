import './homePage.scss';
import Image from 'next/image';
import Cube from './components/HomePageCube/Cube';

export default function Home() {
	return (
		<div className="home-page">
			<Image
				src={'/wordle-world.svg'}
				alt="wordle world"
				height={280}
				width={280}
				priority
			/>
			<Cube />
		</div>
	);
}
