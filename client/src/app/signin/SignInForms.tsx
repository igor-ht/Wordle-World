'use client';

import Image from 'next/image';
import axios from 'axios';
import { useFormik } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { NEXTAUTH_URL } from '@/src/appConfig';

export interface userLogin {
	email: string;
	password: string;
}

export default function SignInForms() {
	const { data: session, status } = useSession();
	const formik = useFormik<userLogin>({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async (data) => await handleLogin(data),
	});

	if (session && status === 'authenticated') return redirect('/dashboard');

	const handleLogin = async (user: userLogin) => {
		try {
			const res = await axios.post('/api/signin', user);
			const userLogged = await res.data;
			await signIn('credentials', {
				id: userLogged.id,
				name: userLogged.name,
				email: userLogged.email,
				password: user.password,
				accessToken: userLogged.accessToken,
				refreshToken: userLogged.refreshToken,
				redirect: true,
				callbackUrl: '/dashboard',
			});
		} catch {
			formik.setErrors({ email: `One or more fields are not valid.`, password: 'One or more fields are not valid.' });
		}
	};

	const handleGoogleLogin = async () => {
		try {
			return await signIn('google', {
				redirect: true,
				callbackUrl: '/dashboard',
			});
		} catch {
			formik.setErrors({ email: `We had a problem with the login proccess.`, password: 'We had a problem with the login proccess.' });
		}
	};

	return (
		<>
			{' '}
			<form
				method="POST"
				className={'signin-form'}
				onSubmit={formik.handleSubmit}>
				<span>
					<label htmlFor="email">Email</label>
					<span className="error">{formik.touched.email && formik.errors.email ? formik.errors.email : null}</span>
				</span>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="your_email@example.com"
					required
					onChange={formik.handleChange}
					autoComplete=""
					value={formik.values.email}
				/>
				<span>
					<label htmlFor="password">Password</label>
					<span className="error">{formik.touched.password && formik.errors.password ? formik.errors.password : null}</span>
				</span>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="your password"
					required
					onChange={formik.handleChange}
					autoComplete=""
					value={formik.values.password}
				/>
				<button type="submit">Sign in</button>
			</form>
			<div className="signin-google">
				<button
					type="button"
					onClick={handleGoogleLogin}>
					<Image
						src="/google.icon.svg"
						alt=""
						width={33}
						height={30}
					/>
					<p>Sign in with Google</p>
				</button>
			</div>
		</>
	);
}
