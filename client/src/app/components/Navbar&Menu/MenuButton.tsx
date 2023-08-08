'use client';

import Image from 'next/image';
import { AppSounds } from '@/utils/sounds/appSounds';

export default function MenuButton({ ...menu }) {
	const { displayMenu, setDisplayMenu } = menu;

	const handleDisplayMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.currentTarget.blur();
		AppSounds?.toggleMenu?.play();
		if (displayMenu) {
			setDisplayMenu(false);
		} else {
			setDisplayMenu(true);
		}
	};

	return (
		<button
			type="button"
			className="btn-image"
			id="menu-icon"
			onClick={handleDisplayMenu}>
			<Image
				className="menu-icon"
				src="/menu.svg"
				alt="Menu"
				width={100}
				height={100}
				priority
			/>
		</button>
	);
}
