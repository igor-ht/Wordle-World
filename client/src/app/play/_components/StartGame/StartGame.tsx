import './startGame.scss';
import Title from '@/app/_components/common/Title/Title';
import { GameSettingsType } from '@/utils/play/state/reducers';
import { useSession } from 'next-auth/react';
import GameSettings from './GameSettings/GameSettings';
import LinksSignInSignUp from '@/app/_components/common/LinksSignInSignUp/LinksSignInSignUp';
import { MutableRefObject } from 'react';

interface IStartGame {
	gameSettings: MutableRefObject<GameSettingsType>;
	startNewGame: () => Promise<void>;
}

export default function StartGame({ gameSettings, startNewGame }: IStartGame) {
	const { status } = useSession();

	return (
		<div className="start-game">
			<div className="start-game-card">
				<Title text={'SETTINGS'} />
				<GameSettings
					gameSettings={gameSettings}
					startNewGame={startNewGame}
				/>
				{status !== 'authenticated' && <LinksSignInSignUp />}
			</div>
		</div>
	);
}
