import { Guests, PrismaClient } from '@prisma/client';
import { IGuestCreate, IGuestDao, IGuestDisplay, IGuestUpdate } from './IGuest';

export class GuestDao implements IGuestDao {
	constructor(public prisma: PrismaClient) {
		this.prisma = prisma;
	}

	public async create(guest: IGuestCreate): Promise<IGuestDisplay | null> {
		const { ip, gamesCount, lastPlayed } = guest;
		const newGuest = await this.prisma.guests.create({
			data: {
				ip: ip,
				gamesCount: gamesCount,
				lastPlayed: lastPlayed,
			},
			select: {
				id: false,
				ip: true,
				gamesCount: true,
				lastPlayed: true,
			},
		});
		if (!newGuest) return null;
		return newGuest as IGuestDisplay;
	}

	public async read(ip: string): Promise<Guests | null> {
		const guest = await this.prisma.guests.findFirst({
			where: {
				ip: ip,
			},
		});
		if (!guest) return null;
		return guest;
	}

	public async updateGeneralInfo(id: string, guest: IGuestUpdate): Promise<IGuestDisplay | null> {
		const { ip, gamesCount, lastPlayed } = guest;
		const updatedGuest = await this.prisma.guests.update({
			data: {
				ip: ip,
				gamesCount: gamesCount,
				lastPlayed: lastPlayed,
			},
			where: {
				id: id,
			},
			select: {
				id: false,
				ip: true,
				gamesCount: true,
				lastPlayed: true,
			},
		});
		if (!updatedGuest) return null;
		return updatedGuest as IGuestDisplay;
	}

	public async delete(id: string): Promise<boolean> {
		const deletedGuest = await this.prisma.guests.delete({
			where: {
				id: id,
			},
		});
		if (!deletedGuest) return false;
		return true;
	}
	public async truncateTable() {
		const deletedGuests = await this.prisma.guests.deleteMany();
		if (!deletedGuests) return null;
		return deletedGuests.count;
	}
}
