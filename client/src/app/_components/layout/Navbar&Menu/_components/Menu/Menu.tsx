import './Menu.scss';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useClickOutsideMenu } from '@/utils/hooks/useClickOutsideMenu';
import { AppSounds } from '@/utils/general/sounds';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

type MenuPropsType = {
	menuRef: MutableRefObject<HTMLDivElement | null>;
	displayMenu: boolean;
	setDisplayMenu: Dispatch<SetStateAction<boolean>>;
};

export default function Menu({ menuRef, displayMenu, setDisplayMenu }: MenuPropsType) {
	const { status } = useSession();

	useClickOutsideMenu(menuRef, () => {
		// if menu is not open, do nothing
		if (!displayMenu) return;
		AppSounds?.toggleMenu?.play();
		menuRef.current!.classList.remove('open');
		setDisplayMenu(false);
	});

	return (
		<div
			ref={menuRef}
			className="menu-container">
			<h1 className="menu-title">Menu</h1>
			<ul>
				<Link href={'/'}>
					<li>Home</li>
				</Link>
				<Link href={'/play'}>
					<li>Play</li>
				</Link>
				{status === 'authenticated' ? (
					<Link href={'/dashboard'}>
						<li>Dashboard</li>
					</Link>
				) : (
					<>
						<Link href={'/signin'}>
							<li>Sign In</li>
						</Link>
						<Link href={'/signup'}>
							<li>Sign Up</li>
						</Link>
					</>
				)}
			</ul>
		</div>
	);
}
