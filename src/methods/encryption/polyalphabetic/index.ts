import { EncryptedData } from 'store';
import { UNICODE_RING_SIZE } from 'methods/encryption';

/**
 * Symbolic cyclic shift of plain text by each key symbol char code
 *
 * @param  {string} text
 * @param  {string} key
 * @returns EncryptedData
 */
export function encryptPolyAlphabeticCode(text: string, key: string): EncryptedData {
	let encryptedData: EncryptedData = { code: [], text: '' };
	let symbolCode: number;

	for (let iter = 0; iter < text.length; iter++) {
		symbolCode =
			(text.charCodeAt(iter) + key.charCodeAt(iter % key.length)) % UNICODE_RING_SIZE;
		encryptedData.code.push(symbolCode);
		encryptedData.text += String.fromCharCode(symbolCode);
	}

	return encryptedData;
}

/**
 * Decryption
 *
 * @param  {string} text
 * @param  {string} key
 * @returns EncryptedData
 */
export function decryptPolyAlphabeticCode(text: string, key: string): EncryptedData {
	let keyReverse: string = '';

	for (let iter = 0; iter < key.length; iter++) {
		keyReverse += String.fromCharCode(UNICODE_RING_SIZE - key.charCodeAt(iter));
	}
	const plainData: EncryptedData = encryptPolyAlphabeticCode(text, keyReverse);

	return plainData;
}
