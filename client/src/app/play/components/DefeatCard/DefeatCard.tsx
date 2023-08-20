'use client';

import './defeatCard.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DefeatCard({ startNewGame }: { startNewGame: () => Promise<void> }) {
	const { data: session, status } = useSession();
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
