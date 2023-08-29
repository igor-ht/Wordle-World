import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function UserLogged() {
	const { data: session } = useSession();
	return (
		<>
			{session?.name ? (
				<div className={'user-logged'}>
					<p className="user-greet">
						Hello,{' '}
						<Link
							href={'/dashboard'}
							title="go to your dashboard">
							{session.name}
						</Link>
					</p>
					<button
						type="button"
						className="btn-logout"
						onClick={() =>
							signOut({
								redirect: true,
								callbackUrl: '/',
							})
						}>
						Sign out
					</button>
				</div>
			) : (
				<></>
			)}
		</>
	);
}
