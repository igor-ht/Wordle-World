import { decryption } from '../utils/crypto';
import { encryption } from '../utils/crypto';
import { comparePassword } from '../utils/hashing';
import { handleHashing } from '../utils/hashing';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import jwt from 'jsonwebtoken';

describe('Utils functions tests', () => {
	describe('Crypto-JS encryption and decryption test', () => {
		let cyphertext: string;
		beforeEach(() => {
			cyphertext = encryption('test', 'test-key');
		});
		it('Encryption test', () => {
			expect(cyphertext).toBeDefined();
		});
		it('Decryption test', () => {
			const plaintext = decryption(cyphertext, 'test-key');
			expect(plaintext).toBe('test');
			expect(plaintext).toBeDefined();
			const badkey = decryption(cyphertext, 'testkey');
			expect(badkey).toBeFalsy();
			expect(badkey).toBe('');
		});
		it('Encryption should never be the same, decryption remains the same', () => {
			const cypherDuple = encryption('test', 'test-key');
			expect(cypherDuple).toBeDefined();
			expect(cyphertext).not.toEqual(cypherDuple);
			expect(decryption(cyphertext, 'test-key')).toStrictEqual(decryption(cypherDuple, 'test-key'));
		});
	});
	describe('Hashing password with bcrypt test', () => {
		let hashedData: string;
		beforeEach(async () => {
			hashedData = await handleHashing('password-test');
		});
		it('Hashing data', async () => {
			expect(hashedData).toBeDefined();
		});
		it('Compare plaintext and hashedData', async () => {
			expect(await comparePassword('password-test', hashedData)).toBeTruthy();
			expect(await comparePassword('password-wrong', hashedData)).toBeFalsy();
		});
	});
	describe('JWT tokens tests', () => {
		it('AccessToken generator and verification', async () => {
			const accessToken = await generateAccessToken({ id: 1, name: 'test' }, 'test-key');
			expect(accessToken).toBeDefined();
			const checkAccessToken = jwt.verify(accessToken, 'test-key') as any;
			expect(checkAccessToken.id).toStrictEqual(1);
			expect(checkAccessToken.name).toStrictEqual('test');
			expect(() => jwt.verify(accessToken, 'wrong-key')).toThrow();
		});
		it('RefreshToken generator and verification', async () => {
			const RefreshToken = await generateRefreshToken({ id: 1, name: 'test' }, 'test-key');
			expect(RefreshToken).toBeDefined();
			const checkRefreshToken = jwt.verify(RefreshToken, 'test-key') as any;
			expect(checkRefreshToken.id).toStrictEqual(1);
			expect(checkRefreshToken.name).toStrictEqual('test');
			expect(() => jwt.verify(RefreshToken, 'wrong-key')).toThrow();
		});
	});
});
