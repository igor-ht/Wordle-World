'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function UserLogged() {
	const { data: session } = useSession();
	return (
		<>
			{session?.user?.name ? (
				<div className={'user-logged'}>
					<p className="user-greet">
						Hello,{' '}
						<Link
							href={'/dashboard'}
							title="go to your dashboard">
							{session.user.name}
						</Link>
					</p>
					<button
						type="button"
						className={'signout-button'}
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
