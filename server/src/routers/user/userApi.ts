import { Request, Response } from 'express';
import { comparePassword } from '../../../utils/hashing';
import { generateAccessToken, generateRefreshToken } from '../../../utils/jwt';
import { prisma } from '../../../model/clientDB';
import { accessTokenSecret, encryptionKey, refreshTokenSecret } from '../../serverConfig';
import { UserDao } from '../../../controller/user/userController';
import { decryption } from '../../../utils/crypto';
import jwt from 'jsonwebtoken';

let UserService: UserDao;
function UserDB() {
	if (!UserService) UserService = new UserDao(prisma);
	return UserService;
}

export async function checkUserInDB(email: string) {
	return await UserDB().read(email);
}

export async function handleSignUp(req: Request, res: Response) {
	try {
		await UserDB().handleUserInfoSignUp(req.body);
		const newUser = {
			name: req.body.name as string,
			email: req.body.email as string,
			password: req.body.password as string,
			points: 0,
		};
		const registeredUser = await UserDB().create(newUser);
		if (!registeredUser) throw 'We had a problem with your registration. Try again later.';
		const { id, name, email } = registeredUser;
		const accessToken = await generateAccessToken({ id, name, email }, accessTokenSecret);
		const refreshToken = await generateRefreshToken({ id, name, email }, refreshTokenSecret);
		const currentUser = {
			name: name,
			email: email,
			password: req.body.password as string,
			accessToken: accessToken,
			refreshToken: refreshToken,
			points: registeredUser.points,
		};
		const updatedUser = await UserDB().updateGeneralInfo(id, currentUser);
		res.status(200).send(updatedUser);
	} catch (error) {
		if (error === 'Name already registered.' || error === 'Email already registered.') return res.status(401).send(error);
		return res.status(400).send(error);
	}
}

export async function handleSignIn(req: Request, res: Response) {
	const user = await checkUserInDB(req.body.email);
	if (!user) return res.status(401).send('One or more information are invalid.');
	const { id, name, email, password } = user;
	const checkPassword = await comparePassword(req.body.password, password);
	if (!checkPassword) return res.status(401).send('One or more information are invalid.');
	const accessToken = await generateAccessToken({ id, name, email }, accessTokenSecret);
	const refreshToken = await generateRefreshToken({ id, name, email }, refreshTokenSecret);
	const updatedUser = await UserDB().updateGeneralInfo(user.id, {
		name: name,
		email: email,
		password: password,
		accessToken: accessToken,
		refreshToken: refreshToken,
	});
	if (!updatedUser) return res.status(400).send('We had a problem with the sign in proccess. Try again later.');
	res.status(200).send(updatedUser);
}

export async function updateUserAccessToken(req: Request, res: Response) {
	const { userEmail } = req.body;
	const currentUser = await UserDB().read(userEmail);
	if (!currentUser) return res.status(400).send('Server had a problem with user authentication');
	try {
		const { id, name, email } = jwt.verify(currentUser.refreshToken, refreshTokenSecret) as { id: string; name: string; email: string };
		const accessToken = await generateAccessToken({ id, name, email }, accessTokenSecret);
		const updatedUser = await UserDB().updateGeneralInfo(id, {
			name: currentUser.name,
			email: currentUser.email,
			accessToken: accessToken,
			refreshToken: currentUser.refreshToken,
			password: currentUser.password,
		});
		if (!updatedUser) return res.status(400).send('Server had an unexpected internal problem.');
		return res.status(200).send(updatedUser);
	} catch {
		return await updateUserRefreshToken(req, res);
	}
}

async function updateUserRefreshToken(req: Request, res: Response) {
	const { userEmail } = req.body;
	const currentUser = await UserDB().read(userEmail);
	if (!currentUser) return res.status(400).send('Server had an unexpected internal problem.');
	const { id, name, email } = currentUser;
	const newRefreshToken = await generateRefreshToken({ id, name, email }, refreshTokenSecret);
	const newAccessToken = await generateAccessToken({ id, name, email }, accessTokenSecret);
	const updatedUser = await UserDB().updateGeneralInfo(id, {
		name: currentUser.name,
		email: currentUser.email,
		password: currentUser.password,
		accessToken: newAccessToken,
		refreshToken: newRefreshToken,
	});
	if (!updatedUser) return res.status(400).send('Server had an unexpected internal problem.');
	return res.status(200).send(updatedUser);
}

export async function updateUserGeneralInfo(req: Request, res: Response) {
	const { email, updatedUser } = req.body;
	const user = await checkUserInDB(email);
	if (!user) return res.status(400).send('We had a problem.');
	const updatedUserFromDB = await UserDB().updateGeneralInfo(user.id, {
		name: updatedUser.name,
		email: updatedUser.email,
		password: updatedUser.password,
		accessToken: updatedUser.accessToken,
		refreshToken: updatedUser.refreshToken,
	});
	if (!updatedUserFromDB) return res.status(400).send('Server had an unexpected internal problem.');
	return res.status(200).send(updatedUserFromDB);
}

export async function updateUserRanking(req: Request, res: Response) {
	const { email, gameStats } = req.body;
	const { state, chances, word } = gameStats;
	const currentUser = await UserDB().read(email);
	if (!currentUser) return res.status(400).send('Server had an unexpected internal problem.');
	if (!state) {
		const updatedUser = await UserDB().updateUserRanking(email, Math.round((currentUser.points ? currentUser.points : 20_000) - 20_000));
		if (!updatedUser) return res.status(400).send('Server had an unexpected internal problem.');
		return res.status(200).send(updatedUser);
	}
	const plainWord = decryption(word, encryptionKey);
	const finalScore = 250_000 * Math.pow(0.8, chances);
	const updatedUser = await UserDB().updateUserRanking(
		email,
		Math.round((currentUser.points ? currentUser.points : 0) + finalScore),
		plainWord
	);
	if (!updatedUser) return res.status(400).send('Server had an unexpected internal problem.');
	return res.status(200).send(updatedUser);
}

export async function getDashboardData(req: Request, res: Response) {
	const { id } = req.body;
	const user = await UserDB().getUserStats(id);
	const ranking = await UserDB().getRanking();
	const userRank = await UserDB().getUserRank(id);
	if (!user || !ranking || !userRank) return res.status(400).send('Server had an unexpected internal problem.');
	const dashboardData = {
		rank: {
			ranking: ranking,
			user: userRank,
		},
		userStats: user,
	};
	res.status(200).send(dashboardData);
}

// export async function addFriend(req: Request, res: Response) {
// 	res.status(200);
// }

// export async function removeFriend(req: Request, res: Response) {
// 	res.status(200);
// }
