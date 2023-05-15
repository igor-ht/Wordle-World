import { ENDPOINT } from '@/src/appConfig';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const axiosDashboard = axios.create({
	baseURL: `${ENDPOINT}/user`,
});

export async function POST(request: NextRequest) {
	const Authorization = request.headers.get('Authorization');
	axiosDashboard.defaults.headers.Authorization = Authorization;
	const { id, email } = await request.json();
	const { searchParams } = new URL(request.url);

	const getRanking = searchParams.get('getRanking');
	if (getRanking) {
		const res = await axiosDashboard.post('/getRanking', { email: email });
		return NextResponse.json(res.data);
	}

	const getUserRank = searchParams.get('getUserRank');
	if (getUserRank) {
		const res = await axiosDashboard.post('/getUserRank', { id: id, email: email });
		return NextResponse.json(res.data);
	}

	const getUserStats = searchParams.get('getUserStats');
	if (getUserStats) {
		const res = await axiosDashboard.post('/getUserStats', { id: id, email: email });
		return NextResponse.json(res.data);
	}
}
