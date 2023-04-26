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
				<Link href={'/'}>
					<div className="wordle-icon">
						<Image
							src="/wordle.logo.svg"
							alt="WordleGame"
							width={500}
							height={500}
							priority
						/>
					</div>
				</Link>
				<section>
					<UserLogged />
					<MenuButton {...{ displayMenu, setDisplayMenu }} />
				</section>
			</nav>
			<Menu {...{ displayMenu, setDisplayMenu }} />
		</>
	);
}
