import './Footer.scss';
import ThemeButton from './_components/ThemeButton';
import SoundButton from './_components/SoundButton';

export default function Footer() {
	return (
		<footer className="footer">
			<ThemeButton />
			<p>Wordle World 2023©</p>
			<SoundButton />
		</footer>
	);
}
