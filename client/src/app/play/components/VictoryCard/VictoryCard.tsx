'use client';

import './victoryCard.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { GameStateType } from '@/utils/play/state/reducers';
import { useRouter } from 'next/navigation';

export default function VictoryCard({ gameState, startNewGame }: { gameState: GameStateType; startNewGame: () => Promise<void> }) {
	const { data: session, status } = useSession();

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
					{!!session && status === 'authenticated' ? (
						<button
							type="button"
							className="btn"
							onClick={handleNavigateToDashboard}>
							Dashboard
						</button>
					) : (
						<>
							<p>
								Doesn&apos;t have an account yet? <Link href="/signup">Sign up here</Link> and enjoy more!
							</p>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
