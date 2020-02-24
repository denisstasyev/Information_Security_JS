export const UNICODE_RING_SIZE = 1114112; // Total number of Unicode symbols
export const UNICODE_RING_SIZE_SQUARE = 1114112 ** 2;
export const UNICODE_RING_SIZE_SQUARE_LENGTH = UNICODE_RING_SIZE_SQUARE.toString().length;

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
			`Коды ${encryptionBool ? 'шифротекста' : 'открытого текста'}: ${cipherCode}\n`,
			`${encryptionBool ? 'Шифротекст' : 'Открытый текст'}: ${cipherText}`,
		);
	}
}
