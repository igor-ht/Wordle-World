import Image from 'next/image';
import SignUpForms from './SignUpForms';

export default function SignUp() {
	return (
		<>
			<Image
				src="/sign-up.svg"
				alt="Sign Up"
				unselectable="on"
				className="image-title"
				width={300}
				height={300}
				priority
				quality={1}
			/>
			<SignUpForms />
		</>
	);
}
