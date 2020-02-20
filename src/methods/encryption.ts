export interface CipherData {
	cipherCode: number[];
	cipherText: string;
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

	console.log(
		'Вычисление шифра Цезаря',
		'\nТекст: ',
		text,
		'\nКлюч: ',
		key,
		'\nКоды шифротекста: ',
		cipherCode,
		'\nШифротекст: ',
		cipherText,
	);
	return { cipherCode, cipherText };
}
