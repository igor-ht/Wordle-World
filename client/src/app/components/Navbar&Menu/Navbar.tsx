'use client';

import './Navbar.scss';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Menu from './Menu';
import UserLogged from './UserLogged';
import MenuButton from './MenuButton';

export default function Navbar() {
	const [displayMenu, setDisplayMenu] = useState(false);

	return (
		<>
			<nav className="navbar">
				<div className="wordle-icon">
					<Link
						href={'/'}
						onFocus={(event) => event.target.blur()}>
						<Image
							src="/wordle.logo.svg"
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
					<MenuButton {...{ displayMenu, setDisplayMenu }} />
				</section>
			</nav>
			<Menu {...{ displayMenu, setDisplayMenu }} />
		</>
	);
}
