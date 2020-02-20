import * as types from './types';
import { methods } from 'config';
import { encryptTsesar, CipherData } from 'methods/encryption';

export function setMethod(method: string) {
	return {
		type: types.SET_CIPHER_METHOD,
		method,
	};
}

export function setKey(cipherKey: string) {
	return {
		type: types.SET_CIPHER_KEY,
		cipherKey,
	};
}

export function setText(text: string) {
	return {
		type: types.SET_CIPHER_TEXT,
		text,
	};
}

export function encryptData(method: string, text: string, cipherKey: string) {
	let cipher: CipherData = { cipherCode: [], cipherText: '' };

	// Чекать все методы
	if (method === methods[0]) {
		const cipherKeyInt = Number.parseInt(cipherKey);
		if (!isNaN(cipherKeyInt)) {
			cipher = encryptTsesar(text, cipherKeyInt);
		} else {
			return {
				type: types.OCCUR_CIPHER_ERROR,
				error: {
					name: 'ERROR_KEY_VALUE',
					message: 'Incorrect key value: please enter the integer value',
				},
			};
		}
	}

	// console.log(`А вот тут будет отправка на бекенд наших данных: ${cipher.cipherText}`);
	return {
		type: types.SET_CIPHER_CIPHERDATA,
		cipherCode: cipher.cipherCode,
		cipherText: cipher.cipherText,
	};
}
