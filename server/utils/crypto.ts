import CryptoJS from 'crypto-js';

export function encryption(word: string, key: string): string {
	const cyphertext = CryptoJS.AES.encrypt(word, key);
	return cyphertext.toString();
}

export function decryption(word: string, key: string) {
	const decrypted = CryptoJS.AES.decrypt(word, key);
	const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
	return plaintext;
}
