import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { userLogin } from '../../signin/SignInForms';
import { ENDPOINT } from '@/src/appConfig';

const axiosUser = axios.create({
	baseURL: `${ENDPOINT}/user`,
});

export async function POST(request: NextRequest) {
	try {
		const user: userLogin = await request.json();
		const res = await axiosUser.post('/signin', user);
		const userLogged = res.data;
		return NextResponse.json(userLogged);
	} catch (error) {
		return Promise.reject(error);
	}
}
