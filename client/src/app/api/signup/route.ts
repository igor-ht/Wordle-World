import { NextRequest, NextResponse } from 'next/server';
import { handleHashing } from '@/utils/forms/hashing';
import { userSignUp } from '@/app/signup/SignUpForms';
import axios, { AxiosError } from 'axios';
import { ENDPOINT } from '@/appConfig';

const axiosUser = axios.create({
	baseURL: `${ENDPOINT}/user`,
});

export async function POST(request: NextRequest) {
	try {
		const user: userSignUp = await request.json();
		const hashedPassword = await handleHashing(user.password);
		const newUser = {
			name: user.name,
			email: user.email,
			password: hashedPassword,
		};
		const res = await axiosUser.post(`/signup`, newUser);
		const userData = await res.data;
		return NextResponse.json(userData);
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.response?.status === 401) {
				return new NextResponse(error.response.data, {
					status: 401,
				});
			}
			return Promise.resolve(error);
		}
	}
}
