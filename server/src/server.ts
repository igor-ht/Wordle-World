import express from 'express';
import cors from 'cors';
import { serverHost, serverOrigin } from './serverConfig';
import wordRouter from './routers/word/wordRouter';
import userRouter from './routers/user/userRouter';
import guestRouter from './routers/guest/guestRouter';
import OAuthRouter from './routers/oauth/OAuthRouter';

export const appServer = express();

appServer.use(
	cors({
		origin: `http://${serverHost}:${serverOrigin}`,
	})
);

appServer.use(express.json());

appServer.use(express.urlencoded({ extended: false }));

appServer.use('/word', wordRouter);

appServer.use('/user', userRouter);

appServer.use('/guest', guestRouter);

appServer.use('/oauth', OAuthRouter);
