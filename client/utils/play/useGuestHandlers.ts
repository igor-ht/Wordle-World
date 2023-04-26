import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from '../axios/axios';

interface IGuest {
	ip: string;
	lastPlayed: number;
	gamesCount: number;
}

export default function useGuestHandlers() {
	const { data: session } = useSession();
	const [guestLimitGames, setGuestLimitGames] = useState(false);
	const [storedValue, setValue, removeValue] = useLocalStorage<IGuest>('guest', {
		ip: '',
		lastPlayed: Math.floor(Date.now() / 1000),
		gamesCount: 0,
	});

	useEffect(() => {
		if (session) removeValue();
	}, [session]);

	const searchGuestInDB = async () => {
		const res = await axios.get('/api/guest');
		const guest = res.data;
		if (!guest) return await createNewGuest();
		setValue(guest);
		return guest;
	};

	const createNewGuest = async () => {
		const res = await axios.get('/api/guest', { params: { create: true } });
		const guestSigned = res.data;
		setValue(guestSigned);
		return guestSigned;
	};

	const checkGuestTimeSession = (guest: IGuest) => {
		if (guest.lastPlayed + 86_400 > Math.floor(Date.now() / 1000)) return false;
		return true;
	};

	const handleGuestNewGame = async (guest: IGuest) => {
		const res = await axios.post('/api/guest', guest);
		const guestUpdated = await res.data;
		setValue(guestUpdated);
	};

	const handleGuestNewSession = async (guest: IGuest) => {
		const res = await axios.get('/api/guest', {
			params: {
				newSession: guest.ip,
			},
		});
		const guestSigned = await res.data;
		setValue(guestSigned);
	};

	const handleGuestUser = async () => {
		let guest = window.localStorage.getItem('guest') ? JSON.parse(window.localStorage.getItem('guest')!) : null;
		if (!guest) guest = await searchGuestInDB();
		if (!guest) guest = await createNewGuest();
		if (guest.gamesCount >= 3) {
			if (checkGuestTimeSession(guest)) return handleGuestNewSession(guest);
			return setGuestLimitGames(true);
		}
		return await handleGuestNewGame(guest);
	};

	return { handleGuestUser, guestLimitGames };
}
