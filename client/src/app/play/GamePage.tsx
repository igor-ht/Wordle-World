'use client';

import './gamePage.scss';
import useStartGame from '@/utils/play/useStartGame';
import Temp_StartGame from './_components/StartGame/Temp_StartGame';
import InputContainer from './_components/InputContainer/InputContainer';
import KeyboardContainer from './_components/KeyboardContainer/KeyboardContainer';
import VictoryCard from './_components/VictoryCard/VictoryCard';
import DefeatCard from './_components/DefeatCard/DefeatCard';
import GuestLimitGames from './_components/GuestLimitGames/GuestLimitGames';
import StartGame from './_components/StartGame/StartGame';

export default function GamePage() {
	const {
		playState,
		startNewGame,
		gameSettings,
		gameState,
		currentInputElement,
		keyboardContainerElement,
		handleKeyPressedFromDigitalKeyboard,
	} = useStartGame();

	return (
		<div className="game-container">
			{playState === 'start' && (
				<StartGame
					gameSettings={gameSettings}
					startNewGame={startNewGame}
				/>
			)}
			{playState === 'play' && (
				<>
					<InputContainer
						gameSettings={gameSettings}
						currentInputElement={currentInputElement}
					/>
					<KeyboardContainer
						keyboardContainerElement={keyboardContainerElement}
						handleKeyPressedFromDigitalKeyboard={handleKeyPressedFromDigitalKeyboard}
					/>
				</>
			)}
			{playState === 'victory' && (
				<VictoryCard
					gameState={gameState}
					startNewGame={startNewGame}
				/>
			)}
			{playState === 'defeat' && <DefeatCard startNewGame={startNewGame} />}
			{playState === 'guestLimit' && <GuestLimitGames />}
		</div>
	);
}
