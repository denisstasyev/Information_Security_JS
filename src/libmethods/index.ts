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

export const checksumTypes = {
  crc16: 'crc16',
  crc24: 'crc24',
  crc32: 'crc32',
  fletcher: 'fletcher',
};

export const checksumMethods: Method[] = [
  { type: checksumTypes.crc16, name: 'CRC16' },
  { type: checksumTypes.crc24, name: 'CRC24' },
  { type: checksumTypes.crc32, name: 'CRC32' },
  { type: checksumTypes.fletcher, name: 'Флетчер' },
];
