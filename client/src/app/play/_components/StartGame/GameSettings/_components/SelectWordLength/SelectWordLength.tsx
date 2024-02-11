import './SelectWordLength.scss';
import { GameSettingsType } from '@/utils/play/state/reducers';
import { UseFormRegister } from 'react-hook-form';

export default function SelectWordLength({ register }: { register: UseFormRegister<GameSettingsType> }) {
	return (
		<section className="field-section radio-container">
			<label
				htmlFor="wordlength5"
				className="label-field-section">
				Choose a word length:
			</label>
			<span className="input-radio-wrapper">
				<input
					{...register('wordLength')}
					type="radio"
					name="wordLength"
					value={4}
					id="wordlength4"
					disabled
					required
				/>
				<label htmlFor="wordlength4">4</label>
			</span>
			<span className="input-radio-wrapper">
				<input
					{...register('wordLength')}
					type="radio"
					name="wordLength"
					value={5}
					id="wordlength5"
					checked
					required
				/>
				<label htmlFor="wordlength5">5</label>
			</span>
			<span className="input-radio-wrapper">
				<input
					{...register('wordLength')}
					type="radio"
					name="wordLength"
					value={6}
					id="wordlength6"
					required
					disabled
				/>
				<label htmlFor="wordlength6">6</label>
			</span>
		</section>
	);
}
