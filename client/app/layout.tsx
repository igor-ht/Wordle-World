import './layout.scss';
import AuthProvider from './components/AuthProvider/AuthProvider';
import Footer from './components/Footer/Footer';
import MainContainer from './components/MainContainer/MainContainer';
import Navbar from './components/Navbar&Menu/Navbar';
import { Session } from 'next-auth';

export const metadata = {
	title: 'Wordle World',
	description: 'Play Wordle in english for free',
	icons: {
		icon: '/wordle.icon.svg',
	},
};

export default function RootLayout({ children, session }: { children: React.ReactNode; session: Session }) {
	return (
		<>
			<html lang="en">
				<body className="app">
					<AuthProvider session={session}>
						<Navbar />
						<MainContainer>{children}</MainContainer>
						<Footer />
					</AuthProvider>
				</body>
			</html>
		</>
	);
}
