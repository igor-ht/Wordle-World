import express from 'express';
import { handleGoogleOAuth } from './OAuthApi';

const OAuthRouter = express.Router();

OAuthRouter.post('/googleOAuthProvider', handleGoogleOAuth);
// OAuthRouter.post('/githubOAuthProvider', () => {});

export default OAuthRouter;
