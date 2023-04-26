import { Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken } from '../../../utils/jwt';
import { prisma } from '../../../model/clientDB';
import { accessTokenSecret, refreshTokenSecret } from '../../serverConfig';
import { UserDao } from '../../../controller/user/userController';
import { checkUserInDB } from '../user/userApi';
import { handleHashing } from '../../../utils/hashing';
import { Users } from '@prisma/client';

let UserService: UserDao;
function UserDB() {
	if (!UserService) UserService = new UserDao(prisma);
	return UserService;
}

export async function handleGoogleOAuth(req: Request, res: Response) {
	try {
		const { name, email, password } = req.body;
		const user = await checkUserInDB(email);
		if (user) return res.status(200).send(await userGoogleSignIn(user));
		return res.status(200).send(await registerNewGoogleUser({ name, email, password }));
	} catch (error) {
		return res.status(400).send('We had a problem in the proccess. Try again later.');
	}
}
async function registerNewGoogleUser({ name, email, password }: { name: string; email: string; password: string }) {
	try {
		const hashedPassword = await handleHashing(password);
		const newUser = {
			name: name,
			email: email,
			password: hashedPassword,
			points: 0,
			accessToken: '',
			refreshToken: '',
		};
		const registeredUser = (await UserDB().create(newUser)) as Users;
		if (!registeredUser) throw new Error();
		const { id } = registeredUser;
		const accessToken = await generateAccessToken({ id, name, email }, accessTokenSecret);
		const refreshToken = await generateRefreshToken({ id, name, email }, refreshTokenSecret);
		const currentUser = {
			name: registeredUser.name,
			email: registeredUser.email,
			password: registeredUser.password,
			accessToken: accessToken,
			refreshToken: refreshToken,
		};
		const updatedUser = await UserDB().updateGeneralInfo(registeredUser?.id!, currentUser);
		if (!updatedUser) throw new Error();
		return updatedUser;
	} catch {
		return null;
	}
}
async function userGoogleSignIn(user: Users) {
	try {
		const { id, name, email, password } = user;
		const updatedAccessToken = await generateAccessToken({ id, name, email }, accessTokenSecret);
		const updatedRefreshToken = await generateRefreshToken({ id, name, email }, refreshTokenSecret);
		const updatedUser = await UserDB().updateGeneralInfo(user.id, {
			name: name,
			email: email,
			password: password as string,
			accessToken: updatedAccessToken,
			refreshToken: updatedRefreshToken,
		});
		if (!updatedUser) return null;
		return updatedUser;
	} catch {
		return null;
	}
}
