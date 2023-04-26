import { NextRequest, NextResponse } from 'next/server';
import { userLogin } from '../../signin/page';
import axios, { AxiosError } from 'axios';

const axiosUser = axios.create({
	baseURL: 'http://localhost:5000/user',
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
