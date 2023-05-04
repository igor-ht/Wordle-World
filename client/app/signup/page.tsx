import './signup.scss';
import Image from 'next/image';
import SignUpForms from './SignUpForms';

export default function SignUp() {
	return (
		<div className="signup-box">
			<Image
				src="/sign-up.svg"
				alt="Sign Up"
				unselectable="on"
				width={300}
				height={300}
			/>
			<SignUpForms />
		</div>
	);
}
