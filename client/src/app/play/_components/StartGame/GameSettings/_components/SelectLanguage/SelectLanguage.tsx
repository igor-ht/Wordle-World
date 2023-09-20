import { GameSettingsType } from '@/utils/play/state/reducers';
import { UseFormRegister } from 'react-hook-form';
import './SelectLanguage.scss';

export default function SelectLanguage({ register }: { register: UseFormRegister<GameSettingsType> }) {
	return (
		<section className="field-section select-container">
			<label
				className="label-field-section"
				htmlFor="language-select">
				Choose a language:
			</label>
			<select
				{...register}
				name="language"
				className="custom-select"
				id="language-select"
				defaultValue="EN"
				required>
				<option value="EN">English</option>
				<option
					value="ES"
					disabled>
					Spanish
				</option>
				<option
					value="PT"
					disabled>
					Portuguese
				</option>
				<option
					value="HE"
					disabled>
					Hebrew
				</option>
			</select>
		</section>
	);
}
