'use client';

import Image from 'next/image';
import axios from 'axios';
import { useFormik } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import LoadingSkeleton from '../components/LoadingSkeleton/LoadingSkeleton';

export interface userLogin {
	email: string;
	password: string;
}

export default function SignInForms() {
	const [userLogged, setUserLogged] = useState(false);
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
			setUserLogged(true);
			const res = await axios.post('/api/signin', user);
			const userLogged = await res.data;
			await signIn('credentials', {
				id: userLogged.id,
				name: userLogged.name,
				email: userLogged.email,
				password: user.password,
				accessToken: userLogged.accessToken,
				refreshToken: userLogged.refreshToken,
				redirect: false,
			});
			redirect('/dashboard');
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
			{userLogged ? <LoadingSkeleton /> : <></>}
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
				<button
					type="submit"
					disabled={userLogged ? true : false}>
					Sign In
				</button>
			</form>
			<div className="signin-google">
				<button
					type="button"
					disabled={userLogged ? true : false}
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
