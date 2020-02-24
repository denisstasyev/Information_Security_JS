export interface CipherData {
	cipherCode: number[];
	cipherText: string;
}

export interface ClearData {
	clearCode: number[];
	clearText: string;
}

function outputData(
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
	let cipherData: CipherData = { cipherCode: [], cipherText: '' };
	let symbolCode: number;

	for (let iter = 0; iter < text.length; iter++) {
		symbolCode = (text.charCodeAt(iter) + key) % UNICODE_RING_SIZE;
		cipherData.cipherCode.push(symbolCode);
		cipherData.cipherText += String.fromCharCode(symbolCode);
	}

	outputData('Цезарь', text, key.toString(), cipherData.cipherCode, cipherData.cipherText, true);
	return cipherData;
}

export function decryptCesar(text: string, key: number): ClearData {
	let clearData: ClearData = { clearCode: [], clearText: '' };

	let data: CipherData = encryptCesar(text, -key);
	clearData.clearCode = data.cipherCode;
	clearData.clearText = data.cipherText;

	outputData('Цезарь', text, key.toString(), clearData.clearCode, clearData.clearText, false);
	return clearData;
}

export function encryptMonoAlphabeticCode(text: string, key: string): CipherData {
	let cipherData: CipherData = { cipherCode: [], cipherText: '' };
	let keyInt: number = 0;
	let symbolCode: number;

	for (let iter = 0; iter < key.length; iter++) {
		keyInt += key.charCodeAt(iter);
	}

	for (let iter = 0; iter < text.length; iter++) {
		symbolCode = (text.charCodeAt(iter) + keyInt) % UNICODE_RING_SIZE;
		cipherData.cipherCode.push(symbolCode);
		cipherData.cipherText += String.fromCharCode(symbolCode);
	}

	outputData(
		'Моноалфавитный шифр',
		text,
		key,
		cipherData.cipherCode,
		cipherData.cipherText,
		true,
	);
	return cipherData;
}

export function encryptPolyAlphabeticCode(text: string, key: string): CipherData {
	let cipherData: CipherData = { cipherCode: [], cipherText: '' };
	let symbolCode: number;

	for (let iter = 0; iter < text.length; iter++) {
		symbolCode =
			(text.charCodeAt(iter) + key.charCodeAt(iter % key.length)) % UNICODE_RING_SIZE;
		cipherData.cipherCode.push(symbolCode);
		cipherData.cipherText += String.fromCharCode(symbolCode);
	}

	outputData(
		'Полиалфавитный шифр',
		text,
		key.toString(),
		cipherData.cipherCode,
		cipherData.cipherText,
		true,
	);
	return cipherData;
}
