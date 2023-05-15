'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useReducer } from 'react';
import { rankingReducer } from './reducer';
import useAxiosAuth from '../hooks/useAxiosAuth';

export default function useRanking() {
	const axiosAuth = useAxiosAuth();
	const { data: session, update } = useSession();
	const [ranking, rankingDispatch] = useReducer(rankingReducer, {
		ranking: [],
		user: {
			place: 0,
			name: '',
			points: 0,
		},
	});

	useEffect(() => {
		if (session) {
			getRanking();
			getUserRank();
		}
	}, [session]);

	const getRanking = async () => {
		try {
			const res = await axiosAuth.post('/api/dashboard', { email: session?.user?.email }, { params: { getRanking: true } });
			const ranking = res.data;
			if (!ranking) return null;
			rankingDispatch({ type: 'setRanking', payload: ranking });
		} catch {
			await update();
		}
	};

	const getUserRank = async () => {
		try {
			const res = await axiosAuth.post(
				'/api/dashboard',
				{ id: session?.user?.id, email: session?.user?.email },
				{ params: { getUserRank: true } }
			);
			const userRank = res.data;
			if (!userRank) return null;
			rankingDispatch({ type: 'setUserRanking', payload: userRank });
		} catch {
			await update();
		}
	};

	return { ranking };
}
