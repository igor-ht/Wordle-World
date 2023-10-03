import './Victory&DefeatCard.scss';
import Image from 'next/image';
import LinksSignInSignUp from '@/app/_components/common/LinksSignInSignUp/LinksSignInSignUp';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
	startNewGame: () => Promise<void>;
	imgUrl: string;
	imgAlt: string;
	children: React.ReactNode;
};

export default function VictoryDefeatCard({ startNewGame, imgUrl, imgAlt, children }: Props) {
	const { status } = useSession();
	const router = useRouter();

	const handleNavigateToDashboard = async () => {
		router.push(`/dashboard`);
	};
	return (
		<div className="game-result-card">
			<Image
				src={imgUrl}
				alt={imgAlt}
				width={200}
				height={200}
				priority
				quality={1}
			/>
			<section>{children}</section>
			<div>
				<button
					type="button"
					className="btn"
					onClick={startNewGame}>
					Play again
				</button>
				{status === 'unauthenticated' ? (
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
	);
}
