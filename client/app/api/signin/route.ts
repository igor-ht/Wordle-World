import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { userLogin } from '@/app/signin/SignInForms';
import { ENDPOINT } from '@/src/appConfig';

const axiosUser = axios.create({
	baseURL: `${ENDPOINT}/user`,
});

axiosUser.interceptors.response.use(undefined, (error: AxiosError) => {
	return Promise.reject(error);
});

export async function POST(request: NextRequest) {
	const user: userLogin = await request.json();
	const res = await axiosUser.post('/signin', user);
	const userLogged = res.data;
	return NextResponse.json(userLogged);
}
