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

/**
 * Since Javascript has two-character representation for Emoji
 * then a method for obtaining real unicode codes is needed
 *
 * Reason: Javascript function String.prototype.charCodeAt() works fine only with UCS-2 format
 * which is is a strict subset of UTF-16 - it can encode characters in the Basic Multilingual
 * Plane (i.e., from U+0000 til U+FFFF) only. If you need to express characters in the
 * supplementary planes (which includes some relatively rare Chinese characters), they must be
 * encoded using pairs of two 16 bit code units ("surrogates"), and if so your data will not
 * be valid UCS-2 but must be declared as UTF-16
 *
 * @param   emoji   symbol for getting the code
 * @returns return the correct unicode code under UNICODE_RING_SIZE
 */
export function getUnicodeCode(emoji: string): number {
  let comp;

  if (emoji.length === 1) {
    comp = emoji.charCodeAt(0);
  } else {
    comp = (emoji.charCodeAt(0) - 0xd800) * 0x400 + (emoji.charCodeAt(1) - 0xdc00) + 0x10000;
    if (comp < 0) {
      comp = emoji.charCodeAt(0);
    }
  }
  return isNaN(comp) ? 0 : comp; // Extra check
}
