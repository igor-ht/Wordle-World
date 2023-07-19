import { Howl } from 'howler';

let VOLUME = 0.1;
let clickItem: undefined | Howl;
let toggleMenu: undefined | Howl;
let insertLetter: undefined | Howl;
let badGuess: undefined | Howl;
let guessSent: undefined | Howl;
let victory: undefined | Howl;
let defeat: undefined | Howl;
export let AppSounds: { toggleMenu?: Howl | undefined; clickItem?: Howl | undefined };
export let GameSounds: {
	insertLetter?: Howl | undefined;
	badGuess?: Howl | undefined;
	guessSent?: Howl | undefined;
	victory?: Howl | undefined;
	defeat?: Howl | undefined;
};

export function setAudioHowls() {
	clickItem = new Howl({
		src: ['sounds/play/insert-letter.mp3'],
		volume: VOLUME,
	});

	toggleMenu = new Howl({
		src: ['sounds/app/menu.mp3'],
		volume: VOLUME,
	});

	insertLetter = new Howl({
		src: ['sounds/play/insert-letter.mp3'],
		volume: VOLUME,
	});

	badGuess = new Howl({
		src: ['sounds/play/bad-guess.mp3'],
		volume: VOLUME,
	});

	guessSent = new Howl({
		src: ['sounds/play/guess-sent.mp3'],
		volume: VOLUME,
	});

	victory = new Howl({
		src: ['sounds/play/victory.mp3'],
		volume: VOLUME,
	});

	defeat = new Howl({
		src: ['sounds/play/defeat.mp3'],
		volume: VOLUME,
	});

	AppSounds = { clickItem, toggleMenu };
	GameSounds = { insertLetter, badGuess, guessSent, victory, defeat };
}

AppSounds = { clickItem, toggleMenu };
GameSounds = { insertLetter, badGuess, guessSent, victory, defeat };
