export interface CipherState {
	method: string;
	error: Error;
	cipherKey: string;
	text: string;
	cipherCode: number[];
	cipherText: string;
}

export const SET_CIPHER_METHOD = 'SET_CIPHER_METHOD';
export const SET_CIPHER_KEY = 'SET_CIPHER_KEY';
export const SET_CIPHER_TEXT = 'SET_CIPHER_TEXT';
export const SET_CIPHER_CIPHERDATA = 'SET_CIPHER_CIPHERDATA';
export const RESET_CIPHER = 'RESET_CIPHER';
export const OCCUR_CIPHER_ERROR = 'OCCUR_CIPHER_ERROR';

interface SetMethodAction {
	type: typeof SET_CIPHER_METHOD;
	method: string;
}

interface OccurErrorAction {
	type: typeof OCCUR_CIPHER_ERROR;
	error: Error;
}

interface SetKeyAction {
	type: typeof SET_CIPHER_KEY;
	cipherKey: string;
}

interface SetTextAction {
	type: typeof SET_CIPHER_TEXT;
	text: string;
}

interface SetCipherDataAction {
	type: typeof SET_CIPHER_CIPHERDATA;
	cipherCode: number[];
	cipherText: string;
}

interface ResetAction {
	type: typeof RESET_CIPHER;
}

export type CipherActionTypes =
	| SetMethodAction
	| SetKeyAction
	| SetTextAction
	| SetCipherDataAction
	| ResetAction
	| OccurErrorAction;
