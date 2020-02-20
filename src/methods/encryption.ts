export interface CipherData {
	cipherCode: number[];
	cipherText: string;
}

function outputData(
	method: string,
	text: string,
	key: string,
	cipherCode: number[],
	cipherText: string,
): void {
	if (process.env.NODE_ENV !== 'production') {
		console.log(
			`Вычисление шифра - ${method}\n`,
			`Текст: ${text}\n`,
			`Ключ: ${key}\n`,
			`Коды шифротекста: ${cipherCode}\n`,
			`Шифротекст: ${cipherText}`,
		);
	}
}

export function encryptTsesar(text: string, key: number): CipherData {
	let cipherData: CipherData = { cipherCode: [], cipherText: '' };
	let symbolCode: number;

	for (let iter = 0; iter < text.length; iter++) {
		symbolCode = (text[iter].charCodeAt(0) + key) % 65536;
		cipherData.cipherCode.push(symbolCode);
		cipherData.cipherText += String.fromCharCode(symbolCode);
	}

	outputData('Цезарь', text, key.toString(), cipherData.cipherCode, cipherData.cipherText);
	return cipherData;
}

export function encryptMonoAlphabeticCode(text: string, key: string): CipherData {
	let cipherData: CipherData = { cipherCode: [], cipherText: '' };
	const keyInt: number = key.charCodeAt(0);
	let symbolCode: number;

	for (let iter = 0; iter < text.length; iter++) {
		symbolCode = (text[iter].charCodeAt(0) + keyInt) % 65536;
		cipherData.cipherCode.push(symbolCode);
		cipherData.cipherText += String.fromCharCode(symbolCode);
	}

	outputData('Моноалфавитный шифр', text, key, cipherData.cipherCode, cipherData.cipherText);
	return cipherData;
}

export function encryptPolyAlphabeticCode(text: string, key: string): CipherData {
	let cipherData: CipherData = { cipherCode: [], cipherText: '' };
	let symbolCode: number;

	for (let iter = 0; iter < text.length; iter++) {
		symbolCode = (text[iter].charCodeAt(0) + key.charCodeAt(iter % key.length)) % 65536;
		cipherData.cipherCode.push(symbolCode);
		cipherData.cipherText += String.fromCharCode(symbolCode);
	}

	outputData(
		'Полиалфавитный шифр',
		text,
		key.toString(),
		cipherData.cipherCode,
		cipherData.cipherText,
	);
	return cipherData;
}
