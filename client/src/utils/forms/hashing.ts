import * as bcrypt from 'bcrypt';

export async function handleHashing(data: string) {
	const hashed = bcrypt.hash(data, await bcrypt.genSalt(10));
	return hashed;
}

export async function comparePassword(plainPassword: string, hashPassword: string) {
	const compare = await bcrypt.compare(plainPassword, hashPassword);
	return compare;
}
