import './layout.scss';
import AuthProvider from './components/AuthProvider/AuthProvider';
import Footer from './components/Footer/Footer';
import MainContainer from './components/MainContainer/MainContainer';
import Navbar from './components/Navbar&Menu/Navbar';
import { Session } from 'next-auth';
import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';
import LoadingSkeleton from './components/LoadingSkeleton/LoadingSkeleton';

export const metadata = {
	title: 'Wordle World',
	description: 'Play Wordle game in english for free',
	icons: {
		icon: '/wordle.icon.svg',
	},
};

export default function RootLayout({ children, session }: { children: React.ReactNode; session: Session }) {
	return (
		<>
			<html lang="en">
				<body
					className="app"
					data-theme="light">
					<AuthProvider session={session}>
						<Navbar />
						<MainContainer>
							<Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
						</MainContainer>
						<Footer />
					</AuthProvider>
					{/* <Analytics /> */}
				</body>
			</html>
		</>
	);
}
