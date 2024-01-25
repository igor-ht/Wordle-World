import GamePage from './GamePage';
import GameContextProvider from './_components/GameContextProvider/GameContextProvider';

export default function Page() {
	return (
		<GameContextProvider>
			<GamePage />
		</GameContextProvider>
	);
}
