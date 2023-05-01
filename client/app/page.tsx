import './layout.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div className="home-page">
			<Image
				src={'/wordle-world.svg'}
				alt="wordle world"
				height={500}
				width={500}
				priority
			/>

			<div className="intro">
				<p className="beta-message">
					Hi there! I am excited to have you here and hope you enjoy playing around.
					<br />I just want to let you know that the website&apos;s platform is currently in beta version, which means it&apos;s still being
					developed and can be instable, therefore some small technical problem might happen. However, the beta version of the game allows
					you to register and play for free. You can also invite your friends to join in on the fun and collect points as you play.
					<br />
					Have fun!
				</p>
			</div>

			<div className="info">
				<section className="developers">
					<p>Developers here:</p>
					<Link href={'https://github.com/igor-ht/Wordle-World'}>Github repo</Link>
				</section>
				<section className="users">
					<p>Give a feedback:</p>
					<Link href={'mailto:idht07@gmail.com'}>Email me</Link>
				</section>
			</div>
		</div>
	);
}
