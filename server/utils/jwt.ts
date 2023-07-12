import jwt from 'jsonwebtoken';

export async function generateAccessToken(user: object, secretKey: string) {
	const accessToken = jwt.sign(user, secretKey, { expiresIn: '1m' });
	return accessToken;
}

export async function generateRefreshToken(user: object, secretKey: string) {
	const refreshToken = jwt.sign(user, secretKey, { expiresIn: '3m' });
	return refreshToken;
}
