import { Howl } from 'howler';

const insertLetter = new Howl({
	src: ['sounds/play/insert-letter.mp3'],
});

const badGuess = new Howl({
	src: ['sounds/play/bad-guess.mp3'],
});

const guessSent = new Howl({
	src: ['sounds/play/guess-sent.mp3'],
});

const victory = new Howl({
	src: ['sounds/play/victory.mp3'],
});

const defeat = new Howl({
	src: ['sounds/play/defeat.mp3'],
});

const GameSounds = { insertLetter, badGuess, guessSent, victory, defeat };

export default GameSounds;
