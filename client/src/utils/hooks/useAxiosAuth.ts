import axios from 'axios';
import { ENDPOINT } from '@/src/appConfig';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const useAxiosAuth = () => {
	const { data: session, status } = useSession();
	const axiosAuth = axios;
	useEffect(() => {
		axiosAuth.defaults.baseURL = ENDPOINT;
		if (status === 'authenticated' && session) {
			axiosAuth.defaults.headers.common['Authorization'] = `Bearer ${session.accessToken}`;
			axiosAuth.defaults.data = { email: session.email };
		}
	}, [axiosAuth, status, session]);

	return axiosAuth;
};

export default useAxiosAuth;
