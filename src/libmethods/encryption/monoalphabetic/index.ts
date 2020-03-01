import { EncryptedData } from 'store';
import { UNICODE_RING_SIZE } from 'libmethods/encryption';
import { getUnicodeCode } from 'libmethods';
import { encryptCesar } from 'libmethods/encryption/caesar';

/**
 * A monoalphabetic encryption:
 *  calculate integer number from string by char codes and then
 *  use Caesar method (character by character shift by constant value)
 *
 * Algorithm of encryption:
 *  for every character in input string:
 *   code = UnicodeCode(character)
 *   cipher_code = code + UnicodeCode(key)
 *
 * @param text Input string for encryption
 * @param key  Key for encryption
 * @returns    Cipher data
 */
export function encryptMonoAlphabeticCode(text: string, key: string): EncryptedData {
  let keyInt: number = 0;

  for (let char of key) {
    keyInt += getUnicodeCode(char) % UNICODE_RING_SIZE;
  }
  let encryptedData: EncryptedData = encryptCesar(text, keyInt);

  return encryptedData;
}

/**
 * A monoalphabetic decryption
 *
 * @param text Input string for decryption
 * @param key  Key for decryption
 * @returns    Clear data
 */
export function decryptMonoAlphabeticCode(text: string, key: string): EncryptedData {
  let keyReverseCodes: number[] = [];

  for (let char of key) {
    keyReverseCodes.push(UNICODE_RING_SIZE - getUnicodeCode(char));
  }
  const keyReverse: string = String.fromCodePoint(...keyReverseCodes);

  const plainData: EncryptedData = encryptMonoAlphabeticCode(text, keyReverse);

  return plainData;
}
