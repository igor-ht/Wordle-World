import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';
import { BASE_URL, ENDPOINT, GoogleClientID, GoogleClientSecret } from '@/src/appConfig';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

const updateAcessToken = async (token: JWT): Promise<JWT> => {
	try {
		const updatedUser = await (await axios.post(`${ENDPOINT}/user/updateUserAccessToken`, { userEmail: token?.email })).data;
		if (!updatedUser) throw '';
		return {
			id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email,
			accessToken: updatedUser.accessToken,
			accessTokenExpires: Date.now() / 1000 + 60 * 15,
			refreshToken: updatedUser.refreshToken,
			refreshTokenExpires: Date.now() / 1000 + 60 * 30,
		};
	} catch {
		await signOut();
		return redirect('/signin');
	}
};

export const NextAuthOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Sign in',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;
				const res = await axios.post(`${BASE_URL}/api/signin`, { email: credentials.email, password: credentials.password });
				const userLogged = await res.data;
				if (!userLogged) return null;
				return {
					id: userLogged.id,
					name: userLogged.name,
					email: userLogged.email,
					accessToken: userLogged.accessToken,
					accessTokenExpires: Date.now() / 1000 + 60 * 15,
					refreshToken: userLogged.refreshToken,
					refreshTokenExpires: Date.now() / 1000 + 60 * 30,
				};
			},
		}),
		GoogleProvider({
			clientId: GoogleClientID,
			clientSecret: GoogleClientSecret,
			async profile(profile, tokens) {
				const credentials = {
					name: profile.name,
					email: profile.email,
					password: tokens.id_token,
				};
				const res = await axios.post(`${BASE_URL}/api/oauth`, credentials);
				const userLogged = res.data;
				tokens = {
					id: userLogged.id,
					name: userLogged.name,
					email: userLogged.email,
					accessToken: userLogged.accessToken,
					accessTokenExpires: Date.now() / 1000 + 60 * 15,
					refreshToken: userLogged.refreshToken,
					refreshTokenExpires: Date.now() / 1000 + 60 * 30,
				};
				profile = tokens;
				return { ...profile, tokens };
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user, trigger }) => {
			if (trigger === 'update') {
				const newToken = await updateAcessToken(token);
				if (newToken) return newToken;
			}
			if (!user) return token;
			return { ...user };
		},
		session: async ({ session, token }) => {
			return {
				id: token.id,
				name: token.name,
				email: token.email,
				accessToken: token.accessToken,
				accessTokenExpires: token.accessTokenExpires,
				refreshToken: token.refreshToken,
				refreshTokenExpires: token.refreshTokenExpires,
				expires: session.expires,
			};
		},
	},
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24 * 30,
	},
	jwt: {
		maxAge: 60 * 14,
	},
	pages: {
		signIn: '/signin',
		error: '/signin',
	},
};
