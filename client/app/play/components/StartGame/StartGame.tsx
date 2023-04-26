'use client';

import Link from 'next/link';
import './startGame.scss';

interface IStartGame {
	startNewGame: () => Promise<void>;
}

export default function StartGame({ startNewGame }: IStartGame) {
	return (
		<div className="start-game">
			<div className="start-game-card">
				<div className="help">
					<p>You have to guess a random word in 6 tries. The color of the letters changes to help you discover the word.</p>
					<span>
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
					</span>
					<ul>
						<li>
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
							<p> - The letters are not valid</p>
						</li>
						<li>
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
							<p> - The letters are valid but at the wrong place</p>
						</li>
						<li>
							<input
								type="text"
								value="A"
								disabled
							/>
							<p> - The letter is valid and at the exact place</p>
						</li>
					</ul>
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
