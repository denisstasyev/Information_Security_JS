export interface CipherData {
	cipherCode: number[];
	cipherText: string;
}

function outputData(text: string, key: string, cipherCode: number[], cipherText: string): void {
	if (process.env.NODE_ENV !== 'production') {
		console.log(
			'Вычисление шифра Цезаря\n',
			`Текст: ${text}\n`,
			`Ключ: ${key}\n`,
			`Коды шифротекста: ${cipherCode}\n`,
			`Шифротекст: ${cipherText}`,
		);
	}
}

export function encryptTsesar(text: string, key: number): CipherData {
	let cipherCode: number[] = [];
	let cipherText: string = '';
	let symbolCode: number;

	for (let iter = 0; iter < text.length; iter++) {
		symbolCode = text[iter].charCodeAt(0) + key;
		cipherCode.push(symbolCode);
		cipherText += String.fromCharCode(symbolCode);
	}

	outputData(text, key.toString(), cipherCode, cipherText);
	return { cipherCode, cipherText };
}
