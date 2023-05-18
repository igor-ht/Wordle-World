'use client';

import Image from 'next/image';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { SignupSchema } from '@/src/utils/forms/validating';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { BASE_URL } from '@/src/appConfig';

export interface userSignUp {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export default function SignUpForms() {
	const { data: session, status } = useSession();

	const formik = useFormik<userSignUp>({
		initialValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: SignupSchema,
		onSubmit: async (data) => await handleSignUp(data),
	});

	if (session && status === 'authenticated') return redirect('/dashboard');

	const handleSignUp = async (user: userSignUp) => {
		try {
			const res = await axios.post('/api/signup', user);
			const userLogged = await res.data;
			await signIn('credentials', {
				id: userLogged.id,
				name: userLogged.name,
				email: user.email,
				password: user.password,
				accessToken: userLogged.accessToken,
				refreshToken: userLogged.refreshToken,
				redirect: true,
				callbackUrl: BASE_URL + '/dashboard',
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.data === 'Email already registered.') formik.setFieldError('email', 'Email already registered');
				if (error.response?.data === 'Name already registered.') formik.setFieldError('name', 'Name already registered');
			}
			return Promise.resolve(error);
		}
	};

	const handleGoogleSignUp = async () => {
		try {
			return await signIn('google', {
				redirect: true,
				callbackUrl: BASE_URL + '/dashboard',
			});
		} catch {
			formik.setErrors({
				name: 'We had a problem with the signup proccess',
				email: 'We had a problem with the signup proccess',
				password: 'We had a problem with the signup proccess',
				confirmPassword: 'We had a problem with the signup proccess',
			});
		}
	};

	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<div className="signup-form">
					<div className="input-box">
						<span>
							<label htmlFor="email">Name</label>
							<span className="error">{formik.touched.name && formik.errors.name ? formik.errors.name : null}</span>
						</span>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="your name"
							required
							onChange={formik.handleChange}
							autoComplete=""
							value={formik.values.name}
						/>
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
					</div>
					<div className="input-box">
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
						<span>
							<label htmlFor="email">Confirm Password</label>
							<span className="error">
								{formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}
							</span>
						</span>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							placeholder="confirm password"
							required
							onChange={formik.handleChange}
							autoComplete=""
							value={formik.values.confirmPassword}
						/>
					</div>
				</div>
				<button type="submit">Sign up</button>
			</form>
			<div className="signup-google">
				<button
					type="button"
					onClick={handleGoogleSignUp}>
					<Image
						src="/google.icon.svg"
						alt=""
						width={33}
						height={30}
					/>
					<p>Sign up with Google</p>
				</button>
			</div>
		</>
	);
}
