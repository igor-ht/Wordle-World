// The Sign Up method depends on handleing the password hashing at route ('api/signup')

'use client';

import Image from 'next/image';
import axios, { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { SignupSchema } from '@/src/utils/forms/validating';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import LoadingSkeleton from '../components/LoadingSkeleton/LoadingSkeleton';
import { useMutation } from '@tanstack/react-query';
import { BASE_URL } from '@/src/appConfig';
import { useRouter } from 'next/navigation';

export interface userSignUp {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export default function SignUpForms() {
	const [userLogged, setUserLogged] = useState(false);
	const formik = useFormik<userSignUp>({
		initialValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: SignupSchema,
		onSubmit: async () => await handleSignUp(),
	});
	const router = useRouter();

	const handleSignUpMutation = useMutation({
		mutationKey: ['SignUp'],
		mutationFn: async () => {
			try {
				const res = await axios.post('/api/signup', formik.values, { baseURL: BASE_URL });
				return await res.data;
			} catch (error) {
				if (error instanceof AxiosError) {
					if (error.response?.data === 'Email already registered.') formik.setFieldError('email', 'Email already registered');
					if (error.response?.data === 'Name already registered.') formik.setFieldError('name', 'Name already registered');
				}
			}
		},
	});

	const handleSignUp = async () => {
		try {
			setUserLogged(true);
			const userRegistrated = await handleSignUpMutation.mutateAsync();
			if (!userRegistrated || userRegistrated.error) throw new Error('Credentials not valid.');
			const userLogged = await signIn('credentials', {
				email: formik.values.email,
				password: formik.values.password,
				redirect: false,
			});
			if (!userLogged || userLogged.error) throw new Error('Credentials not valid.');
			router.push('/dashboard');
		} catch {
			setUserLogged(false);
		}
	};

	const handleGoogleSignUp = async () => {
		try {
			setUserLogged(true);
			const userLogged = await signIn('google', { redirect: false });
			if (!userLogged || userLogged.error) throw new Error('Could not authenticate with Google.');
			router.push('/dashboard');
		} catch {
			setUserLogged(false);
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
			{userLogged && <LoadingSkeleton />}
			<form onSubmit={formik.handleSubmit}>
				<div className="signup-form">
					<div className="input-box">
						<span>
							<label htmlFor="email">Name</label>
							<span className="error">{formik.touched.name && formik.errors.name}</span>
						</span>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="your name"
							required
							onChange={formik.handleChange}
							autoComplete="given-name"
							value={formik.values.name}
						/>
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
					</div>
					<div className="input-box">
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
						<span>
							<label htmlFor="email">Confirm Password</label>
							<span className="error">{formik.touched.confirmPassword && formik.errors.confirmPassword}</span>
						</span>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							placeholder="confirm password"
							required
							onChange={formik.handleChange}
							value={formik.values.confirmPassword}
						/>
					</div>
				</div>
				<button
					type="submit"
					disabled={userLogged}>
					Sign up
				</button>
			</form>
			<div className="signup-google">
				<button
					type="button"
					disabled={userLogged}
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
