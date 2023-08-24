import './SelectLanguage.scss';
import { ChangeEvent } from 'react';

export default function SelectLanguage({ handleChange }: { handleChange: (e: ChangeEvent<HTMLElement>) => void }) {
	return (
		<section className="field-section select-container">
			<label
				className="label-field-section"
				htmlFor="language-select">
				Choose a language:
			</label>
			<select
				name="language"
				className="custom-select"
				id="language-select"
				onChange={handleChange}
				required>
				<option value="">--Choose an option--</option>
				<option value="en">English</option>
				<option
					value="es"
					disabled>
					Spanish
				</option>
				<option
					value="pt"
					disabled>
					Portuguese
				</option>
				<option
					value="he"
					disabled>
					Hebrew
				</option>
			</select>
		</section>
	);
}
