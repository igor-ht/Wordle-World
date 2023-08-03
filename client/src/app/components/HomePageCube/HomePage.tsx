import './HomePage.scss';
import Image from 'next/image';
import Cube from './Cube/Cube';

export default function HomePage() {
	return (
		<div className="home-page">
			<Image
				src={'/wordle-world.svg'}
				alt="wordle world"
				height={50}
				width={100}
				priority
				quality={1}
			/>
			<Cube />
		</div>
	);
}
