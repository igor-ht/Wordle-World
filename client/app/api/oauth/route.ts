import { ENDPOINT } from '@/src/appConfig';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const { name, email, password } = await request.json();
	try {
		const user = (await axios.post(`${ENDPOINT}/oauth/googleOAuthProvider`, { name, email, password })).data;
		return NextResponse.json(user);
	} catch (error) {
		console.log(error);
		return NextResponse.error();
	}
}
