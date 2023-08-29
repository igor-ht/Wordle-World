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
	const handleDisplayMenu = () => {
		const menuContainer = menuRef.current as HTMLDivElement;
		AppSounds?.toggleMenu?.play();
		if (displayMenu) menuContainer.classList.remove('open');
		else menuContainer.classList.add('open');
		setDisplayMenu((prev) => !prev);
	};

	return (
		<button
			type="button"
			className="btn-image"
			id="menu-icon"
			onFocus={(e) => e.currentTarget.blur()}
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
