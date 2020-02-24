import { EncryptedData } from 'store';
import { UNICODE_RING_SIZE } from 'methods/encryption';

export function encryptCesar(text: string, key: number): EncryptedData {
	let encryptedData: EncryptedData = { code: [], text: '' };
	let symbolCode: number;

	for (let iter = 0; iter < text.length; iter++) {
		symbolCode = (text.charCodeAt(iter) + key) % UNICODE_RING_SIZE;
		encryptedData.code.push(symbolCode);
		encryptedData.text += String.fromCharCode(symbolCode);
	}

	return encryptedData;
}

export function decryptCesar(text: string, key: number): EncryptedData {
	const plainData: EncryptedData = encryptCesar(text, UNICODE_RING_SIZE - key);
	return plainData;
}
