import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
	interface Session {
		user?: User;
		accessToken: string;
		accessTokenExpires: number;
		refreshToken: string;
		refreshTokenExpires: number;
	}
	interface User {
		id: string;
		name: string;
		email: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
		name: string;
		email: string;
		accessToken: string;
		accessTokenExpires: number;
		refreshToken: string;
		refreshTokenExpires: number;
	}
}
