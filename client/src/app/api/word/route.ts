import axios, { AxiosError, AxiosResponse } from 'axios';
import { ENDPOINT } from '@/src/appConfig';
import { NextRequest, NextResponse } from 'next/server';

const axiosWord = axios.create({
	baseURL: `${ENDPOINT}/word`,
});

export async function GET(request: NextRequest) {
	try {
		const Authorization = request.headers.get('Authorization');
		if (Authorization) {
			axiosWord.defaults.headers.Authorization = Authorization;
		}
		const res = await axiosWord.get(`/randWord`);
		return NextResponse.json(await res.data);
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			const errorResponse: AxiosResponse = error.response;
			if (errorResponse.status === 401) {
				await Promise.resolve(error);
				return new AxiosError(error.message, '401');
			}
		}
		throw new Error('An unexpected error occurred. Please try again later.');
	}
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
