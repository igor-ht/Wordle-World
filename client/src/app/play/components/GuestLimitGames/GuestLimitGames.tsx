import './guestLimitGames.scss';
import Link from 'next/link';

export default function GuestLimitGames() {
	return (
		<div className="guess-limit-games">
			<div className="guess-card">
				<p>
					Hey there! I hope you are having fun and got some right guesses!
					<br />
					Unfortunetly as a guest you can play only three times a day, but if you registrate you will be able to play as much as you want
					and enjoy more features.
					<br />
					And of course it&apos;s everything free! What are you waiting for?
				</p>
				<Link href={'/signup'}>
					<button type="button">Registrate now</button>
				</Link>
			</div>
		</div>
	);
}
