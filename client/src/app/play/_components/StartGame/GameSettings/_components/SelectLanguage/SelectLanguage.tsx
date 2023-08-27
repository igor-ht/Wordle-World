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
