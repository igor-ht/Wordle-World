import { useSession } from 'next-auth/react';
import { useEffect, useReducer } from 'react';
import { rankingReducer } from './reducer';
import useAxiosAuth from '../hooks/useAxiosAuth';

const initialRanking = {
	ranking: [],
	user: {
		place: 0,
		name: '',
		points: 0,
	},
};

export default function useRanking() {
	const { data: session, update } = useSession();
	const [ranking, rankingDispatch] = useReducer(rankingReducer, initialRanking);
	const axiosAuth = useAxiosAuth();

	useEffect(() => {
		const getRanking = async () => {
			const res = await axiosAuth.post('/api/dashboard', { email: session?.user?.email }, { params: { getRanking: true } });
			const ranking = res.data;
			if (!ranking) return null;
			rankingDispatch({ type: 'setRanking', payload: ranking });
		};

		const getUserRank = async () => {
			const res = await axiosAuth.post(
				'/api/dashboard',
				{ id: session?.user?.id, email: session?.user?.email },
				{ params: { getUserRank: true } }
			);
			const userRank = res.data;
			if (!userRank) return null;
			rankingDispatch({ type: 'setUserRanking', payload: userRank });
		};

		try {
			if (!session) throw 'Session expired.';
			getRanking();
			getUserRank();
		} catch {
			update();
		}
	}, [axiosAuth, session, update]);

	return { ranking };
}
