'use client';

import './defeatCard.scss';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LinksSignInSignUp from '@/app/_components/common/LinksSignInSignUp/LinksSignInSignUp';

export default function DefeatCard({ startNewGame }: { startNewGame: () => Promise<void> }) {
	const { status } = useSession();
	const router = useRouter();

	const handleNavigateToDashboard = async () => {
		router.push(`/dashboard`);
	};

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
			<div className="defeat-card">
				<Image
					src="/try-again.svg"
					alt="Try Again!"
					width={200}
					height={200}
					priority
					quality={1}
				/>
				<section>
					<p>
						You tried.
						<br />
						Well... Try harder next time.
					</p>
				</section>
				<div>
					<button
						type="button"
						className="btn"
						onClick={startNewGame}>
						Play again
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
