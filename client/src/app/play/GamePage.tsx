'use client';

import './gamePage.scss';
import VictoryCard from './_components/VictoryCard/VictoryCard';
import DefeatCard from './_components/DefeatCard/DefeatCard';
import GuestLimitGames from './_components/GuestLimitGames/GuestLimitGames';
import StartGame from './_components/StartGame/StartGame';
import GameBoard from './_components/GameBoard/GameBoard';
import GameContext, { GameApiContextType } from '@/utils/play/context/context';
import { useContext } from 'react';

export default function GamePage() {
	const { playState } = useContext(GameContext) as GameApiContextType;

	const gameSatesMap = {
		start: <StartGame />,
		play: <GameBoard />,
		victory: <VictoryCard />,
		defeat: <DefeatCard />,
		guestLimit: <GuestLimitGames />,
	};

	const CurrentState = gameSatesMap[playState];

	return <div className="game-container">{CurrentState}</div>;
}
