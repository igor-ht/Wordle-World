import './defeatCard.scss';
import VictoryDefeatCard from '@/app/_components/common/Victory&DefeatCard/Victory&DefeatCard';

export default function DefeatCard({ startNewGame }: { startNewGame: () => Promise<void> }) {
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
