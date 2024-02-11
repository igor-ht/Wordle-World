import useAxiosAuth from '@/utils/hooks/useAxiosAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface IGuest {
	ip: string;
	lastPlayed: number;
	gamesCount: number;
}

export default function useGuestHandlers() {
	const axiosAuth = useAxiosAuth();
	const queryClient = useQueryClient();

	const checkGuestTimeSession = () => {
		// if guest played last time less than 24h, return false
		const currentGuest = queryClient.getQueryData(['currentGuest']) as IGuest | undefined;
		if (currentGuest && currentGuest.lastPlayed + 86_400 > Math.floor(Date.now() / 1000)) return false;
		return true;
	};

	const searchGuestInDBQuery = async () => {
		const res = await axiosAuth.get('/guest/handleSearchGuest');
		const guest = res.data;
		if (!guest) return null;
		return guest as IGuest;
	};

	const createNewGuestQuery = async () => {
		const res = await axiosAuth.get('/guest/handleCreateNewGuest');
		const guestSigned = res.data;
		if (!guestSigned) return null;
		return guestSigned as IGuest;
	};

	const handleGuestNewGameMutation = async () => {
		const currentGuest = queryClient.getQueryData(['currentGuest']);
		const res = await axiosAuth.post('/guest/handleGuestNewGame', currentGuest);
		const guestUpdated = await res.data;
		if (!guestUpdated) return null;
		return guestUpdated as IGuest;
	};

	const handleGuestNewSessionMutation = async () => {
		const guest = queryClient.getQueryData(['currentGuest']);
		const res = await axiosAuth.post('/guest/handleGuestNewSession', guest);
		const guestSigned = await res.data;
		if (!guestSigned) return null;
		return guestSigned as IGuest;
	};

	const searchGuestInDB = useQuery({
		queryKey: ['currentGuest'],
		queryFn: searchGuestInDBQuery,
		enabled: false,
		staleTime: 1000 * 60 * 60,
		cacheTime: 1000 * 60 * 60,
		retry: 2,
	});

	const createNewGuest = useQuery({
		queryKey: ['currentGuest'],
		queryFn: createNewGuestQuery,
		enabled: false,
		staleTime: 1000 * 60 * 60,
		cacheTime: 1000 * 60 * 60,
		retry: 2,
	});

	const handleGuestNewGame = useMutation({
		mutationFn: handleGuestNewGameMutation,
		cacheTime: 1000 * 60 * 60,
		retry: 2,
		onMutate: () => {
			queryClient.cancelQueries(['currentGuest']);
			const previousData = queryClient.getQueryData(['currentGuest']);
			return { previousData };
		},
		onError: (err, variables, context) => {
			queryClient.setQueryData(['currentGuest'], context?.previousData);
		},
		onSettled: (data) => {
			queryClient.invalidateQueries(['currentGuest']);
			queryClient.setQueryData(['currentGuest'], data);
		},
	});

	const handleGuestNewSession = useMutation({
		mutationFn: handleGuestNewSessionMutation,
		cacheTime: 1000 * 60 * 60,
		retry: 2,
		onMutate: () => {
			queryClient.cancelQueries(['currentGuest']);
			const previousData = queryClient.getQueryData(['currentGuest']);
			return { previousData };
		},
		onError: (err, variables, context) => {
			queryClient.setQueryData(['currentGuest'], context?.previousData);
		},
		onSettled: (data) => {
			queryClient.invalidateQueries(['currentGuest']);
			queryClient.setQueryData(['currentGuest'], data);
		},
	});

	const handleGuestUser = async () => {
		let currentGuest: IGuest | undefined | null = await queryClient.getQueryData(['currentGuest']);
		if (!currentGuest) currentGuest = (await searchGuestInDB.refetch()).data;
		if (!currentGuest) currentGuest = (await createNewGuest.refetch()).data;
		if (currentGuest) {
			if (currentGuest.gamesCount >= 3) {
				if (!checkGuestTimeSession()) throw 'Guest has already played 3 games in the last 24h.';
				handleGuestNewSession.mutate();
			}
			handleGuestNewGame.mutate();
		}
	};

	return handleGuestUser;
}
