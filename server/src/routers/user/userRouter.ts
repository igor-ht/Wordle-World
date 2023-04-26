import express from 'express';
import {
	addFriend,
	getRanking,
	getUserRank,
	getUserStats,
	handleSignIn,
	handleSignUp,
	removeFriend,
	updateUserAccessToken,
	updateUserGeneralInfo,
	updateUserRanking,
} from './userApi';
import authMiddleware from '../middlewares/authMiddleware';

const userRouter = express.Router();

userRouter.post('/signup', handleSignUp);

userRouter.post('/signin', handleSignIn);

userRouter.post('/updateUserAccessToken', updateUserAccessToken);

userRouter.post('/updateGeneralInfo', authMiddleware, updateUserGeneralInfo);

userRouter.post('/updateUserRanking', authMiddleware, updateUserRanking);

userRouter.post('/getUserStats', authMiddleware, getUserStats);

userRouter.post('/getRanking', authMiddleware, getRanking);

userRouter.post('/getUserRank', authMiddleware, getUserRank);

userRouter.post('/addFriend', authMiddleware, addFriend);

userRouter.post('/removeFriend', authMiddleware, removeFriend);

export default userRouter;
