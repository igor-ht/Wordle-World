import './victoryCard.scss';
import VictoryDefeatCard from '@/app/_components/common/Victory&DefeatCard/Victory&DefeatCard';
import { GameStateType } from '@/utils/play/state/reducers';

export default function VictoryCard({ gameState, startNewGame }: { gameState: GameStateType; startNewGame: () => Promise<void> }) {
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
