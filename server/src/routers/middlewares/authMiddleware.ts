import { Request, Response, NextFunction } from 'express';
import { accessTokenSecret } from '../../serverConfig';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) throw 'Invalid Request';
		const user = jwt.verify(token, accessTokenSecret) as { id: string; name: string; email: string; iat: number; exp: number };
		if (!req.headers.idx || req.headers.idx !== user.id) throw 'Invalid token.';

		return next();
	} catch {
		console.log('User not authorized.');
		return res.status(401).json({
			error: new Error('User not authorized'),
		});
	}
};

export default authMiddleware;
