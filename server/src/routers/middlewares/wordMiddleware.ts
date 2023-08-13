import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { accessTokenSecret } from '../../serverConfig';

const wordMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (token) {
			const user = jwt.verify(token, accessTokenSecret) as { id: string; name: string; email: string; iat: number; exp: number };
			if (!req.headers.idx || req.headers.idx !== user.id) throw 'Invalid token.';
		}

		return next();
	} catch {
		return res.status(401).json({
			error: new Error('Invalid request!'),
		});
	}
};

export default wordMiddleware;
