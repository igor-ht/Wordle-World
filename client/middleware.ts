import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

// export async function middleware(request: NextRequest) {
// 	const token = await getToken({
// 		req: request,
// 		secret: process?.env?.NEXTAUTH_SECRET,
// 		cookieName: 'next-auth.session-token',
// 	});

// 	if (token?.accessToken && Date.now() > token?.accessTokenExpires) return NextResponse.redirect('http://localhost:3000/signin');

// 	const requestHeaders = new Headers(request.headers);
// 	requestHeaders.set('authorization', `Bearer ${token?.accessToken}`);
// 	const response = NextResponse.next({
// 		request: {
// 			headers: requestHeaders,
// 		},
// 		headers: requestHeaders,
// 	});

// 	return response;
// }

export const config = { matcher: ['/dashboard'] };
