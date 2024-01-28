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
				<li>
					<Link href={'/'}>Home</Link>
				</li>
				<li>
					<Link href={'/play'}>Play</Link>
				</li>
				{status === 'authenticated' ? (
					<li>
						<Link href={'/dashboard'}>Dashboard</Link>
					</li>
				) : (
					<>
						<li>
							<Link href={'/signin'}>Sign In</Link>
						</li>
						<li>
							<Link href={'/signup'}>Sign Up</Link>
						</li>
					</>
				)}
			</ul>
		</div>
	);
}
