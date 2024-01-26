import './Title.scss';
import { Fragment } from 'react';

export default function Title({ text }: { text: string }) {
	return (
		<h1 className="page-title">
			{text.split('').map((char, idx) => {
				if (char === ' ') return <Fragment key={idx}> </Fragment>;
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
