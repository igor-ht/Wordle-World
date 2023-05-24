'use client';

import Image from 'next/image';

export default function Footer() {
	const handleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
		const appElement = document.querySelector('.app');
		const currentTheme = event.currentTarget.getAttribute('data-theme-confirmation');
		if (currentTheme !== 'light') {
			event.currentTarget.setAttribute('data-theme-confirmation', 'light');
			appElement?.setAttribute('data-theme', 'light');
			return;
		}
		event.currentTarget.setAttribute('data-theme-confirmation', 'dark');
		appElement?.setAttribute('data-theme', 'dark');
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
