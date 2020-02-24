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

	if (text.length % 2 !== 0) {
		text += ' ';
	}

	// for (let iter = 0; iter < text.length; iter++) {
	// 	symbolCode =
	// 		(text.charCodeAt(iter) + key.charCodeAt(iter % key.length)) % UNICODE_RING_SIZE;
	// 	cipherData.code.push(symbolCode);
	// 	cipherData.text += String.fromCharCode(symbolCode);
	// }

	return cipherData;
}
