import SignInForm from './SignInForms';
import Title from '@/app/_components/Title/Title';

export default function SignIn() {
	return (
		<>
			<Title text={`SIGN IN`} />
			<SignInForm />
		</>
	);
}
