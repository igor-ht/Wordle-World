import './gameSettings.scss';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { GameSettingsType } from '@/utils/play/state/reducers';
import SelectLanguage from './_components/SelectLanguage/SelectLanguage';
import SelectWordLength from './_components/SelectWordLength/SelectWordLength';
import SelectSaveDefault from './_components/SelectSaveDefault/SelectSaveDefault';
import Buttons from './_components/Buttons/Buttons';
import HowToPlay from './_components/HowToPlay/HowToPlay';
import GameContext, { GameApiContextType } from '@/utils/play/context/context';

export default function GameSettings() {
	const { gameSettings, startNewGame } = useContext(GameContext) as GameApiContextType;
	const [showHowToPlay, setShowHowToPlay] = useState(false);
	const { handleSubmit, register } = useForm<GameSettingsType>({
		defaultValues: gameSettings.current,
	});

	const onSubmit = (data: GameSettingsType) => {
		gameSettings.current = {
			language: data.language,
			wordLength: +data.wordLength,
			totalChances: +data.totalChances,
		};
		startNewGame();
	};

	return (
		<div className="game-settings">
			<form
				className="game-settings-form"
				onSubmit={handleSubmit(onSubmit)}>
				<SelectLanguage register={register} />
				<SelectWordLength register={register} />
				<SelectSaveDefault />
				<Buttons setShowHowToPlay={setShowHowToPlay} />
			</form>
			<HowToPlay
				showHowToPlay={showHowToPlay}
				setShowHowToPlay={setShowHowToPlay}
			/>
		</div>
	);
}
