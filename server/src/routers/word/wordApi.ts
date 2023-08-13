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
	return res.status(200).send(cypherWord);
}

export async function checkGuess(req: Request, res: Response) {
	const guess = req.query.guess as string;
	const cyphertext = req.headers.cyphertext as string;
	const wordExists = await WordController().searchGuess(guess);
	if (!wordExists) return res.status(200).send(null);
	const plainWord = decryption(cyphertext, encryptionKey).toLowerCase();
	const guessChars = guess?.split('');
	const ans = guessChars?.map((char: string, i: number) => {
		switch (true) {
			case char === plainWord[i]:
				return 'bull';
			case plainWord.includes(char):
				return 'cow';
			default:
				return 'wrong';
		}
	});
	return res.status(200).send(ans);
}
