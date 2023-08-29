import './Buttons.scss';
import { Dispatch, SetStateAction } from 'react';

export default function Buttons({ setShowHowToPlay }: { setShowHowToPlay: Dispatch<SetStateAction<boolean>> }) {
	return (
		<div className="helper-buttons-container">
			<button
				type="submit"
				className="btn play">
				Play
			</button>
			<button
				type="button"
				className="btn-how-to-play"
				title="how to play"
				onClick={() => setShowHowToPlay(true)}>
				❔
			</button>
		</div>
	);
}
