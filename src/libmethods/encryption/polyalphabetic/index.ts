import { EncryptedData } from 'store';
import { UNICODE_RING_SIZE } from 'libmethods/encryption';
import { getUnicodeCode } from 'libmethods';

/**
 * A polyalphabetic encryption:
 *  symbolic cyclic shift of plain text by each key symbol char code
 *
 * Algorithm of encryption:
 *  for every character_str in input string & on the same position character_key in key string:
 *   code = UnicodeCode(character_str)
 *   cipher_code = code + UnicodeCode(character_key)
 *
 * @param text Input string for encryption
 * @param key  Key for encryption
 * @returns    Cipher data
 */
export function encryptPolyAlphabeticCode(text: string, key: string): EncryptedData {
  let encryptedData: EncryptedData = { code: [], text: '' };
  let symbolCode: number;

  const keyArray = Array.from(key);
  Array.from(text).forEach((char, index) => {
    symbolCode =
      (getUnicodeCode(char) + getUnicodeCode(keyArray[index % keyArray.length])) %
      UNICODE_RING_SIZE;
    encryptedData.code.push(symbolCode);
  });

  encryptedData.text = String.fromCodePoint(...encryptedData.code);

  return encryptedData;
}

/**
 * A polyalphabetic decryption
 *
 * @param text Input string for decryption
 * @param key  Key for decryption
 * @returns    Clear data
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
