import { Request, Response } from 'express';
import { GuestDao } from '../../../controller/guest/guestController';
import { prisma } from '../../../model/clientDB';
import { Guests } from '@prisma/client';

let GuestService: GuestDao;
function GuestController() {
	if (!GuestService) GuestService = new GuestDao(prisma);
	return GuestService;
}

export async function handleSearchGuest(req: Request, res: Response) {
	const foward = req.headers['x-forwarded-for'] as string;
	const ip = foward ? foward.split(/, /)[0] : (req.socket.remoteAddress as string);
	const guest = await GuestController().read(ip);
	if (!guest) return res.status(200).send(null);
	return res.status(200).send({ ip: guest.ip, gamesCount: guest.gamesCount, lastPlayed: guest.lastPlayed });
}

export async function handleCreateNewGuest(req: Request, res: Response) {
	const foward = req.headers['x-forwarded-for'] as string;
	const newIp = foward ? foward.split(/, /)[0] : (req.socket.remoteAddress as string);
	const newGuest = {
		ip: newIp,
		gamesCount: 0,
		lastPlayed: Math.floor(Date.now() / 1000),
	};
	const guest = await GuestController().create(newGuest);
	if (!guest) throw new Error('Had a problem creating new guest and adding to database');
	return res.status(200).send(guest);
}

export async function handleGuestNewGame(req: Request, res: Response) {
	const { ip, gamesCount } = req.body;
	const currentGuest = (await GuestController().read(ip)) as Guests;
	const foward = req.headers['x-forwarded-for'] as string;
	const newIp = foward ? foward.split(/, /)[0] : req.socket.remoteAddress ? req.socket.remoteAddress : ip;
	const guest = {
		ip: newIp,
		gamesCount: gamesCount + 1,
		lastPlayed: Math.floor(Date.now() / 1000),
	};
	const updatedGuest = await GuestController().updateGeneralInfo(currentGuest.id, guest);
	if (!updatedGuest) return res.status(400).send('An unexpected problem happened while updating guest session');
	return res.status(200).send(updatedGuest);
}

export async function handleGuestNewSession(req: Request, res: Response) {
	const { ip } = req.body;
	const currentGuest = (await GuestController().read(ip)) as Guests;
	const foward = req.headers['x-forwarded-for'] as string;
	const newIp = foward ? foward.split(/, /)[0] : (req.socket.remoteAddress as string);
	const guestNewSession = {
		ip: newIp,
		gamesCount: 1,
		lastPlayed: Math.floor(Date.now() / 1000),
	};
	const updatedGuest = await GuestController().updateGeneralInfo(currentGuest.id, guestNewSession);
	if (!updatedGuest) return res.status(400).send('Had a problem updating guest session.');
	return res.status(200).send(updatedGuest);
}
