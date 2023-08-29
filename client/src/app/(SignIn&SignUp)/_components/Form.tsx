import LoadingSkeleton from '@/app/_components/common/LoadingSkeleton/LoadingSkeleton';
import SubmitButton from './SubmitButton';
import GoogleOAuth from './GoogleOAuth';
import { Dispatch, FormEvent, ReactNode, SetStateAction } from 'react';
import { FormikValues, useFormik } from 'formik';
import { userSignInType } from '../signin/SignInForms';
import { userSignUpType } from '../signup/SignUpForms';

type FormType<T extends FormikValues> = {
	userLogged: boolean;
	setUserLogged: Dispatch<SetStateAction<boolean>>;
	handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
	children: ReactNode;
	buttonText: string;
	formik: ReturnType<typeof useFormik<T>>;
};

export type AllFormTypes = userSignInType | userSignUpType;

export default function Form<T extends AllFormTypes>({ ...props }: FormType<T>) {
	const { userLogged, setUserLogged, handleSubmit, children, buttonText, formik } = { ...props };

	return (
		<>
			{userLogged && <LoadingSkeleton />}
			<form
				method="post"
				className="form"
				onSubmit={handleSubmit}>
				<div className="container">{children}</div>
				<SubmitButton
					userLogged={userLogged}
					text={buttonText}
				/>
			</form>
			<GoogleOAuth
				userLogged={userLogged}
				setUserLogged={setUserLogged}
				formik={formik}
				buttonText={'name' in formik.initialValues ? 'Sign up' : 'Sign in'}
			/>
		</>
	);
}
