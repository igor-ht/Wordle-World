import './layout.scss';

export default function SignInAndSignUpLayout({ children }: { children: React.ReactNode }) {
	return <div className="form-card">{children}</div>;
}
