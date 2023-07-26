import useLocalStorage from '../hooks/useLocalStorage';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosAuth from '../hooks/useAxiosAuth';

interface IGuest {
	ip: string;
	lastPlayed: number;
	gamesCount: number;
}

export default function useGuestHandlers() {
	const [guestLimitGames, setGuestLimitGames] = useState(false);
	const axiosAuth = useAxiosAuth();
	const [storedValue, setValue, removeValue] = useLocalStorage<IGuest>('guest', {
		ip: '',
		lastPlayed: Math.floor(Date.now() / 1000),
		gamesCount: 0,
	});
	let currentGuest: IGuest | null =
		typeof window !== 'undefined' && window?.localStorage?.getItem('guest') ? JSON.parse(localStorage?.getItem('guest') || '') : null;

	const searchGuestInDB = async () => {
		const res = await axiosAuth.get('/guest/handleSearchGuest');
		const guest = res.data;
		if (!guest) return null;
		return guest;
	};

	const createNewGuest = async () => {
		const res = await axiosAuth.get('/guest/handleCreateNewGuest');
		const guestSigned = res.data;
		return guestSigned;
	};
	const checkGuestTimeSession = () => {
		// if guest played last time less than 24h, return false
		if (storedValue.lastPlayed + 86_400 > Math.floor(Date.now() / 1000)) return false;
		return true;
	};

	const handleGuestNewGame = async () => {
		const res = await axiosAuth.post('/guest/handleGuestNewGame', currentGuest);
		const guestUpdated = await res.data;
		return guestUpdated;
	};

	const handleGuestNewSession = async () => {
		const guest = await (await searchGuestInDBQuery.refetch()).data;
		const res = await axiosAuth.post('/guest/handleGuestNewSession', guest);
		const guestSigned = await res.data;
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
		if (typeof window !== 'undefined')
			currentGuest = window?.localStorage?.getItem('guest') ? JSON.parse(localStorage.getItem('guest')!) : null;
		if (!currentGuest) currentGuest = await (await searchGuestInDBQuery.refetch()).data;
		if (!currentGuest) currentGuest = await (await createNewGuestQuery.refetch()).data;
		if (currentGuest) {
			if (currentGuest.gamesCount >= 3) {
				if (!checkGuestTimeSession()) return setGuestLimitGames(true), setValue(currentGuest);
				currentGuest = await (await handleGuestNewSessionQuery.refetch()).data;
				currentGuest && setValue(currentGuest);
				return setGuestLimitGames(false);
			}
			currentGuest = await handleGuestNewGameMutation.mutateAsync();
			currentGuest && setValue(currentGuest);
		}
	};

	return { handleGuestUser, guestLimitGames };
}
