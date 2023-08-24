'use client';

import './startGame.scss';
import Link from 'next/link';

interface IStartGame {
	startNewGame: () => Promise<void>;
}

export default function Temp_StartGame({ startNewGame }: IStartGame) {
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
							<p> - Not valid.</p>
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
							<p> - Valid but at the wrong place.</p>
						</span>
						<span>
							<input
								type="text"
								id="10"
								name="10"
								disabled
								style={{ backgroundColor: 'rgba(255, 255, 255, 0)', border: '0' }}
							/>
							<input
								type="text"
								id="11"
								name="11"
								value="A"
								disabled
							/>
							<p> - Valid and at the right place.</p>
						</span>
					</section>
				</div>

				<button
					type="button"
					className="btn"
					onClick={() => startNewGame()}>
					Play
				</button>
				<span>
					<p className="link">
						Has an account already? <Link href={'/signin'}>Sign In here</Link>
					</p>
					<p className="link">
						Create a free account. <Link href={'/signup'}>Sign Up here</Link>
					</p>
				</span>
			</div>
		</div>
	);
}
