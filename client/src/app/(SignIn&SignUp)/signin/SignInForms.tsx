'use client';

import { useFormik } from 'formik';
import { useState } from 'react';
import Input from '../_components/Input';
import Form from '../_components/Form';
import { useSignIn } from '@/utils/forms/useForms';

export type userSignInType = {
	email: string;
	password: string;
};

export default function SignInForms() {
	const [userLogged, setUserLogged] = useState(false);

	const formik = useFormik<userSignInType>({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: () => handleSignIn.mutate(),
	});

	const handleSignIn = useSignIn(formik, setUserLogged);

	return (
		<Form
			userLogged={userLogged}
			setUserLogged={setUserLogged}
			handleSubmit={formik.handleSubmit}
			buttonText={'Sign In'}
			formik={formik}>
			<div className="input-box">
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
			</div>
		</Form>
	);
}
