export interface ICrudDao<O, G, T> {
	create: (data: O) => Promise<T | null>;
	read: (identifier: string) => Promise<any | null>;
	updateGeneralInfo: (id: string, data: G) => Promise<T | null>;
	delete: (id: string) => Promise<boolean>;
}
