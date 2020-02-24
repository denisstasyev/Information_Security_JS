import { Method } from 'store';

export const encryptionTypes = {
	caesar: 'caesar',
	monoalphabetic: 'monoalphabetic',
	polyalphabetic: 'polyalphabetic',
	bigram: 'bigram',
};

export const encryptionMethods: Method[] = [
	{ type: encryptionTypes.caesar, name: 'Цезарь' },
	{ type: encryptionTypes.monoalphabetic, name: 'Моноалфавитный шифр' },
	{ type: encryptionTypes.polyalphabetic, name: 'Полиалфавитный шифр' },
	{ type: encryptionTypes.bigram, name: 'Биграммный шифр' },
];
