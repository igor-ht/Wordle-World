import express from 'express';
import { getDashboardData, handleSignIn, handleSignUp, updateUserAccessToken, updateUserGeneralInfo, updateUserRanking } from './userApi';
import authMiddleware from '../middlewares/authMiddleware';

const userRouter = express.Router();

userRouter.post('/signup', handleSignUp);

userRouter.post('/signin', handleSignIn);

userRouter.post('/updateUserAccessToken', updateUserAccessToken);

userRouter.post('/updateGeneralInfo', authMiddleware, updateUserGeneralInfo);

userRouter.post('/updateUserRanking', authMiddleware, updateUserRanking);

userRouter.post('/getDashboardData', authMiddleware, getDashboardData);

export default userRouter;
