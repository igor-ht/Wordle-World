'use client';

import GameContext from '@/utils/play/context/context';
import GameApi from '@/utils/play/GameApi';

const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <GameContext.Provider value={GameApi()}>{children}</GameContext.Provider>;
};

export default GameContextProvider;
