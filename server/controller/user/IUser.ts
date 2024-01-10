import { Users } from '@prisma/client';
import { ICrudDao } from '../ICrudDao';

export interface IUserDao extends ICrudDao<IUserSignUp, IUpdateUser, IDisplayUser> {
	readonly exclude: <U extends IDisplayUser, K extends keyof U>(user: U, keys: K[]) => IDisplayUser | null;
	create: (data: IUserSignUp) => Promise<IDisplayUser | null>;
	read: (identifier: string) => Promise<Users | null>;
	handleUserInfoSignUp: (user: IUserSignUp) => Promise<void>;
	updateGeneralInfo: (id: string, data: IUpdateUser) => Promise<IDisplayUser | null>;
	updateUserRanking: (email: string, points: number, word?: string) => Promise<IDisplayUser | null>;
	getUserStats: (id: string) => Promise<{
		points: number;
		discoveredWords: {
			word: string;
		}[];
	} | null>;
	getRanking: () => Promise<{ name: string; points: number }[] | null>;
	getUserRank: (id: string) => Promise<{ place: number; name: string; points: number } | null>;
	delete: (id: string) => Promise<boolean>;
}
export interface IUserSignUp {
	name: string;
	email: string;
	password: string;
}
export interface IUpdateUser {
	name: string;
	email: string;
	password: string;
	accessToken: string;
	refreshToken: string;
}
export interface IDisplayUser {
	id: string;
	name: string;
	email: string;
	accessToken: string;
	refreshToken: string;
	points: number;
	discoveredWords?: any;
}
