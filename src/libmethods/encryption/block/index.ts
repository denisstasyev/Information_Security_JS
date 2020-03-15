import { Method } from 'store';

import { blockEncryptionTypes } from 'libmethods';

import { getSHA256 } from 'libmethods/hashing/sha256';
import { toHexFormat } from 'libmethods/hashing';

import { encryptAES256_ECB, decryptAES256_ECB } from 'libmethods/encryption/block/aes';

/**  Convert string key into Array of 4 elements with 128 bit size.
 * Then it is converted into hex string and parsed into hex Array of 16 elements with 2 characters.
 * Finally parse it into Array of 16 Numbers.
 */
function getNormalizedKey(key: string): number[] {
  const key_128bit_4elements: number[] = getSHA256(key).slice(0, 4);
  // @ts-ignore
  const keyNormalizedHexes: string[] = toHexFormat(key_128bit_4elements).match(/.{1,2}/g) || [];
  const keyNormalized: number[] = keyNormalizedHexes.map(keyHex => parseInt(keyHex, 16));
  return keyNormalized;
}

export function getEncryptedText(
  method: Method,
  key: string,
  plainText: string,
  iv: string, // iv - initialization vector
): string {
  let encryptedText: string = '';

  switch (method.type) {
    case blockEncryptionTypes.aes256ecb:
      encryptedText = encryptAES256_ECB(getNormalizedKey(key), plainText);
      break;
  }

  return encryptedText;
}

export interface DecryptionResult {
  error: string;
  decryptedText: string;
}

export function getDecryptedText(
  method: Method,
  key: string,
  encryptedText: string,
  iv: string, // iv - initialization vector
): DecryptionResult {
  let decryptionResult: DecryptionResult = { error: '', decryptedText: '' };

  switch (method.type) {
    case blockEncryptionTypes.aes256ecb:
      decryptionResult = decryptAES256_ECB(getNormalizedKey(key), encryptedText);
      break;
  }

  return decryptionResult;
}
