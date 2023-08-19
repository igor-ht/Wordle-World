import { BASE_URL, ENDPOINT } from '@/appConfig';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { FormikErrors, useFormik } from 'formik';
import { userSignUpType } from '@/app/(SignIn&SignUp)/signup/SignUpForms';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { userSignInType } from '@/app/(SignIn&SignUp)/signin/SignInForms';
import { AllFormTypes } from '@/app/(SignIn&SignUp)/components/Form';

export const useSignUp = (formik: ReturnType<typeof useFormik<userSignUpType>>, setUserLogged: Dispatch<SetStateAction<boolean>>) => {
	const router = useRouter();
	const handleSignUp = useMutation({
		mutationFn: async () => {
			try {
				setUserLogged(true);
				const hashedPassword = (await axios.post('/api/hash', formik.values.password, { baseURL: BASE_URL })).data;
				const newUser = {
					name: formik.values.name,
					email: formik.values.email,
					password: hashedPassword,
				};
				await axios.post(`/user/signup`, newUser, { baseURL: ENDPOINT });
				await signIn('credentials', {
					email: formik.values.email,
					password: formik.values.password,
					redirect: false,
				});
				router.push('/dashboard');
			} catch (error) {
				setUserLogged(false);
				if (error instanceof AxiosError) {
					if (error.response?.data === 'Email already registered.') formik.setFieldError('email', 'Email already registered');
					if (error.response?.data === 'Name already registered.') formik.setFieldError('name', 'Name already registered');
				}
			}
		},
	});
	return handleSignUp;
};

export const useSignIn = (formik: ReturnType<typeof useFormik<userSignInType>>, setUserLogged: Dispatch<SetStateAction<boolean>>) => {
	const router = useRouter();
	const handleSignIn = useMutation({
		mutationFn: async () => {
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
		},
	});

	return handleSignIn;
};

export const useGoogleOAuth = <T extends AllFormTypes>(
	formik: ReturnType<typeof useFormik<T>>,
	setUserLogged: Dispatch<SetStateAction<boolean>>
) => {
	const router = useRouter();

	const handleGoogleOAuth = useMutation({
		mutationFn: async () => {
			try {
				setUserLogged(true);
				const userLogged = await signIn('google', { redirect: false });
				if (!userLogged || userLogged.error) throw new Error('Could not authenticate with Google.');
				router.push('/dashboard');
			} catch {
				setUserLogged(false);
				setFormikError(formik.initialValues);
			}
		},
	});

	const setFormikError = (initialValues: AllFormTypes) => {
		if ('name' in initialValues) {
			formik.setErrors({
				name: `We had a problem with the login proccess.`,
				email: `We had a problem with the login proccess.`,
				password: `We had a problem with the login proccess.`,
				confirmPassword: `We had a problem with the login proccess.`,
			} as FormikErrors<T>);
		} else {
			formik.setErrors({
				email: `We had a problem with the login proccess.`,
				password: `We had a problem with the login proccess.`,
			} as FormikErrors<T>);
		}
	};

	return handleGoogleOAuth;
};
