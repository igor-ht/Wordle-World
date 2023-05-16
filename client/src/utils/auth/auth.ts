import { NextAuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { BASE_URL, ENDPOINT, GoogleClientID, GoogleClientSecret } from '@/src/appConfig';
import axios from 'axios';
import { redirect } from 'next/navigation';

export const updateAcessToken = async (token: JWT): Promise<JWT> => {
	try {
		const updatedUser = (await axios.post(`${ENDPOINT}/user/updateUserAccessToken`, { userEmail: token?.email })).data;
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
		redirect('/signin');
	}
};

export const authOptions: NextAuthOptions = {
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
				return newToken;
			}
			if (!user) return token;
			return { ...token, ...user };
		},
		session: async ({ session, token }): Promise<Session> => {
			const newSession = {
				...session,
				accessToken: token.accessToken,
				accessTokenExpires: token.accessTokenExpires,
				refreshToken: token.refreshToken,
				refreshTokenExpires: token.refreshTokenExpires,
				user: {
					id: token.id,
					name: token.name,
					email: token.email,
				},
			};
			return newSession;
		},
		redirect: async ({ url, baseUrl }) => {
			return url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl);
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
		newUser: '/signup',
		error: '/signin',
	},
};
