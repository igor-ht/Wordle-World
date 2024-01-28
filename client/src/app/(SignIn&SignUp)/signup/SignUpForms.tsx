'use client';

import { signUpSchema } from '@/utils/forms/validating';
import { useState } from 'react';
import { UserSignUpType, useSignUp } from '@/utils/forms/useForms';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '../_components/Input';
import Form from '../_components/Form';

export default function SignUpForms() {
	const [userLogged, setUserLogged] = useState(false);

	const formContext = useForm<UserSignUpType>({
		defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
		resolver: yupResolver(signUpSchema),
	});

	const { setError } = formContext;

	const handleSignUp = useSignUp({ setUserLogged, setError });

	return (
		<FormProvider {...formContext}>
			<Form
				userLogged={userLogged}
				setUserLogged={setUserLogged}
				onSubmit={(data) => handleSignUp.mutate(data)}
				buttonText={'Sign Up'}>
				<div className="input-box">
					<Input
						label="Name"
						type="text"
						name="name"
						placeholder="your name"
					/>
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
					<Input
						label="Confirm Password"
						type="password"
						name="confirmPassword"
						placeholder="confirm your password"
					/>
				</div>
			</Form>
		</FormProvider>
	);
}
