import { IDisplayUser, IUpdateUser, IUserDao, IUserSignUp } from './IUser';
import { PrismaClient, Users, Words } from '@prisma/client';

export class UserDao implements IUserDao {
	private displayUser: IDisplayUser | null;

	constructor(public prisma: PrismaClient) {
		this.prisma = prisma;
		this.displayUser = null;
	}

	exclude<User extends Users, Keys extends keyof User>(user: User, keys: Keys[]): IDisplayUser {
		for (let key of keys) {
			delete user[key];
		}
		this.displayUser = user;
		return this.displayUser;
	}

	public async create(user: IUserSignUp): Promise<IDisplayUser | null> {
		const { name, email, password } = user;
		const newUser = await this.prisma.users.create({
			data: {
				name: name,
				email: email,
				password: password,
				points: 0,
				accessToken: '',
				refreshToken: '',
			},
		});
		if (!newUser) return null;
		const userWithoutPassword = this.exclude(newUser, ['password']);
		return userWithoutPassword;
	}

	public async read(email: string): Promise<Users | null> {
		const user = await this.prisma.users.findFirst({
			where: {
				email: email,
			},
		});
		if (!user) return null;
		return user;
	}

	public async handleUserInfoSignUp(user: IUserSignUp) {
		const { name, email } = user;
		const checkUserInfo = await this.prisma.users.findFirst({
			where: {
				OR: [
					{
						name: name,
					},
					{ email: email },
				],
			},
			select: {
				email: true,
				name: true,
			},
		});
		if (checkUserInfo && checkUserInfo.name === name) throw 'Name already registered.';
		if (checkUserInfo && checkUserInfo.email === email) throw 'Email already registered.';
	}

	public async updateGeneralInfo(id: string, user: IUpdateUser): Promise<IDisplayUser | null> {
		const { name, email, password, accessToken, refreshToken } = user;
		const updatedUser = await this.prisma.users.update({
			data: {
				name: name,
				email: email,
				password: password,
				accessToken: accessToken,
				refreshToken: refreshToken,
			},
			where: {
				id: id,
			},
		});
		if (!updatedUser) return null;
		const userWithoutPassword = this.exclude(updatedUser, ['password']);
		return userWithoutPassword;
	}

	public async updateUserRanking(email: string, points: number, word?: string): Promise<IDisplayUser | null> {
		if (!word) {
			const updatedUser = await this.prisma.users.update({
				data: {
					points: points,
				},
				where: {
					email: email,
				},
			});
			if (!updatedUser) return null;
			const userWithoutPassword = this.exclude(updatedUser, ['password']);
			return userWithoutPassword;
		}
		const discoveredWord = (await this.prisma.words.findUnique({
			where: {
				word: word,
			},
		})) as Words;
		const updatedUser = await this.prisma.users.update({
			data: {
				points: points,
				discoveredWords: {
					connect: {
						id: discoveredWord.id,
					},
				},
			},
			where: {
				email: email,
			},
		});
		if (!updatedUser) return null;
		const userWithoutPassword = this.exclude(updatedUser, ['password']);
		return userWithoutPassword;
	}

	public async getUserStats(id: string) {
		const user = await this.prisma.users.findFirst({
			where: {
				id: id,
			},
			select: {
				points: true,
				discoveredWords: {
					select: {
						word: true,
					},
				},
				following: {
					select: {
						name: true,
						points: true,
					},
				},
			},
		});
		if (!user) return null;
		return user;
	}

	public async getRanking() {
		const ranking = await this.prisma.users.findMany({
			select: {
				name: true,
				points: true,
			},
			orderBy: {
				points: 'desc',
			},
			take: 10,
		});
		if (!ranking) return null;
		return ranking;
	}

	public async getUserRank(id: string) {
		const userRank = await this.prisma.users.findFirst({
			select: {
				name: true,
				points: true,
			},
			where: {
				id: id,
			},
		});
		if (!userRank) return null;
		const userRanking = await this.prisma.users.findMany({
			where: { points: { gt: userRank.points } },
			select: { id: true },
		});
		return { ...userRank, place: userRanking.length + 1 };
	}

	public async addUserFriend(id: string, friendId: string): Promise<IDisplayUser | null> {
		const newFriend = await this.prisma.users.findUnique({
			where: {
				id: friendId,
			},
		});
		const updatedUser = await this.prisma.users.update({
			data: {
				following: {
					connect: {
						id: newFriend?.id,
					},
				},
			},
			where: {
				id: id,
			},
		});
		if (!updatedUser) return null;
		const userWithoutPassword = this.exclude(updatedUser, ['password']);
		return userWithoutPassword;
	}

	public async removeUserFriend(id: string, friendId: string): Promise<IDisplayUser | null> {
		const currentFriend = await this.prisma.users.findUnique({
			where: {
				id: friendId,
			},
		});
		const updatedUser = await this.prisma.users.update({
			data: {
				following: {
					disconnect: {
						id: currentFriend?.id,
					},
				},
			},
			where: {
				id: id,
			},
		});
		if (!updatedUser) return null;
		const userWithoutPassword = this.exclude(updatedUser, ['password']);
		return userWithoutPassword;
	}

	public async delete(id: string): Promise<boolean> {
		const deletedUser = await this.prisma.users.delete({
			where: {
				id: id,
			},
		});
		if (!deletedUser) return false;
		return true;
	}
}
