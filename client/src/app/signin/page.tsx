import './signin.scss';
import Image from 'next/image';
import SignInForm from './SignInForms';

export default function SignIn() {
	return (
		<div className="signin-card">
			<Image
				src="/log-in.svg"
				alt="Log In"
				className="image-title"
				unselectable="on"
				width={300}
				height={300}
				priority
				quality={1}
			/>
			<SignInForm />
		</div>
	);
}
