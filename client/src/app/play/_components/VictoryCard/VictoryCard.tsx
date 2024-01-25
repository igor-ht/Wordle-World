import './victoryCard.scss';
import VictoryDefeatCard from '@/app/_components/common/Victory&DefeatCard/Victory&DefeatCard';
import GameContext, { GameApiContextType } from '@/utils/play/context/context';
import { useContext } from 'react';

export default function VictoryCard() {
	const { gameState, startNewGame } = useContext(GameContext) as GameApiContextType;

	return (
		<div className="victory-background">
			<div className="pyro">
				<div className="before"></div>
				<div className="after"></div>
			</div>
			<VictoryDefeatCard
				startNewGame={startNewGame}
				imgUrl="/well-done.svg"
				imgAlt="Well Done!">
				<p>
					Nice work! The word was &apos;<u>{gameState.currentGuess.toLowerCase()}</u>&apos; and you got it right!
					<br />
					Keep playing and improving yourself and your vocabulary!
				</p>
			</VictoryDefeatCard>
		</div>
	);
}
