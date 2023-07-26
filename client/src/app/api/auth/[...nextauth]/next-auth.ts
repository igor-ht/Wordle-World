import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';
import { ENDPOINT, GoogleClientID, GoogleClientSecret } from '@/src/appConfig';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

const updateAcessToken = async (token: JWT): Promise<JWT> => {
	try {
		const updatedUser = await (await axios.post(`${ENDPOINT}/user/updateUserAccessToken`, { userEmail: token?.email })).data;
		if (!updatedUser) throw new Error();
		return {
			id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email,
			accessToken: updatedUser.accessToken,
			refreshToken: updatedUser.refreshToken,
		};
	} catch {
		await signOut();
		redirect('/signin');
	}
};

export const NextAuthOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Sign in',
			credentials: {
				id: { label: 'id', type: 'id' },
				name: { label: 'name', type: 'name' },
				email: { label: 'email', type: 'email' },
				accessToken: { label: 'accessToken', type: 'accessToken' },
				refreshToken: { label: 'refreshToken', type: 'refreshToken' },
			},
			async authorize(credentials) {
				if (!credentials) return null;
				return {
					id: credentials.id,
					name: credentials.name,
					email: credentials.email,
					accessToken: credentials.accessToken,
					refreshToken: credentials.refreshToken,
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
				const res = await axios.post(`/oauth/googleOAuthProvider`, credentials);
				const userLogged = res.data;
				tokens = {
					id: userLogged.id,
					name: userLogged.name,
					email: userLogged.email,
					accessToken: userLogged.accessToken,
					refreshToken: userLogged.refreshToken,
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
				refreshToken: token.refreshToken,
				expires: session.expires,
			};
		},
	},
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24 * 30,
	},
	jwt: {
		maxAge: 60 * 30,
	},
	pages: {
		signIn: '/signin',
		newUser: '/signup',
	},
};
