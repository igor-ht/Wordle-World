import './layout.scss';
import { varelaRound, roboto } from '@/utils/general/fonts';
import { Session } from 'next-auth';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import Navbar from './_components/layout/Navbar&Menu/Navbar';
import AuthProvider from './_components/providers/AuthProvider/AuthProvider';
import Footer from './_components/layout/Footer/Footer';
import MainContainer from './_components/layout/MainContainer/MainContainer';
import ReactQueryProvider from './_components/providers/ReactQueryProvider/ReactQueryProvider';
import { BASE_URL } from '@/appConfig';

export const metadata: Metadata = {
	title: 'Wordle World',
	description: 'Play Wordle for free, collect points and keep track of your discovered words!',
	keywords: ['Wordle', 'Wordle Game', 'Wordle Game Free', 'Wordle World', 'Wordle-World', 'WordleWorld'],
	category: 'game',
	metadataBase: new URL(BASE_URL),
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
		<html
			lang="en"
			className={`${varelaRound.variable} ${roboto.variable}`}>
			<body
				className="app"
				data-theme="light">
				<AuthProvider session={session}>
					<Navbar />
					<MainContainer>
						<ReactQueryProvider>{children}</ReactQueryProvider>
					</MainContainer>
					<Footer />
				</AuthProvider>
				<Analytics />
			</body>
		</html>
	);
}
