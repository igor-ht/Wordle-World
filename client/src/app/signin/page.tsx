import './signin.scss';
import Image from 'next/image';
import SignInForm from './SignInForms';

export default function SignIn() {
	return (
		<div className="signin-container">
			<div className="signin-box">
				<Image
					src="/log-in.svg"
					alt="Log In"
					unselectable="on"
					width={300}
					height={300}
				/>
				<SignInForm />
			</div>
		</div>
	);
}
