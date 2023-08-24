import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { FormikValues, useFormik } from 'formik';
import { AllFormTypes } from './Form';
import { useGoogleOAuth } from '@/utils/forms/useForms';

type GoogleOAuthProps<T extends FormikValues> = {
	userLogged: boolean;
	setUserLogged: Dispatch<SetStateAction<boolean>>;
	formik: ReturnType<typeof useFormik<T>>;
};

export default function GoogleOAuth<T extends AllFormTypes>({ ...props }: GoogleOAuthProps<T>) {
	const { formik, userLogged, setUserLogged } = { ...props };

	const googleOAuth = useGoogleOAuth(formik, setUserLogged);

	const handleGoogleOAuth = async () => {
		googleOAuth.mutate();
	};

	return (
		<div className="oauth-google">
			<button
				type="button"
				className="btn-oauth-google"
				disabled={userLogged}
				onClick={handleGoogleOAuth}>
				<Image
					src="/google-icon.svg"
					className="google-icon"
					alt="google"
					width={33}
					height={33}
				/>
				<p>Sign In with Google</p>
			</button>
		</div>
	);
}
