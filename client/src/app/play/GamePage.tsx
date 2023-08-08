'use client';

import './gamePage.scss';
import useStartGame from '@/utils/play/useStartGame';
import StartGame from './components/StartGame/StartGame';
import InputContainer from './components/InputContainer/InputContainer';
import KeyboardContainer from './components/KeyboardContainer/KeyboardContainer';
import VictoryCard from './components/VictoryCard/VictoryCard';
import DefeatCard from './components/DefeatCard/DefeatCard';
import GuestLimitGames from './components/GuestLimitGames/GuestLimitGames';

export default function GamePage() {
	const {
		playState,
		startNewGame,
		gameSettings,
		gameState,
		currentInputElement,
		handleKeyPressedFromDigitalKeyboard,
		keyboardContainerElement,
		handleResetGame,
		guestLimitGames,
	} = useStartGame();

	return (
		<div className="game-container">
			{!guestLimitGames && !playState.play && <StartGame startNewGame={startNewGame} />}
			{!guestLimitGames && playState.play && (
				<>
					<InputContainer
						gameSettings={gameSettings}
						currentInputElement={currentInputElement}
					/>
					<KeyboardContainer
						handleKeyPressedFromDigitalKeyboard={handleKeyPressedFromDigitalKeyboard}
						keyboardContainerElement={keyboardContainerElement}
					/>
				</>
			)}
			{playState?.victory && !playState?.defeat && (
				<VictoryCard
					gameState={gameState}
					handleResetGame={handleResetGame}
				/>
			)}
			{playState?.defeat && !playState?.victory && <DefeatCard handleResetGame={handleResetGame} />}
			{guestLimitGames && <GuestLimitGames />}
		</div>
	);
}
