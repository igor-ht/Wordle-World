import * as Yup from 'yup';

export const SignupSchema = Yup.object({
	name: Yup.string().min(4, 'At least 4 characters').max(50, 'Too Long').required('Required'),
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().min(6, 'At least 6 characters').max(50, 'Too Long').required('Required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match')
		.required('Required'),
});
