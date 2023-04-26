import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from '@/utils/axios/axios';
import { JWT } from 'next-auth/jwt';

export const updateAcessToken = async (token: JWT): Promise<JWT> => {
	const updatedUser = (await axios.post('http://localhost:5000/user/updateUserAccessToken', { userEmail: token?.email })).data;
	return {
		id: updatedUser.id,
		name: updatedUser.name,
		email: updatedUser.email,
		accessToken: updatedUser.accessToken,
		accessTokenExpires: Date.now() / 1000 + 60 * 15,
		refreshToken: updatedUser.refreshToken,
		refreshTokenExpires: Date.now() / 1000 + 60 * 30,
	};
};

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Sign in',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) return null;
				const res = await axios.post('/api/signin', { email: credentials?.email, password: credentials?.password });
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
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			async profile(profile, tokens) {
				const credentials = {
					name: profile.name,
					email: profile.email,
					password: tokens.id_token,
				};
				const res = await axios.post('api/oauth', credentials);
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
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	jwt: {
		maxAge: 60 * 14,
	},
	pages: {
		signIn: 'http://localhost:3000/signin',
	},
};

export default NextAuth(authOptions);
