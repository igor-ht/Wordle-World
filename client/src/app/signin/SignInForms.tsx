'use client';

import Image from 'next/image';
import axios from 'axios';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import LoadingSkeleton from '../components/LoadingSkeleton/LoadingSkeleton';
import { useMutation } from '@tanstack/react-query';

export interface userLogin {
	email: string;
	password: string;
}

export default function SignInForms() {
	const [userLogged, setUserLogged] = useState(false);
	const formik = useFormik<userLogin>({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async () => await handleLogin(),
	});

	const handleLoginMutation = useMutation({
		mutationKey: ['login'],
		mutationFn: async () => {
			const res = await axios.post('/api/signin', formik.values);
			return await res.data;
		},
		cacheTime: Infinity,
	});

	const handleLogin = async () => {
		try {
			setUserLogged(true);
			const userSignIn = await handleLoginMutation.mutateAsync();
			if (handleLoginMutation.status === 'error') throw new Error();
			await signIn('credentials', {
				id: userSignIn.id,
				name: userSignIn.name,
				email: userSignIn.email,
				password: formik.values.password,
				accessToken: userSignIn.accessToken,
				refreshToken: userSignIn.refreshToken,
				redirect: true,
				callbackUrl: '/dashboard',
			});
		} catch {
			setUserLogged(false);
			formik.setErrors({ email: `One or more fields are not valid.`, password: 'One or more fields are not valid.' });
		}
	};

	const handleGoogleLogin = async () => {
		try {
			setUserLogged(true);
			await signIn('google', {
				redirect: true,
				callbackUrl: '/dashboard',
			});
		} catch {
			setUserLogged(false);
			formik.setErrors({ email: `We had a problem with the login proccess.`, password: 'We had a problem with the login proccess.' });
		}
	};

	return (
		<>
			{userLogged && <LoadingSkeleton />}
			<form
				method="POST"
				className={'signin-form'}
				onSubmit={formik.handleSubmit}>
				<span>
					<label htmlFor="email">Email</label>
					<span className="error">{formik.touched.email && formik.errors.email}</span>
				</span>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="your_email@example.com"
					required
					onChange={formik.handleChange}
					autoComplete="email"
					value={formik.values.email}
				/>
				<span>
					<label htmlFor="password">Password</label>
					<span className="error">{formik.touched.password && formik.errors.password}</span>
				</span>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="your password"
					required
					onChange={formik.handleChange}
					value={formik.values.password}
				/>
				<button
					type="submit"
					disabled={userLogged}>
					Sign In
				</button>
			</form>
			<div className="signin-google">
				<button
					type="button"
					disabled={userLogged}
					onClick={handleGoogleLogin}>
					<Image
						src="/google.icon.svg"
						alt=""
						width={33}
						height={30}
					/>
					<p>Sign In with Google</p>
				</button>
			</div>
		</>
	);
}
