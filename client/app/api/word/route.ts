import { ENDPOINT } from '@/appConfig';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const axiosWord = axios.create({
	baseURL: `${ENDPOINT}/word`,
});

export async function GET(request: NextRequest) {
	const Authorization = request.headers.get('Authorization');
	if (Authorization) {
		axiosWord.defaults.headers.Authorization = Authorization;
	}
	const res = await axiosWord.get(`/randWord`);
	return NextResponse.json(await res.data);
}

export async function POST(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const wordExists = searchParams.get('wordExists');
	if (wordExists) {
		const { word } = await request.json();
		const res = await axiosWord.post('/searchGuess', { word: word });
		return NextResponse.json(await res.data);
	}
	const checkGuess = searchParams.get('checkGuess');
	if (checkGuess) {
		const { cyphertext, guess } = await request.json();
		const res = await axiosWord.post('/checkGuess', { cyphertext: cyphertext, guess: guess });
		return NextResponse.json(await res.data);
	}
}
