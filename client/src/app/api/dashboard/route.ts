import axios, { AxiosError, AxiosResponse } from 'axios';
import { ENDPOINT } from '@/src/appConfig';
import { NextRequest, NextResponse } from 'next/server';

const axiosDashboard = axios.create({
	baseURL: `${ENDPOINT}/user`,
});

export async function POST(request: NextRequest) {
	try {
		const Authorization = request.headers.get('Authorization');
		axiosDashboard.defaults.headers.Authorization = Authorization;
		const { id, email } = await request.json();
		const res = await axiosDashboard.post('/getDashboardData', { id: id, email: email });
		return NextResponse.json(res.data);
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
