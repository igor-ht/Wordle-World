import useLocalStorage from '../hooks/useLocalStorage';
import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

interface IGuest {
	ip: string;
	lastPlayed: number;
	gamesCount: number;
}

export default function useGuestHandlers() {
	const [guestLimitGames, setGuestLimitGames] = useState(false);
	const [storedValue, setValue, removeValue] = useLocalStorage<IGuest>('guest', {
		ip: '',
		lastPlayed: Math.floor(Date.now() / 1000),
		gamesCount: 0,
	});

	const searchGuestInDB = async () => {
		const res = await axios.get('/api/guest');
		const guest = res.data;
		if (!guest) return null;
		return guest;
	};

	const createNewGuest = async () => {
		const res = await axios.get('/api/guest', { params: { create: true } });
		const guestSigned = res.data;
		return guestSigned;
	};
	const checkGuestTimeSession = () => {
		// if guest played last time less than 24h, return false
		if (storedValue.lastPlayed + 86_400 > Math.floor(Date.now() / 1000)) return false;
		return true;
	};

	const handleGuestNewGame = async () => {
		const guest = await (await searchGuestInDBQuery.refetch()).data;
		const res = await axios.post('/api/guest', guest);
		const guestUpdated = await res.data;
		setValue(guestUpdated);
		return guestUpdated;
	};

	const handleGuestNewSession = async () => {
		const guest = await (await searchGuestInDBQuery.refetch()).data;
		const res = await axios.get('/api/guest', {
			params: {
				newSession: guest.ip,
			},
		});
		const guestSigned = await res.data;
		setValue(guestSigned);
		return guestSigned;
	};

	const searchGuestInDBQuery = useQuery({
		queryKey: ['searchGuestInDB'],
		queryFn: searchGuestInDB,
		staleTime: Infinity,
		enabled: false,
	});
	const createNewGuestQuery = useQuery({
		queryKey: ['createNewGuest'],
		queryFn: createNewGuest,
		staleTime: Infinity,
		enabled: false,
	});
	const handleGuestNewGameMutation = useMutation({
		mutationKey: ['guestNewGame'],
		mutationFn: handleGuestNewGame,
		cacheTime: Infinity,
	});
	const handleGuestNewSessionQuery = useQuery({
		queryKey: ['guestNewSession'],
		queryFn: handleGuestNewSession,
		staleTime: Infinity,
		enabled: false,
	});

	const handleGuestUser = async () => {
		let guest;
		if (typeof window !== 'undefined') guest = window?.localStorage?.getItem('guest') ? JSON.parse(localStorage.getItem('guest')!) : null;
		if (!guest) guest = await (await searchGuestInDBQuery.refetch()).data;
		if (!guest) guest = await (await createNewGuestQuery.refetch()).data;
		setValue(guest);
		if (guest.gamesCount >= 3) {
			if (checkGuestTimeSession()) return await handleGuestNewSessionQuery.refetch();
			return setGuestLimitGames(true);
		}
		return await handleGuestNewGameMutation.mutateAsync();
	};

	return { handleGuestUser, guestLimitGames };
}
