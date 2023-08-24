import './notValidGuess.scss';

export default function NotValidGuess({ text }: { text: string }) {
	return (
		<div className="not-valid-guess-tooltip">
			<p>{text}</p>
		</div>
	);
}
