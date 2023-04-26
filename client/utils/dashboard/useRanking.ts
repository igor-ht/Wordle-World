'use client';

import { useSession } from 'next-auth/react';
import useAxiosAuth from '../hooks/useAxiosAuth';
import { useEffect, useReducer } from 'react';
import { rankingReducer } from './reducer';

export default function useRanking() {
	const axiosAuth = useAxiosAuth();
	const { data: session } = useSession();
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
		const res = await axiosAuth.post('http://localhost:5000/user/getRanking', { email: session?.user?.email });
		const ranking = res.data;
		if (!ranking) return null;
		rankingDispatch({ type: 'setRanking', payload: ranking });
	};

	const getUserRank = async () => {
		const res = await axiosAuth.post('http://localhost:5000/user/getUserRank', { id: session?.user?.id, email: session?.user?.email });
		const userRank = res.data;
		if (!userRank) return null;
		rankingDispatch({ type: 'setUserRanking', payload: userRank });
	};

	return { ranking };
}
