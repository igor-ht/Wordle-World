import './defeatCard.scss';
import GameContext, { GameApiContextType } from '@/utils/play/context/context';
import VictoryDefeatCard from '@/app/_components/common/Victory&DefeatCard/Victory&DefeatCard';
import { useContext } from 'react';

export default function DefeatCard() {
	const { startNewGame } = useContext(GameContext) as GameApiContextType;

	return (
		<div className="defeat-background">
			<div className="area">
				<ul className="circles">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
			<VictoryDefeatCard
				startNewGame={startNewGame}
				imgUrl="/try-again.svg"
				imgAlt="Try Again!">
				<p>
					You tried.
					<br />
					Well... Try harder next time.
				</p>
			</VictoryDefeatCard>
		</div>
	);
}
