export interface CipherData {
	code: number[];
	text: string;
}

export function outputData(
	method: string,
	text: string,
	key: string,
	cipherCode: number[],
	cipherText: string,
	encryptionBool: boolean,
): void {
	const encriptionStr: string = encryptionBool ? 'Шифрование' : 'Расшифрование';

	if (process.env.NODE_ENV !== 'production') {
		console.log(
			`${encriptionStr} по методу - ${method}\n`,
			`Текст: ${text}\n`,
			`Ключ: ${key}\n`,
			`Коды шифротекста: ${cipherCode}\n`,
			`Шифротекст: ${cipherText}`,
		);
	}
}

const UNICODE_RING_SIZE = 1114112;
const UNICODE_RING_SIZE_SQUARE = 1114112 ** 2;
const UNICODE_RING_SIZE_SQUARE_LENGTH = UNICODE_RING_SIZE_SQUARE.toString().length;

export function encryptCesar(text: string, key: number): CipherData {
	let cipherData: CipherData = { code: [], text: '' };
	let symbolCode: number;

	for (let iter = 0; iter < text.length; iter++) {
		symbolCode = (text.charCodeAt(iter) + key) % UNICODE_RING_SIZE;
		cipherData.code.push(symbolCode);
		cipherData.text += String.fromCharCode(symbolCode);
	}

	return cipherData;
}

export function decryptCesar(text: string, key: number): CipherData {
	let clearData: CipherData = encryptCesar(text, UNICODE_RING_SIZE - key);
	return clearData;
}

export function encryptMonoAlphabeticCode(text: string, key: string): CipherData {
	let keyInt: number = 0;

	for (let iter = 0; iter < key.length; iter++) {
		keyInt += key.charCodeAt(iter) % UNICODE_RING_SIZE;
	}
	let cipherData: CipherData = encryptCesar(text, keyInt);

	return cipherData;
}

export function decryptMonoAlphabeticCode(text: string, key: string): CipherData {
	let keyReverse: string = '';

	for (let iter = 0; iter < key.length; iter++) {
		keyReverse += String.fromCharCode(UNICODE_RING_SIZE - key.charCodeAt(iter));
	}
	let clearData: CipherData = encryptMonoAlphabeticCode(text, keyReverse);

	return clearData;
}

export function encryptPolyAlphabeticCode(text: string, key: string): CipherData {
	let cipherData: CipherData = { code: [], text: '' };
	let symbolCode: number;

	for (let iter = 0; iter < text.length; iter++) {
		symbolCode =
			(text.charCodeAt(iter) + key.charCodeAt(iter % key.length)) % UNICODE_RING_SIZE;
		cipherData.code.push(symbolCode);
		cipherData.text += String.fromCharCode(symbolCode);
	}

	return cipherData;
}

export function decryptPolyAlphabeticCode(text: string, key: string): CipherData {
	let keyReverse: string = '';

	for (let iter = 0; iter < key.length; iter++) {
		keyReverse += String.fromCharCode(UNICODE_RING_SIZE - key.charCodeAt(iter));
	}
	let clearData: CipherData = encryptPolyAlphabeticCode(text, keyReverse);

	return clearData;
}

export function encryptBigram(text: string, key: string): CipherData {
	let cipherData: CipherData = { code: [], text: '' };
	let keyInt: number = 0;
	let symbolCode: number;

	for (let iter = 0; iter < key.length; iter++) {
		keyInt += key.charCodeAt(iter) % UNICODE_RING_SIZE;
	}

	if (text.length % 2 !== 0) {
		text += ' ';
	}

	for (let iter = 0; iter < text.length; iter += 2) {
		symbolCode =
			(text.charCodeAt(iter) * UNICODE_RING_SIZE + text.charCodeAt(iter + 1) + keyInt) %
			UNICODE_RING_SIZE_SQUARE;
		cipherData.code.push(symbolCode);
		cipherData.text += symbolCode.toString().padStart(UNICODE_RING_SIZE_SQUARE_LENGTH, '0');
	}

	return cipherData;
}

export function decryptBigram(text: string, key: string): CipherData {
	let clearData: CipherData = { code: [], text: '' };
	let keyInt: number = 0;
	let symbolCode: number;
	let symbolCodeFirst: number;
	let symbolCodeSecond: number;

	for (let iter = 0; iter < key.length; iter++) {
		keyInt += key.charCodeAt(iter) % UNICODE_RING_SIZE;
	}

	for (let iter = 0; iter < text.length; iter += UNICODE_RING_SIZE_SQUARE_LENGTH) {
		symbolCode =
			(Number(text.substr(iter, UNICODE_RING_SIZE_SQUARE_LENGTH)) - keyInt) %
			UNICODE_RING_SIZE_SQUARE;
		symbolCodeSecond = symbolCode % UNICODE_RING_SIZE;
		symbolCodeFirst = (symbolCode - symbolCodeSecond) / UNICODE_RING_SIZE;
		clearData.code.push(symbolCodeFirst, symbolCodeSecond);
		clearData.text += String.fromCharCode(symbolCodeFirst, symbolCodeSecond);
	}

	return clearData;
}
