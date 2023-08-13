import axios from 'axios';
import { ENDPOINT } from '@/appConfig';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const GLOBAL_AXIOS = axios;

const useAxiosAuth = () => {
	const { data: session, status } = useSession();
	const axiosAuth = GLOBAL_AXIOS;

	useEffect(() => {
		axiosAuth.defaults.baseURL = ENDPOINT;
		if (status === 'authenticated' && session) {
			axiosAuth.defaults.headers.common['Authorization'] = `Bearer ${session.accessToken}`;
			axiosAuth.defaults.headers.common['idx'] = session.id;
		}
	}, [axiosAuth, status, session]);

	return axiosAuth;
};

export default useAxiosAuth;
