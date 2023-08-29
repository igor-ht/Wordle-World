'use client';

import './Navbar.scss';
import Link from 'next/link';
import Image from 'next/image';
import Menu from '../Menu/Menu';
import UserLogged from './_components/UserLogged';
import MenuButton from './_components/MenuButton';
import { useState, useRef } from 'react';

export default function Navbar() {
	const [displayMenu, setDisplayMenu] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);

	return (
		<>
			<nav className="navbar">
				<div className="wordle-icon">
					<Link href={'/'}>
						<Image
							src="/wordle-logo.svg"
							alt="WordleGame"
							width={300}
							height={300}
							priority
							quality={1}
						/>
					</Link>
				</div>
				<section>
					<UserLogged />
					<MenuButton
						menuRef={menuRef}
						displayMenu={displayMenu}
						setDisplayMenu={setDisplayMenu}
					/>
				</section>
			</nav>
			<Menu
				menuRef={menuRef}
				displayMenu={displayMenu}
				setDisplayMenu={setDisplayMenu}
			/>
		</>
	);
}
