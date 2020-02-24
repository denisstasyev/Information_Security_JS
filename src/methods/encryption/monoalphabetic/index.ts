import { EncryptedData } from 'store';
import { UNICODE_RING_SIZE } from 'methods/encryption';

import { encryptCesar } from '../../../methods/encryption/caesar';

export function encryptMonoAlphabeticCode(text: string, key: string): EncryptedData {
	let keyInt: number = 0;

	for (let iter = 0; iter < key.length; iter++) {
		keyInt += key.charCodeAt(iter) % UNICODE_RING_SIZE;
	}
	let encryptedData: EncryptedData = encryptCesar(text, keyInt);

	return encryptedData;
}

export function decryptMonoAlphabeticCode(text: string, key: string): EncryptedData {
	let keyReverse: string = '';

	for (let iter = 0; iter < key.length; iter++) {
		keyReverse += String.fromCharCode(UNICODE_RING_SIZE - key.charCodeAt(iter));
	}
	const plainData: EncryptedData = encryptMonoAlphabeticCode(text, keyReverse);

	return plainData;
}
