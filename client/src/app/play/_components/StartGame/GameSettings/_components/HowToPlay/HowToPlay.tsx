import './HowToPlay.scss';
import { awaitFunction } from '@/utils/general/await';
import { Dispatch, SetStateAction, useRef } from 'react';

export default function HowToPlay({
	showHowToPlay,
	setShowHowToPlay,
}: {
	showHowToPlay: boolean;
	setShowHowToPlay: Dispatch<SetStateAction<boolean>>;
}) {
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const handleCloseDialog = () => {
		dialogRef.current!.style.animation = 'CloseDialog 0.5s linear reverse';
		awaitFunction(470, () => {
			dialogRef.current!.style.animation = 'OpenDialog 0.5s linear';
			setShowHowToPlay(false);
		});
	};
	return (
		<dialog
			ref={dialogRef}
			className="how-to-play-card"
			open={showHowToPlay}>
			<button
				type="button"
				className="close-dialog"
				onClick={handleCloseDialog}>
				X
			</button>
			<div className="how-to-play">
				<p>
					Try to guess a random secret word in 6 tries. After every try, the color of the letters changes to help you discover the word.
				</p>
				<section className="guess">
					<input
						type="text"
						id="1"
						name="1"
						value="W"
						disabled
					/>
					<input
						type="text"
						id="2"
						name="2"
						value="A"
						disabled
					/>
					<input
						type="text"
						id="3"
						name="3"
						value="T"
						disabled
					/>
					<input
						type="text"
						id="4"
						name="4"
						value="E"
						disabled
					/>
					<input
						type="text"
						id="5"
						name="5"
						value="R"
						disabled
					/>
				</section>
				<section className="explain">
					<span>
						<input
							type="text"
							id="6"
							name="6"
							value="W"
							disabled
						/>
						<input
							type="text"
							id="7"
							name="7"
							value="E"
							disabled
						/>
						<p> - Does not contain the letter.</p>
					</span>
					<span>
						<input
							type="text"
							id="8"
							name="8"
							value="T"
							disabled
						/>
						<input
							type="text"
							id="9"
							name="9"
							value="R"
							disabled
						/>
						<p> - Contain the letter but at another place.</p>
					</span>
					<span>
						<input
							type="text"
							id="10"
							name="10"
							disabled
							style={{ backgroundColor: 'transparent', border: '0' }}
						/>
						<input
							type="text"
							id="11"
							name="11"
							value="A"
							disabled
						/>
						<p> - Contain the letter at exactly place.</p>
					</span>
				</section>
			</div>
		</dialog>
	);
}
