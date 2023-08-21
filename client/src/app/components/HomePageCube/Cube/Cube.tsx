import './Cube.scss';

export default function Cube() {
	return (
		<div className="cube-container">
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
