import './homePage.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className="home-page">
			<Image
				src={'/wordle-world.svg'}
				alt="wordle world"
				height={300}
				width={300}
				priority
			/>
			<div className="cube-container">
				<div className="cube">
					<div className="face welcome">
						<p>
							Welcome to Wordle World!
							<br />
							I am excited to have you here and hope you enjoy playing around.
							<br />
							Here you can play Wordle in english for free and keep track of the words you discovered and points you made!
							<br />
							Enjoy and good luck!
						</p>
					</div>
					<div className="face how-to-play">
						<h6>How to play:</h6>
						<p>
							- You have 6 chances to guess a secret random word.
							<br />
							- After every guess, you can get three possible answers:
							<br />
						</p>
						<section>
							<span>
								<input
									type="text"
									className="wrong"
									disabled
									value={'S'}
								/>
								<p> - When the letter is not part of the secret word.</p>
							</span>
							<span>
								<input
									type="text"
									className="cow"
									disabled
									value={'A'}
								/>
								<p> - When the letter is part of the secret word but at the wrong place.</p>
							</span>
							<span>
								<input
									type="text"
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
						<p>
							Not into commitment?
							<br />
							You are still able to play three times a day!
						</p>
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
		</div>
	);
}
