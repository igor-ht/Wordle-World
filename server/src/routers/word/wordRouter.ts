import express from 'express';
import { checkGuess, searchGuessInDB, getRandomWord } from './wordApi';
import wordMiddleware from '../middlewares/wordMiddleware';

const wordRouter = express.Router();

wordRouter.get('/randWord', wordMiddleware, getRandomWord);

wordRouter.post('/searchGuess', searchGuessInDB);

wordRouter.post('/checkGuess', checkGuess);

export default wordRouter;
