'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export default function Footer() {
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
		<footer className="footer">
			<button
				type="button"
				data-theme-confirmation="light"
				onClick={handleTheme}>
				<Image
					src={'./dark-theme.svg'}
					alt="Light/Dark Mode"
					height={50}
					width={50}
					priority
				/>
			</button>
			<p>Wordle World 2023©</p>
		</footer>
	);
}
