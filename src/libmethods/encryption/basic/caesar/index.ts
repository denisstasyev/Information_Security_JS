import { EncryptedData } from 'store';
import { UNICODE_RING_SIZE } from 'libmethods/encryption/basic';
import { getUnicodeCode } from 'libmethods';

/**
 * A Caesar encryption:
 *  character by character shift by constant value
 *
 * Algorithm of encryption:
 *  for every character in input string:
 *   code = UnicodeCode(character)
 *   cipher_code = code + key
 *
 * @param text Input string for encryption
 * @param key  Key for encryption
 * @returns    Cipher data
 */
export function encryptCesar(text: string, key: number): EncryptedData {
  let encryptedData: EncryptedData = { code: [], text: '' };
  let symbolCode: number;

  for (let char of text) {
    symbolCode = (getUnicodeCode(char) + key) % UNICODE_RING_SIZE;
    encryptedData.code.push(symbolCode);
  }

  encryptedData.text = String.fromCodePoint(...encryptedData.code);

  return encryptedData;
}

/**
 * A Caesar decryption
 *
 * @param text Input string for decryption
 * @param key  Key for decryption
 * @returns    Clear data
 */
export function decryptCesar(text: string, key: number): EncryptedData {
  const plainData: EncryptedData = encryptCesar(text, UNICODE_RING_SIZE - key);
  return plainData;
}
