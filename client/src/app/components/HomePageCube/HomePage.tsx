import Image from 'next/image';
import Cube from './Cube';

export default function HomePage() {
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
