'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AppSounds, GameSounds, setAudioHowls } from '@/utils/general/sounds';

export default function SoundButton() {
	const [sound, setSound] = useState(false);

	const handleToggleSound = () => {
		if (sound) {
			Howler.mute(true);
		} else {
			Howler.ctx = Howler.ctx || new AudioContext();
			AppSounds && GameSounds ? Howler?.mute(false) : setAudioHowls();
		}
		return setSound((prev) => !prev);
	};

	return (
		<section>
			<button
				type="button"
				id="sound"
				className="btn-image"
				onClick={handleToggleSound}>
				{sound ? (
					<Image
						className="footer-icon"
						src={'/sound.svg'}
						alt="sound"
						height={50}
						width={50}
						priority
						quality={1}
					/>
				) : (
					<Image
						className="footer-icon"
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
	);
}
