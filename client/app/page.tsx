import './layout.scss';
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

			<div className="intro">
				<dialog open>
					<span className="span-container">
						<div className="dialog-box">
							<form method="dialog">
								<button formMethod="dialog">X</button>
							</form>
							<span>
								<p className="beta-message">
									Hi there! I am excited to have you here and hope you enjoy playing around.
									<br />I just want to let you know that the website&apos;s platform is currently in beta version, which means it&apos;s
									still being developed and can be instable, therefore some small technical problem might happen. However, the beta version
									of the game allows you to register and play for free. You can also invite your friends to join in on the fun and collect
									points as you play. Have fun!
								</p>
							</span>
						</div>
					</span>
				</dialog>
				<div className="info">
					<section className="developers">
						<p>Developers here:</p>
						<Link
							href={'https://github.com/igor-ht/Wordle-World'}
							target="_blank">
							Github repo
						</Link>
					</section>
					<section className="users">
						<p>Give a feedback:</p>
						<Link
							href={'mailto:idht07@gmail.com'}
							target="_blank">
							Email me
						</Link>
					</section>
				</div>
			</div>
		</div>
	);
}
