'use client';

import './victoryCard.scss';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { gameStateType } from '@/src/utils/play/reducers';
import { useRouter } from 'next/navigation';

export default function VictoryCard({ gameState, handleResetGame }: { gameState: gameStateType; handleResetGame: () => Promise<void> }) {
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
				/>
				<section>
					<p>
						Nice work! The word was &apos;<u>{gameState.currentGuess.toLowerCase()}</u>&apos; and you got it right!
						<br />
						<br />
						Keep playing and improving yourself and your vocabulary!
					</p>
				</section>
				<div>
					<button
						type="button"
						onClick={handleResetGame}>
						Play Again
					</button>
					{!!session && status === 'authenticated' ? (
						<button
							type="button"
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
