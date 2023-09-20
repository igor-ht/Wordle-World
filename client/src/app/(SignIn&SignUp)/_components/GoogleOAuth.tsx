import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { useGoogleOAuth } from '@/utils/forms/useForms';
import { useFormContext } from 'react-hook-form';

type GoogleOAuthProps = {
	userLogged: boolean;
	setUserLogged: Dispatch<SetStateAction<boolean>>;
	buttonText: string;
};

export default function GoogleOAuth({ ...props }: GoogleOAuthProps) {
	const { userLogged, setUserLogged, buttonText } = { ...props };

	const { setError } = useFormContext();

	const googleOAuth = useGoogleOAuth(setUserLogged, setError);

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
				<p>{buttonText} with Google</p>
			</button>
		</div>
	);
}
