import { SET_SEND_METHOD, SET_SEND_TEXT, RESET_SEND } from './types';
import { methods } from 'config';
import { tsesar } from 'utils/encryption';

export function setMethod(method: string) {
	return {
		type: SET_SEND_METHOD,
		method,
	};
}

export function setText(text: string) {
	return {
		type: SET_SEND_TEXT,
		text,
	};
}

export function send(method: string, text: string) {
	let encryptedText: string = '';
	if (method === methods[0]) {
		encryptedText = tsesar(text);
	}
	// Чекать все методы
	console.log(`А вот тут будет отправка на бекенд наших данных: ${encryptedText}`);
	return {
		type: RESET_SEND,
	};
}
