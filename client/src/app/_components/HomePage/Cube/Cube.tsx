import './Cube.scss';
import Image from 'next/image';

export default function Cube() {
	return (
		<div className="cube-container">
			<Image
				src={'/wordle-world.svg'}
				alt="wordle world"
				height={50}
				width={100}
				priority
				quality={1}
			/>
			<div className="cube">
				<div className="face welcome"></div>
				<div className="face account"></div>
				<div className="face info"></div>
				<div className="face how-to-play"></div>
				<div className="face top"></div>
				<div className="face bottom"></div>
			</div>
		</div>
	);
}
