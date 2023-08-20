'use client';

import { useFormik } from 'formik';
import { SignupSchema } from '@/utils/forms/validating';
import { useState } from 'react';
import { useSignUp } from '@/utils/forms/api';
import Input from '../components/Input';
import Form from '../components/Form';

export type userSignUpType = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export default function SignUpForms() {
	const [userLogged, setUserLogged] = useState(false);

	const formik = useFormik<userSignUpType>({
		initialValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: SignupSchema,
		onSubmit: () => handleSignUp.mutate(),
	});

	const handleSignUp = useSignUp(formik, setUserLogged);

	return (
		<Form
			userLogged={userLogged}
			setUserLogged={setUserLogged}
			handleSubmit={formik.handleSubmit}
			buttonText={'Sign Up'}
			formik={formik}>
			<div className="input-box">
				<Input
					label="Name"
					type="text"
					name="name"
					placeholder="your name"
					handleChange={formik.handleChange}
					value={formik.values.name}
					touched={formik.touched.name}
					error={formik.errors.name}
				/>
				<Input
					label="Email"
					type="email"
					name="email"
					placeholder="your_email@example.com"
					handleChange={formik.handleChange}
					value={formik.values.email}
					touched={formik.touched.email}
					error={formik.errors.email}
				/>
			</div>
			<div className="input-box">
				<Input
					label="Password"
					type="password"
					name="password"
					placeholder="your password"
					handleChange={formik.handleChange}
					value={formik.values.password}
					touched={formik.touched.password}
					error={formik.errors.password}
				/>
				<Input
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					placeholder="confirm your password"
					handleChange={formik.handleChange}
					value={formik.values.confirmPassword}
					touched={formik.touched.confirmPassword}
					error={formik.errors.confirmPassword}
				/>
			</div>
		</Form>
	);
}
