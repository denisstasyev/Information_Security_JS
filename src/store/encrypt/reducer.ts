import * as types from './types';
import { methodsEncrypt } from 'config';

const initialState: types.CipherState = {
	method: methodsEncrypt['caesar'],
	error: { name: '', message: '' },
	cipherKey: '',
	text: '',
	cipherCode: [],
	cipherText: '',
};

export default function(state = initialState, action: types.CipherActionTypes): types.CipherState {
	switch (action.type) {
		case types.SET_CIPHER_METHOD:
			state.method = action.method;
			state.cipherKey = '';
			state.cipherText = '';
			state.cipherCode = [];
			return Object.assign({}, state);
		case types.SET_CIPHER_KEY:
			state.cipherKey = action.cipherKey;
			return Object.assign({}, state);
		case types.SET_CIPHER_TEXT:
			state.text = action.text;
			return Object.assign({}, state);
		case types.SET_CIPHER_CIPHERDATA:
			state.cipherCode = action.cipherCode;
			state.cipherText = action.cipherText;
			state.error = { name: '', message: '' };
			return Object.assign({}, state);
		case types.OCCUR_CIPHER_ERROR:
			state.error = action.error;
			state.cipherKey = '';
			return Object.assign({}, state);
		case types.RESET_CIPHER:
			state.method = methodsEncrypt['caesar'];
			state.text = '';
			state.cipherKey = '';
			return Object.assign({}, state);
		default:
			return state;
	}
}
