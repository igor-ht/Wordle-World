'use client';

import './startGame.scss';
import Link from 'next/link';

interface IStartGame {
	startNewGame: () => Promise<void>;
}

export default function StartGame({ startNewGame }: IStartGame) {
	return (
		<div className="start-game">
			<div className="start-game-card">
				<div className="help">
					<p>
						Try to guess a random secret word in 6 tries. After every try, the color of the letters changes to help you discover the word.
					</p>
					<section className="guess">
						<input
							type="text"
							value="W"
							disabled
						/>
						<input
							type="text"
							value="A"
							disabled
						/>
						<input
							type="text"
							value="T"
							disabled
						/>
						<input
							type="text"
							value="E"
							disabled
						/>
						<input
							type="text"
							value="R"
							disabled
						/>
					</section>
					<section className="explain">
						<span>
							<input
								type="text"
								value="W"
								disabled
							/>
							<input
								type="text"
								value="E"
								disabled
							/>
							<p> - The letter is not valid</p>
						</span>
						<span>
							<input
								type="text"
								value="T"
								disabled
							/>
							<input
								type="text"
								value="R"
								disabled
							/>
							<p> - The letter is valid but at the wrong place</p>
						</span>
						<span>
							<input
								type="text"
								disabled
								style={{ backgroundColor: 'rgba(255, 255, 255, 0)', border: '0' }}
							/>
							<input
								type="text"
								value="A"
								disabled
							/>
							<p> - The letter is valid and at the right place</p>
						</span>
					</section>
				</div>

				<button
					type="button"
					onClick={() => startNewGame()}>
					Play
				</button>
				<span>
					<p className="link">
						Has an account already? <Link href={'/signin'}>Sign In here</Link>.
					</p>
					<p className="link">
						Create a free account. <Link href={'/signup'}>Sign Up here</Link>.
					</p>
				</span>
			</div>
		</div>
	);
}
