import { PrismaClient } from '@prisma/client';

export type GameSettingsType = {
	language: 'EN' | 'ES' | 'PT' | 'HE';
	wordLength: 4 | 5 | 6;
};

interface IWordDB {
	getRandomWord: (gameSettings: GameSettingsType, id?: string) => Promise<string | null>;
	searchGuess: (gameSettings: GameSettingsType, guess: string) => Promise<boolean>;
}

export class WordDB implements IWordDB {
	constructor(public prisma: PrismaClient) {
		this.prisma = prisma;
	}

	public async getRandomWord(gameSettings: GameSettingsType, id?: string): Promise<string | null> {
		if (!id) return await this.getGuestRandomWord(gameSettings);
		return await this.getUserRandomWord(gameSettings, id);
	}

	private async getGuestRandomWord(gameSettings: GameSettingsType): Promise<string | null> {
		const randomNum = Math.floor(Math.random() * 5757);
		this.prisma.wordsEN4;
		const wordTable = this.prisma[`words${gameSettings.language}${gameSettings.wordLength}`] as any;
		if (wordTable) {
			const res = await wordTable.findFirst({
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
		return null;
	}

	private async getUserRandomWord(gameSettings: GameSettingsType, id: string): Promise<string | null> {
		const randomNum = Math.floor(Math.random() * 5756) + 1;
		const wordTable = this.prisma[`words${gameSettings.language}${gameSettings.wordLength}`] as any;
		const res = await wordTable.findMany({
			take: Math.floor(Math.random() * (5757 - randomNum)) + 1,
			where: {
				discoveredBy: {
					none: {
						id: id,
					},
				},
			},
		});
		const word = res[Math.floor(Math.random() * res.length)].word;
		if (!word) return null;
		return word;
	}

	public async searchGuess(gameSettings: GameSettingsType, guess: string) {
		const wordTable = this.prisma[`words${gameSettings.language}${gameSettings.wordLength}`] as any;
		const res = await wordTable.findFirst({
			where: {
				word: guess,
			},
		});
		if (!res) return false;
		return true;
	}
}
