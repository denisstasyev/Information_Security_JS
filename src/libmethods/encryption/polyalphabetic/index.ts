import { EncryptedData } from 'store';
import { UNICODE_RING_SIZE, getUnicodeCode } from 'libmethods/encryption';

/**
 * Symbolic cyclic shift of plain text by each key symbol char code
 *
 * @param  {string} text
 * @param  {string} key
 * @returns EncryptedData
 */
export function encryptPolyAlphabeticCode(text: string, key: string): EncryptedData {
  let encryptedData: EncryptedData = { code: [], text: '' };
  let symbolCode: number;

  const keyCodes = Array.from(key);
  Array.from(text).forEach((char, index) => {
    symbolCode =
      (getUnicodeCode(char) + getUnicodeCode(keyCodes[index % keyCodes.length])) %
      UNICODE_RING_SIZE;
    encryptedData.code.push(symbolCode);
  });

  encryptedData.text = String.fromCodePoint(...encryptedData.code);

  return encryptedData;
}

/**
 * Decryption
 *
 * @param  {string} text
 * @param  {string} key
 * @returns EncryptedData
 */
export function decryptPolyAlphabeticCode(text: string, key: string): EncryptedData {
  let keyReverseCodes: number[] = [];

  for (let char of key) {
    keyReverseCodes.push(UNICODE_RING_SIZE - getUnicodeCode(char));
  }
  const keyReverse: string = String.fromCodePoint(...keyReverseCodes);

  const plainData: EncryptedData = encryptPolyAlphabeticCode(text, keyReverse);

  return plainData;
}
