import './startGame.scss';
import { GameSettingsType } from '@/utils/play/state/reducers';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Title from '@/app/_components/Title/Title';
import GameSettings from '../GameSettings/GameSettings';
import LinksSignInSignUp from '@/app/_components/LinksSignInSignUp/LinksSignInSignUp';

interface IStartGame {
	gameSettings: GameSettingsType;
	startNewGame: () => Promise<void>;
}

export default function StartGame({ gameSettings, startNewGame }: IStartGame) {
	const { status } = useSession();

	return (
		<div className="start-game">
			<div className="start-game-card">
				<Title text={'SETTINGS'} />
				<GameSettings startNewGame={startNewGame} />
				{status !== 'authenticated' && <LinksSignInSignUp />}
			</div>
		</div>
	);
}
