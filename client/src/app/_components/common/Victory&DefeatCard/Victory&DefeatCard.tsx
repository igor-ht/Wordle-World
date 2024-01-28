import './Victory&DefeatCard.scss';
import Image from 'next/image';
import LinksSignInSignUp from '@/app/_components/common/LinksSignInSignUp/LinksSignInSignUp';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes, FC } from 'react';

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
				<Button
					type="button"
					className="btn"
					onClick={startNewGame}
					buttonText={'Play again'}
				/>

				{status === 'authenticated' ? (
					<Button
						type="button"
						className="btn"
						onClick={handleNavigateToDashboard}
						buttonText={'Dashboard'}
					/>
				) : (
					<LinksSignInSignUp />
				)}
			</div>
		</div>
	);
}

const Button: FC<{ buttonText: string } & ButtonHTMLAttributes<HTMLButtonElement>> = ({ buttonText, ...props }) => {
	return <button {...props}>{buttonText}</button>;
};
