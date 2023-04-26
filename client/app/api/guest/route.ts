import axios from '@/utils/axios/axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const create = searchParams.get('create');
	if (create) {
		const res = await axios.get('http://localhost:5000/guest/handleCreateNewGuest');
		const guest = await res.data;
		return NextResponse.json(guest);
	}
	const newSession = searchParams.get('newSession');
	if (newSession) {
		const res = await axios.post('http://localhost:5000/guest/handleGuestNewSession', { ip: newSession });
		const guest = await res.data;
		return NextResponse.json(guest);
	}
	const res = await axios.get('http://localhost:5000/guest/handleSearchGuest');
	const guest = await res.data;
	return NextResponse.json(guest);
}

export async function POST(request: NextRequest) {
	const currentGuest = await request.json();
	const res = await axios.post('http://localhost:5000/guest/handleGuestNewGame', currentGuest);
	const guest = await res.data;
	return NextResponse.json(guest);
}
