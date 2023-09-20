import LoadingSkeleton from '@/app/_components/common/LoadingSkeleton/LoadingSkeleton';
import SubmitButton from './SubmitButton';
import GoogleOAuth from './GoogleOAuth';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { UserSignInType } from '../signin/SignInForms';
import { UserSignUpType } from '../signup/SignUpForms';
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';

export type AllFormTypes = UserSignInType | UserSignUpType;

type FormType<T extends FieldValues> = {
	userLogged: boolean;
	setUserLogged: Dispatch<SetStateAction<boolean>>;
	onSubmit: SubmitHandler<any>;
	buttonText: string;
	children: ReactNode;
};

export default function Form({ ...props }: FormType<AllFormTypes>) {
	const { userLogged, setUserLogged, onSubmit, children, buttonText } = { ...props };

	const { handleSubmit } = useFormContext();

	return (
		<>
			{userLogged && <LoadingSkeleton />}
			<form
				method="post"
				className="form"
				onSubmit={handleSubmit(onSubmit)}>
				<div className="container">{children}</div>
				<SubmitButton
					userLogged={userLogged}
					text={buttonText}
				/>
			</form>
			<GoogleOAuth
				userLogged={userLogged}
				setUserLogged={setUserLogged}
				buttonText={buttonText}
			/>
		</>
	);
}
