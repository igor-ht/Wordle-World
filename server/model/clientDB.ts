import { PrismaClient } from '@prisma/client';

export let prisma: PrismaClient;

export async function connectDataBase() {
	if (!prisma) {
		prisma = new PrismaClient();
		console.log('Prisma Client created');
		await prisma.$connect();
		console.log('Prisma Client connected');
	} else {
		console.log('Already connected to Database.');
	}
}
