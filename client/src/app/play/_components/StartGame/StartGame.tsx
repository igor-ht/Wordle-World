import './startGame.scss';
import Title from '@/app/_components/common/Title/Title';
import { useSession } from 'next-auth/react';
import GameSettings from './GameSettings/GameSettings';
import LinksSignInSignUp from '@/app/_components/common/LinksSignInSignUp/LinksSignInSignUp';

export default function StartGame() {
	const { status } = useSession();

	return (
		<div className="start-game">
			<div className="start-game-card">
				<Title text={'SETTINGS'} />
				<GameSettings />
				{status !== 'authenticated' && <LinksSignInSignUp />}
			</div>
		</div>
	);
}
