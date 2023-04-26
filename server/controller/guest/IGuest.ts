import { Guests } from '@prisma/client';
import { ICrudDao } from '../ICrudDao';

export interface IGuestDao extends ICrudDao<IGuestCreate, IGuestUpdate, IGuestDisplay> {}

export interface IGuestCreate {
	ip: string;
	gamesCount: number;
	lastPlayed: number;
}
export interface IGuestUpdate extends IGuestCreate {}
export interface IGuestDisplay extends IGuestUpdate {}
