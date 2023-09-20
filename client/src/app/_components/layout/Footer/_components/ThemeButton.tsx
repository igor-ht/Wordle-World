'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export default function ThemeButton() {
	useEffect(() => {
		const currentTheme = window?.localStorage.getItem('theme');
		if (!currentTheme) return;
		const appElement = document.querySelector('.app');
		appElement?.setAttribute('data-theme', currentTheme);
	}, []);

	const handleTheme = () => {
		const appElement = document.querySelector('.app');
		const currentTheme = appElement?.getAttribute('data-theme');
		if (currentTheme && currentTheme !== 'light') {
			appElement?.setAttribute('data-theme', 'light');
			window?.localStorage?.setItem('theme', 'light');
			return;
		}
		appElement?.setAttribute('data-theme', 'dark');
		window?.localStorage?.setItem('theme', 'dark');
	};

	return (
		<section>
			<button
				className="btn-image"
				type="button"
				onClick={handleTheme}>
				<Image
					className="footer-icon"
					src={'./dark-theme.svg'}
					alt="Light/Dark Mode"
					height={50}
					width={50}
					priority
					quality={1}
				/>
			</button>
		</section>
	);
}
