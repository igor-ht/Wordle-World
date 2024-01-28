import { UserSignInType, UserSignUpType } from '@/utils/forms/useForms';
import { useFormContext } from 'react-hook-form';

type InputProps = {
	label: string;
	type: string;
	name: keyof UserSignInType | keyof UserSignUpType;
	placeholder: string;
};

export default function Input(props: InputProps) {
	const { label, type, name, placeholder } = { ...props };

	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<>
			<span>
				<label htmlFor={name}>{label}</label>
				<span className="error">{errors[name]?.message as string}</span>
			</span>
			<input
				{...register(name)}
				type={type}
				id={name}
				name={name}
				placeholder={placeholder}
				required
				autoComplete="given-name"
			/>
		</>
	);
}
