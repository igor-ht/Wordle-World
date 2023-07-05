'use client';

import Link from 'next/link';
import { useClickOutsideMenu } from '@/src/utils/hooks/useClickOutsideMenu';
import { useRef } from 'react';
import { useSession } from 'next-auth/react';

export default function Menu({ ...menu }) {
	const { displayMenu, setDisplayMenu } = menu;

	const menuRef = useRef<HTMLDivElement | null>(null);

	const { data: session } = useSession();

	useClickOutsideMenu(menuRef, () => {
		setDisplayMenu(false);
	});

	const handleDivWidth = () => {
		if (displayMenu) {
			const isMobile = /iPhone|iPad|iPod|webOS|Windows Phone|BlackBerry|Android/i.test(navigator.userAgent);
			if (isMobile) return '100vw';
			return '40vw';
		}
		return '0';
	};

	return (
		<div
			ref={menuRef}
			className="menu-container"
			style={{ width: `${handleDivWidth()}` }}>
			<h1 className="menu-title">Menu</h1>
			<ul>
				<Link href={'/'}>
					<li>Home</li>
				</Link>
				<Link href={'/play'}>
					<li>Play</li>
				</Link>
				{!session ? (
					<>
						<Link href={'/signin'}>
							<li>Sign In</li>
						</Link>
						<Link href={'/signup'}>
							<li>Sign Up</li>
						</Link>
					</>
				) : (
					<Link href={'/dashboard'}>
						<li>Dashboard</li>
					</Link>
				)}
			</ul>
		</div>
	);
}
