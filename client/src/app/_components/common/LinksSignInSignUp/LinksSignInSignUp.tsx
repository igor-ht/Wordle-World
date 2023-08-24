import './LinksSignInSignUp.scss';
import Link from 'next/link';

export default function LinksSignInSignUp() {
	return (
		<span className="links-signin-signup">
			<p className="link">
				Has an account already? <Link href={'/signin'}>Sign In here</Link>
			</p>
			<p className="link">
				Create a free account. <Link href={'/signup'}>Sign Up here</Link>
			</p>
		</span>
	);
}
