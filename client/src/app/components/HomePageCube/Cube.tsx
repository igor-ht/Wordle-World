import './homePage.scss';
import Link from 'next/link';

export default function Cube() {
	return (
		<div className="cube-container">
			<div className="cube">
				<div className="face welcome">
					<h6>Welcome to Wordle World!</h6>
					<p>I am excited to have you here and hope you enjoy playing around.</p>
					<p>Here you can play Wordle in english for free and keep track of the words you discovered and points you made!</p>
					<p>Enjoy and good luck!</p>
				</div>
				<div className="face how-to-play">
					<h6>How to play:</h6>
					<p>- You have 6 chances to guess a secret random word.</p>
					<p>- After every guess, you can get three possible answers:</p>
					<section>
						<span>
							<input
								type="text"
								id="1"
								name="1"
								className="wrong"
								disabled
								value={'S'}
							/>
							<p> - When the letter is not part of the secret word.</p>
						</span>
						<span>
							<input
								type="text"
								id="2"
								name="2"
								className="cow"
								disabled
								value={'A'}
							/>
							<p> - When the letter is part of the secret word but at the wrong place.</p>
						</span>
						<span>
							<input
								type="text"
								id="3"
								name="3"
								className="bull"
								disabled
								value={'R'}
							/>
							<p> - When the letter is part of the secret word and is at the right place.</p>
						</span>
					</section>
				</div>
				<div className="face account">
					<span>
						<p>Have an account already? </p>
						<Link href={'/signin'}>Sign in here.</Link>
					</span>
					<span>
						<p>Doens&apos;t have an account yet?</p>
						<Link href={'/signup'}>Sign up here.</Link>
					</span>
					<span>
						<p>
							Not into commitment?
							<br />
							You are still able to play three times a day!
						</p>
					</span>
				</div>
				<div className="face info">
					<div className="users">
						<p>Give a feedback:</p>
						<Link
							href={'mailto:idht07@gmail.com'}
							target="_blank">
							Email me
						</Link>
					</div>
					<div className="developers">
						<p>Developers here:</p>
						<Link
							href={'https://github.com/igor-ht/Wordle-World'}
							target="_blank">
							Github repo
						</Link>
					</div>
				</div>
				<div className="face top"></div>
				<div className="face bottom"></div>
			</div>
		</div>
	);
}
