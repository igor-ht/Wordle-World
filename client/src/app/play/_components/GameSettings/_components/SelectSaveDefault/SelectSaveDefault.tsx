import './SelectSaveDefault.scss';

export default function SelectSaveDefault() {
	return (
		<section className="field-section checkbox-container">
			<label
				className="label-field-section"
				htmlFor="save-default">
				Save as default:
			</label>
			<input
				type="checkbox"
				id="save-default"
				className="save-default"
				name="save-default"
				defaultChecked
			/>
		</section>
	);
}
