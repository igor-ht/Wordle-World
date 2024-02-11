import { BASE_URL, ENDPOINT } from '@/appConfig';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { UseFormSetError } from 'react-hook-form';

// sign up
export type UserSignUpType = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export const useSignUp = ({
	setUserLogged,
	setError,
}: {
	setUserLogged: Dispatch<SetStateAction<boolean>>;
	setError: UseFormSetError<UserSignUpType>;
}) => {
	const handleSignUp = useMutation({
		mutationFn: async (data: UserSignUpType) => {
			try {
				setUserLogged(true);
				await axios.post(
					`/user/signup`,
					{
						name: data.name,
						email: data.email,
						password: data.password,
					},
					{ baseURL: ENDPOINT }
				);
				await signIn('credentials', {
					email: data.email,
					password: data.password,
					redirect: true,
					callbackUrl: `${BASE_URL}/dashboard`,
				});
			} catch (error) {
				setUserLogged(false);
				if (error instanceof AxiosError) {
					if (error.response?.data === 'Name already registered.') setError('name', { message: 'Name already registered' });
					else if (error.response?.data === 'Email already registered.') setError('email', { message: 'Email already registered' });
				}
			}
		},
	});
	return handleSignUp;
};

//sign in
export type UserSignInType = {
	email: string;
	password: string;
};

export const useSignIn = ({
	setUserLogged,
	setError,
}: {
	setUserLogged: Dispatch<SetStateAction<boolean>>;
	setError: UseFormSetError<UserSignInType>;
}) => {
	const router = useRouter();
	const handleSignIn = useMutation({
		mutationFn: async (data: UserSignInType) => {
			try {
				setUserLogged(true);
				const userLogged = await signIn('credentials', {
					email: data.email,
					password: data.password,
					redirect: false,
				});
				if (userLogged?.error) throw new Error('Credentials not valid.');
				router.push('/dashboard');
			} catch {
				setUserLogged(false);
				setError('email', { message: `One or more fields are not valid.` });
				setError('password', { message: `One or more fields are not valid.` });
			}
		},
	});

	return handleSignIn;
};

// google oauth
export const useGoogleOAuth = (
	setUserLogged: Dispatch<SetStateAction<boolean>>,
	setError: UseFormSetError<UserSignInType | UserSignUpType>
) => {
	const handleGoogleOAuth = useMutation({
		mutationFn: async () => {
			try {
				setUserLogged(true);
				await signIn('google');
			} catch {
				setUserLogged(false);
				setError('name', { message: `We had a problem in the proccess.` });
				setError('email', { message: `We had a problem in the proccess.` });
				setError('password', { message: `We had a problem in the proccess.` });
				setError('confirmPassword', { message: `We had a problem in the proccess.` });
			}
		},
	});

	return handleGoogleOAuth;
};
