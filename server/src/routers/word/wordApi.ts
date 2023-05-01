import { Request, Response } from 'express';
import { decryption, encryption } from '../../../utils/crypto';
import { prisma } from '../../../model/clientDB';
import { encryptionKey } from '../../serverConfig';
import { WordDB } from '../../../controller/word/wordController';

let WordService: WordDB;
export default function WordController() {
	if (!WordService) WordService = new WordDB(prisma);
	return WordService;
}

export async function getRandomWord(req: Request, res: Response) {
	const { email } = req.body;
	const randomWord = await WordController().getRandomWord(email);
	console.log(randomWord);
	if (!randomWord) return res.status(400).send('Server couldn`t get a random word');
	const cypherWord = encryption(randomWord, encryptionKey);
	return res.status(200).send(cypherWord );
}

export async function searchGuessInDB(req: Request, res: Response) {
	const { word } = req.body;
	const wordExists = await WordController().searchGuess(word);
	return res.status(200).send(wordExists);
}

export async function checkGuess(req: Request, res: Response) {
	const { cyphertext, guess } = req.body;
	const plainWord = decryption(cyphertext, encryptionKey).toUpperCase();
	const plainWordChars = plainWord.split('');
	const guessChars = guess.split('');
	const ans = guessChars.map((char: string, i: number) => {
		switch (true) {
			case char === plainWord[i]:
				return 'bull';
			case plainWordChars.includes(char):
				return 'cow';
			default:
				return 'wrong';
		}
	});
	return res.status(200).send(ans);
}
