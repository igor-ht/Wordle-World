import { ENDPOINT } from '@/appConfig';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const axiosUser = axios.create({
	baseURL: `${ENDPOINT}/user`,
});

export async function POST(request: NextRequest) {
	const Authorization = request.headers.get('Authorization');
	axiosUser.defaults.headers.Authorization = Authorization;
	const { email, gameStats } = await request.json();
	const res = await axiosUser.post('/updateUserRanking', { email: email, gameStats: gameStats });
	return NextResponse.json(res.status);
}
