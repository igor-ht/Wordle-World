'use client';

import Image from 'next/image';

export default function MenuButton({ ...menu }) {
	const { displayMenu, setDisplayMenu } = menu;

	const handleDisplayMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.currentTarget.blur();
		if (displayMenu) {
			setDisplayMenu(false);
		} else {
			setDisplayMenu(true);
		}
	};
	return (
		<button
			className="menu-icon"
			onClick={handleDisplayMenu}>
			<Image
				className="menu-img"
				src="/menu.svg"
				alt="Menu"
				width={100}
				height={100}
				priority
			/>
		</button>
	);
}
