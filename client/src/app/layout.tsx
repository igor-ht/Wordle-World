import './layout.scss';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import Footer from '@/components/Footer/Footer';
import MainContainer from '@/components/MainContainer/MainContainer';
import Navbar from '@/components/Navbar&Menu/Navbar';
import { varelaRound, roboto } from '@/utils/fonts';
import { Session } from 'next-auth';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Wordle World',
	description: 'Play Wordle for free, collect points and keep track of your discovered words!',
	keywords: ['Wordle', 'Wordle Game', 'Wordle Game Free', 'Wordle World', 'Wordle-World', 'WordleWorld'],
	category: 'game',
	icons: {
		icon: '/wordle-icon.svg',
	},
	robots: {
		index: true,
		googleBot: {
			index: true,
		},
	},
	other: {
		'google-site-verification': 'p1kZTRj_nmjo6kW7s9gBlfhd-siCNinlJh4hkhrpCio',
	},
};

export default function RootLayout({ children, session }: { children: React.ReactNode; session: Session }) {
	return (
		<>
			<html
				lang="en"
				className={`${varelaRound.variable} ${roboto.variable}`}>
				<body
					className="app"
					data-theme="light">
					<AuthProvider session={session}>
						<Navbar />
						<MainContainer>{children}</MainContainer>
						<Footer />
					</AuthProvider>
					<Analytics />
				</body>
			</html>
		</>
	);
}
