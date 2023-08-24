import './Title.scss';

export default function Title({ text }: { text: string }) {
	return (
		<h1 className="page-title">
			{text.split('').map((char, idx) => {
				if (char === ' ') return <> </>;
				return (
					<span
						key={idx}
						className="letter-wrapper">
						{char}
					</span>
				);
			})}
		</h1>
	);
}
