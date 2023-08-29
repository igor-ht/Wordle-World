'use client';

import Image from 'next/image';
import { AppSounds } from '@/utils/general/sounds';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';

type MenuPropsType = {
	menuRef: MutableRefObject<HTMLDivElement | null>;
	displayMenu: boolean;
	setDisplayMenu: Dispatch<SetStateAction<boolean>>;
};

export default function MenuButton({ menuRef, displayMenu, setDisplayMenu }: MenuPropsType) {
	const handleDisplayMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		const menuContainer = menuRef.current as HTMLDivElement;
		event.currentTarget.blur();
		AppSounds?.toggleMenu?.play();
		const isMobile = /iPhone|iPad|iPod|webOS|Windows Phone|BlackBerry|Android/i.test(navigator.userAgent);
		if (isMobile) menuContainer.style.width = '100dvw';
		else menuContainer.style.width = '40vw';
		if (displayMenu) menuContainer.style.width = '0';
		setDisplayMenu((prev) => !prev);
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
				quality={1}
			/>
		</button>
	);
}
