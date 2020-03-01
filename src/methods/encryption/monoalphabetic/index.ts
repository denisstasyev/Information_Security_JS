import { EncryptedData } from 'store';
import { UNICODE_RING_SIZE, getUnicodeCode } from 'methods/encryption';

import { encryptCesar } from '../../../methods/encryption/caesar';

/**
 * Calculate integer number from string by char codes and then
 * use Caesar method (character by character shift by constant value)
 *
 * @param  {string} text
 * @param  {number} key
 * @returns EncryptedData
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
 * Decryption
 *
 * @param  {string} text
 * @param  {string} key
 * @returns EncryptedData
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
