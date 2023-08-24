import { Request, Response } from 'express';
import { decryption, encryption } from '../../../utils/crypto';
import { prisma } from '../../../model/clientDB';
import { encryptionKey } from '../../serverConfig';
import { GameSettingsType, WordDB } from '../../../controller/word/wordController';

let WordService: WordDB;
export default function WordController() {
	if (!WordService) WordService = new WordDB(prisma);
	return WordService;
}

export async function getRandomWord(req: Request, res: Response) {
	const gameSettings = req.query;
	console.log(gameSettings);
	const id = req.headers.idx as string | undefined;
	const randomWord = await WordController().getRandomWord(gameSettings as unknown as GameSettingsType, id);
	console.log(randomWord);
	if (!randomWord) return res.status(400).send('Server couldn`t get a random word');
	const cypherWord = encryption(randomWord, encryptionKey);
	return res.status(200).send(cypherWord);
}

export async function checkGuess(req: Request, res: Response) {
	const { guess, language, wordLength } = req.query;
	const cyphertext = req.headers.cyphertext as string;
	const wordExists = await WordController().searchGuess(
		{ language: language, wordLength: wordLength } as unknown as GameSettingsType,
		guess as string
	);
	if (!wordExists) return res.status(200).send(null);
	const plainWord = decryption(cyphertext, encryptionKey).toLowerCase();
	const guessChars = guess?.toString().split('');
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
