import './gameSettings.scss';
import { useFormik } from 'formik';
import { useState } from 'react';
import SelectLanguage from './_components/SelectLanguage/SelectLanguage';
import SelectWordLength from './_components/SelectWordLength/SelectWordLength';
import SelectSaveDefault from './_components/SelectSaveDefault/SelectSaveDefault';
import Buttons from './_components/Buttons/Buttons';
import HowToPlay from './_components/HowToPlay/HowToPlay';

type GameSettingsPropsT = {
	startNewGame: () => Promise<void>;
};

export default function GameSettings({ startNewGame }: GameSettingsPropsT) {
	const [showDialog, setShowDialog] = useState(false);
	const formik = useFormik({
		initialValues: {
			language: 'en',
			wordLength: 5,
		},
		onSubmit: () => {
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
