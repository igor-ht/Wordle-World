'use client';

import Input from '../_components/Input';
import Form from '../_components/Form';
import { useState } from 'react';
import { useSignIn } from '@/utils/forms/useForms';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema } from '@/utils/forms/validating';

export type UserSignInType = {
	email: string;
	password: string;
};

export default function SignInForms() {
	const [userLogged, setUserLogged] = useState(false);

	const formContext = useForm<UserSignInType>({ defaultValues: { email: '', password: '' }, resolver: yupResolver(signInSchema) });
	const { setError } = formContext;

	const handleSignIn = useSignIn({ setUserLogged, setError });

	return (
		<FormProvider {...formContext}>
			<Form
				userLogged={userLogged}
				setUserLogged={setUserLogged}
				onSubmit={(data) => handleSignIn.mutate(data)}
				buttonText={'Sign In'}>
				<div className="input-box">
					<Input
						label="Email"
						type="email"
						name="email"
						placeholder="your_email@example.com"
					/>
				</div>
				<div className="input-box">
					<Input
						label="Password"
						type="password"
						name="password"
						placeholder="your password"
					/>
				</div>
			</Form>
		</FormProvider>
	);
}
