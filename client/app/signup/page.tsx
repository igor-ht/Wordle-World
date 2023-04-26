import './signup.scss';
import Image from 'next/image';
import SignUpForms from './SignUpForms';

export default function SignUp() {
	return (
		<div className={'signup-container'}>
			<div className="signup-box">
				<Image
					src="/sign-up.png"
					alt="Sign Up"
					unselectable="on"
					width={500}
					height={500}
				/>
				<SignUpForms />
			</div>
		</div>
	);
}
