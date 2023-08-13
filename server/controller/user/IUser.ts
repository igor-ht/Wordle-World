import { Users } from '@prisma/client';
import { ICrudDao } from '../ICrudDao';

export interface IUserDao extends ICrudDao<IUserSignUp, IUpdateUser, IDisplayUser> {
	readonly exclude: <U extends Users, K extends keyof U>(user: U, keys: K[]) => IDisplayUser | null;
	create: (data: IUserSignUp) => Promise<IDisplayUser | null>;
	read: (identifier: string) => Promise<Users | null>;
	handleUserInfoSignUp: (user: IUserSignUp) => Promise<void>;
	updateGeneralInfo: (id: string, data: IUpdateUser) => Promise<IDisplayUser | null>;
	updateUserRanking: (email: string, points: number, word?: string) => Promise<IDisplayUser | null>;
	getUserStats: (id: string) => Promise<getUserStats>;
	getRanking: () => Promise<{ name: string; points: number }[] | null>;
	getUserRank: (id: string) => Promise<{ place: number; name: string; points: number } | null>;
	addUserFriend: (id: string, friendId: string) => Promise<IDisplayUser | null>;
	removeUserFriend: (id: string, friendId: string) => Promise<IDisplayUser | null>;
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
	friends?: any;
}

type getUserStats = {
	points: number;
	discoveredWords: {
		word: string;
	}[];
	following: {
		name: string;
		points: number;
	}[];
} | null;
