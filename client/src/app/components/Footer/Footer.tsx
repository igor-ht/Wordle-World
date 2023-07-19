'use client';

import { AppSounds, GameSounds, setAudioHowls } from '@/src/utils/sounds/appSounds';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type SoundType = '🔊' | '🔈';

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

	const [sound, setSound] = useState<SoundType>('🔈');

	useEffect(() => {
		const handleClickEvent = () => {
			if (sound === '🔊') {
				Howler.mute(true);
				return setSound('🔈');
			} else {
				Howler.ctx = Howler.ctx ? Howler.ctx : new AudioContext();
				AppSounds.clickItem && GameSounds.badGuess ? Howler?.mute(false) : setAudioHowls();
				return setSound('🔊');
			}
		};
		const soundButton = document.getElementById('sound');
		soundButton?.addEventListener('click', handleClickEvent);
		return () => soundButton?.removeEventListener('click', handleClickEvent);
	});

	return (
		<footer className="footer">
			<section>
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
			</section>
			<p>Wordle World 2023©</p>
			<section>
				<button
					type="button"
					id="sound"
					onFocus={(event) => event.target.blur()}>
					{sound}
				</button>
			</section>
		</footer>
	);
}
