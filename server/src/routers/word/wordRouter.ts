import express from 'express';
import { checkGuess, getRandomWord } from './wordApi';
import wordMiddleware from '../middlewares/wordMiddleware';

const wordRouter = express.Router();

wordRouter.get('/randWord', wordMiddleware, getRandomWord);

wordRouter.get('/checkGuess', checkGuess);

export default wordRouter;
