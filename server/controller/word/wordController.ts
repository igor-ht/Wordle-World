import { PrismaClient } from '@prisma/client';

interface IWordDB {
	getRandomWord: (email?: string) => Promise<string | null>;
	searchGuess: (guess: string) => Promise<boolean>;
}

export class WordDB implements IWordDB {
	constructor(public prisma: PrismaClient) {
		this.prisma = prisma;
	}

	public async getRandomWord(email?: string): Promise<string | null> {
		if (!email) return await this.getGuestRandomWord();
		return await this.getUserRandomWord(email);
	}

	private async getGuestRandomWord(): Promise<string | null> {
		const randomNum = Math.floor(Math.random() * 5757);
		const res = await this.prisma.words.findFirst({
			where: {
				id: {
					gt: randomNum,
					lt: 5758,
				},
			},
		});
		const word = res?.word;
		if (!word) return null;
		return word;
	}

	private async getUserRandomWord(email: string): Promise<string | null> {
		const randomNum = Math.floor(Math.random() * 5756) + 1;
		const res = await this.prisma.words.findMany({
			take: Math.floor(Math.random() * (5757 - randomNum)) + 1,
			where: {
				discoveredBy: {
					none: {
						email: email,
					},
				},
			},
		});
		const word = res[Math.floor(Math.random() * res.length)].word;
		if (!word) return null;
		return word;
	}

	public async searchGuess(guess: string) {
		const res = await this.prisma.words.findFirst({
			where: {
				word: guess,
			},
		});
		if (!res) return false;
		return true;
	}
}
