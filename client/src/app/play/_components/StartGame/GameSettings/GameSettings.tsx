import './gameSettings.scss';
import { useFormik } from 'formik';
import { MutableRefObject, useState } from 'react';
import { GameSettingsType } from '@/utils/play/state/reducers';
import SelectLanguage from './_components/SelectLanguage/SelectLanguage';
import SelectWordLength from './_components/SelectWordLength/SelectWordLength';
import SelectSaveDefault from './_components/SelectSaveDefault/SelectSaveDefault';
import Buttons from './_components/Buttons/Buttons';
import HowToPlay from './_components/HowToPlay/HowToPlay';

type GameSettingsPropsT = {
	gameSettings: MutableRefObject<GameSettingsType>;
	startNewGame: () => Promise<void>;
};

export default function GameSettings({ gameSettings, startNewGame }: GameSettingsPropsT) {
	const [showDialog, setShowDialog] = useState(false);
	const formik = useFormik<GameSettingsType>({
		initialValues: gameSettings.current,
		onSubmit: (values) => {
			gameSettings.current = {
				language: values.language,
				wordLength: +values.wordLength,
				totalChances: +values.totalChances,
			};
			startNewGame();
		},
	});

	return (
		<div className="game-settings">
			<form
				className="game-settings-form"
				onSubmit={formik.handleSubmit}>
				<SelectLanguage handleChange={formik.handleChange} />
				<SelectWordLength handleChange={formik.handleChange} />
				<SelectSaveDefault />
				<Buttons setShowDialog={setShowDialog} />
			</form>
			<HowToPlay
				showDialog={showDialog}
				setShowDialog={setShowDialog}
			/>
		</div>
	);
}
