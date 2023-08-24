import { ChangeEvent } from 'react';

type InputProps = {
	label: string;
	type: string;
	name: string;
	placeholder: string;
	value: string;
	touched: boolean | undefined;
	error: string | undefined;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ ...props }: InputProps) {
	const { label, name, placeholder, type, handleChange, value, touched, error } = { ...props };

	return (
		<>
			<span>
				<label htmlFor={name}>{label}</label>
				<span className="error">{touched && error}</span>
			</span>
			<input
				type={type}
				id={name}
				name={name}
				placeholder={placeholder}
				onChange={handleChange}
				value={value}
				required
				autoComplete="given-name"
			/>
		</>
	);
}
