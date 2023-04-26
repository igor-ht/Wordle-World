import axios from '@/utils/axios/axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const { name, email, password } = await request.json();
	try {
		const user = (await axios.post('http://localhost:5000/oauth/googleOAuthProvider', { name, email, password })).data;
		return NextResponse.json(user);
	} catch (error) {
		console.log(error);
		return NextResponse.error();
	}
}
