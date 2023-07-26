'use client';

import Image from 'next/image';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import LoadingSkeleton from '../components/LoadingSkeleton/LoadingSkeleton';
import { useRouter } from 'next/navigation';

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
	const router = useRouter();

	const handleLogin = async () => {
		try {
			setUserLogged(true);
			const userLogged = await signIn('credentials', {
				email: formik.values.email,
				password: formik.values.password,
				redirect: false,
			});
			if (!userLogged || userLogged.error) throw new Error('Credentials not valid.');
			router.push('/dashboard');
		} catch {
			setUserLogged(false);
			formik.setErrors({ email: `One or more fields are not valid.`, password: 'One or more fields are not valid.' });
		}
	};

	const handleGoogleLogin = async () => {
		try {
			setUserLogged(true);
			const userLogged = await signIn('google', { redirect: false });
			if (!userLogged || userLogged.error) throw new Error('Could not authenticate with Google.');
			router.push('/dashboard');
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
