'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Menu from './Menu';
import UserLogged from './UserLogged';
import MenuButton from './MenuButton';

export default function Navbar() {
	const [displayMenu, setDisplayMenu] = useState(false);

	return (
		<>
			<nav className="navbar">
				<div className="wordle-icon">
					<Link href={'/'}>
						<Image
							src="/wordle.logo.svg"
							alt="WordleGame"
							width={300}
							height={300}
							priority
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
