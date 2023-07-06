import jwt from 'jsonwebtoken';

export async function generateAccessToken(user: object, secretKey: string) {
	const accessToken = jwt.sign(user, secretKey, { expiresIn: '30m' });
	return accessToken;
}

export async function generateRefreshToken(user: object, secretKey: string) {
	const refreshToken = jwt.sign(user, secretKey, { expiresIn: '24h' });
	return refreshToken;
}
