'use client';

import './victoryCard.scss';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { GameStateType } from '@/utils/play/state/reducers';
import { useRouter } from 'next/navigation';
import LinksSignInSignUp from '@/app/_components/LinksSignInSignUp/LinksSignInSignUp';

export default function VictoryCard({ gameState, startNewGame }: { gameState: GameStateType; startNewGame: () => Promise<void> }) {
	const { status } = useSession();

	const router = useRouter();

	const handleNavigateToDashboard = async () => {
		router.push(`/dashboard`);
	};

	return (
		<div className="victory-background">
			<div className="pyro">
				<div className="before"></div>
				<div className="after"></div>
			</div>

			<div className="victory-card">
				<Image
					src="/well-done.svg"
					alt="Well Done!"
					width={200}
					height={200}
					priority
					quality={1}
				/>
				<section>
					<p>
						Nice work! The word was &apos;<u>{gameState.currentGuess.toLowerCase()}</u>&apos; and you got it right!
						<br />
						Keep playing and improving yourself and your vocabulary!
					</p>
				</section>
				<div>
					<button
						type="button"
						className="btn"
						onClick={startNewGame}>
						Play Again
					</button>
					{status !== 'authenticated' ? (
						<LinksSignInSignUp />
					) : (
						<button
							type="button"
							className="btn"
							onClick={handleNavigateToDashboard}>
							Dashboard
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
