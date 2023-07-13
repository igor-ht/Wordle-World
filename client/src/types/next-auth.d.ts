import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
	interface Session {
		id: string;
		name: string;
		email: string;
		accessToken: string;
		refreshToken: string;
	}
	interface User {
		id: string;
		name: string;
		email: string;
		accessToken: string;
		refreshToken: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
		name: string;
		email: string;
		accessToken: string;
		refreshToken: string;
	}
}
