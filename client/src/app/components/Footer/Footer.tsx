'use client';

import { AppSounds, GameSounds, setAudioHowls } from '@/src/utils/sounds/appSounds';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Footer() {
	const [sound, setSound] = useState(false);

	useEffect(() => {
		const handleClickEvent = () => {
			if (sound) {
				Howler.mute(true);
				return setSound(false);
			} else {
				Howler.ctx = Howler.ctx ? Howler.ctx : new AudioContext();
				AppSounds.clickItem && GameSounds.badGuess ? Howler?.mute(false) : setAudioHowls();
				return setSound(true);
			}
		};
		const soundButton = document.getElementById('sound');
		soundButton?.addEventListener('click', handleClickEvent);
		return () => soundButton?.removeEventListener('click', handleClickEvent);
	});

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
			<section>
				<button
					type="button"
					onFocus={(event) => event.target.blur()}
					onClick={handleTheme}>
					<Image
						src={'./dark-theme.svg'}
						alt="Light/Dark Mode"
						data-theme-confirmation
						height={50}
						width={50}
						priority
						quality={1}
					/>
				</button>
			</section>
			<p>Wordle World 2023©</p>
			<section>
				<button
					type="button"
					id="sound"
					onFocus={(event) => event.target.blur()}>
					{sound ? (
						<Image
							src={'/sound.svg'}
							alt="sound"
							height={50}
							width={50}
							priority
							quality={1}
						/>
					) : (
						<Image
							src={'/mute.svg'}
							alt="mute"
							height={50}
							width={50}
							priority
							quality={1}
						/>
					)}
				</button>
			</section>
		</footer>
	);
}
