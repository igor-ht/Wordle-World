import { ENDPOINT } from '@/src/appConfig';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const axiosGuest = axios.create({
	baseURL: `${ENDPOINT}/guest`,
});

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const create = searchParams.get('create');
	if (create) {
		const res = await axiosGuest.get(`/handleCreateNewGuest`);
		const guest = await res.data;
		return NextResponse.json(guest);
	}
	const newSession = searchParams.get('newSession');
	if (newSession) {
		const res = await axiosGuest.post(`/handleGuestNewSession`, { ip: newSession });
		const guest = await res.data;
		return NextResponse.json(guest);
	}
	const res = await axiosGuest.get(`/handleSearchGuest`);
	const guest = await res.data;
	return NextResponse.json(guest);
}

export async function POST(request: NextRequest) {
	const currentGuest = await request.json();
	const res = await axiosGuest.post(`/handleGuestNewGame`, currentGuest);
	const guest = await res.data;
	return NextResponse.json(guest);
}
