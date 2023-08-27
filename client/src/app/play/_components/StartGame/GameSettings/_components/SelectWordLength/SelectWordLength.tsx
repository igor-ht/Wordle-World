import './SelectWordLength.scss';
import { ChangeEvent } from 'react';

export default function SelectWordLength({ handleChange }: { handleChange: (e: ChangeEvent<HTMLElement>) => void }) {
	return (
		<section className="field-section radio-container">
			<label className="label-field-section">Choose a word length:</label>
			<span className="input-radio-wrapper">
				<input
					type="radio"
					name="wordLength"
					value={4}
					id="wordlength4"
					onChange={handleChange}
					disabled
					required
				/>
				<label htmlFor="wordlength4">4</label>
			</span>
			<span className="input-radio-wrapper">
				<input
					type="radio"
					name="wordLength"
					value={5}
					id="wordlength5"
					onChange={handleChange}
					checked
					required
				/>
				<label htmlFor="wordlength5">5</label>
			</span>
			<span className="input-radio-wrapper">
				<input
					type="radio"
					name="wordLength"
					value={6}
					id="wordlength6"
					onChange={handleChange}
					required
					disabled
				/>
				<label htmlFor="wordlength6">6</label>
			</span>
		</section>
	);
}
