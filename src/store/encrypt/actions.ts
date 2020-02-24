import * as types from './types';
import { methodsEncrypt } from 'config';
import * as encrypt from 'methods/encryption';

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
	let cipher: encrypt.CipherData = { cipherCode: [], cipherText: '' };

	if (method === methodsEncrypt['caesar']) {
		const cipherKeyInt = Number.parseInt(cipherKey);
		if (!isNaN(cipherKeyInt)) {
			cipher = encrypt.encryptCesar(text, cipherKeyInt);
		} else {
			return {
				type: types.OCCUR_CIPHER_ERROR,
				error: {
					name: 'ERROR_KEY_VALUE_NOT_INTEGER',
					message: 'Incorrect key value: please enter the integer value',
				},
			};
		}
	} else if (method === methodsEncrypt['monoalphabetic']) {
		if (cipherKey.length === 1) {
			cipher = encrypt.encryptMonoAlphabeticCode(text, cipherKey);
		} else {
			return {
				type: types.OCCUR_CIPHER_ERROR,
				error: {
					name: 'ERROR_KEY_VALUE_NOT_SINGLE_CHAR',
					message: 'Incorrect key value: please enter the  value',
				},
			};
		}
	} else if (method === methodsEncrypt['polyalphabetic']) {
		cipher = encrypt.encryptPolyAlphabeticCode(text, cipherKey);
	}

	// console.log(`А вот тут будет отправка на бекенд наших данных: ${cipher.cipherText}`);
	return {
		type: types.SET_CIPHER_CIPHERDATA,
		cipherCode: cipher.cipherCode,
		cipherText: cipher.cipherText,
	};
}
