import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { axiosAuth } from '../axios/axios';

const useAxiosAuth = () => {
	const { data: session, status, update } = useSession();

	const updateAcessToken = async () => {
		try {
			const session = await update();
		} catch {
			return Promise.reject('Sign in again to iniate a new session');
		}
	};

	useEffect(() => {
		if (status && status === 'authenticated') {
			const requestIntercept = axiosAuth.interceptors.request.use(
				(config) => {
					if (!config.headers.Authorization) config.headers.Authorization = `Bearer ${session?.accessToken}`;
					return config;
				},
				(error) => Promise.reject(error)
			);
			const responseInterceptor = axiosAuth.interceptors.response.use(
				(response) => response,
				async (error) => {
					const prevRequest = error.config;
					if (error?.response?.status && error.response.status === 401 && !prevRequest.sent) {
						prevRequest.sent = true;
						await updateAcessToken();
						prevRequest.headers.Authorization = `Bearer ${session?.accessToken}`;
						if (!prevRequest?.body?.email)
							prevRequest.body = {
								...prevRequest.body,
								email: session.user?.email,
							};
						return axiosAuth(prevRequest);
					}
					return Promise.reject(error);
				}
			);
			return () => {
				axiosAuth.interceptors.request.eject(requestIntercept);
				axiosAuth.interceptors.response.eject(responseInterceptor);
			};
		}
	});

	return axiosAuth;
};

export default useAxiosAuth;
