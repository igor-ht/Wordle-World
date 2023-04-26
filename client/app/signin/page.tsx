import './signin.scss';
import Image from 'next/image';
import SignInForm from './SignInForms';

export default function SignIn() {
	return (
		<div className="signin-container">
			<div className="signin-box">
				<Image
					src="/log-in.png"
					alt="Log In"
					unselectable="on"
					width={500}
					height={500}
				/>
				<SignInForm />
			</div>
		</div>
	);
}
