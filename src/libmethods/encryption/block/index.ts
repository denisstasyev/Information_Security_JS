import { BlockMethod } from 'libmethods';

import { blockEncryptionTypes } from 'libmethods';

import { getNormalizedKey, generateIv } from 'libmethods/encryption/block/utils';

import { encryptAES256_ECB, decryptAES256_ECB } from 'libmethods/encryption/block/aes/ecb';
import { encryptAES256_CBC, decryptAES256_CBC } from 'libmethods/encryption/block/aes/cbc';

export interface BlockEncryptionResult {
  encryptedText: string;
  iv?: number[];
}

export function getEncryptedText(
  method: BlockMethod,
  key: string,
  plainText: string,
  iv?: number[],
): BlockEncryptionResult {
  let encryptionResult: BlockEncryptionResult = { encryptedText: '' };

  if (method.withIv) {
    encryptionResult.iv = iv ? iv : generateIv();
  }

  switch (method.type) {
    case blockEncryptionTypes.aes256ecb:
      encryptionResult.encryptedText = encryptAES256_ECB(getNormalizedKey(key), plainText);
      break;
    case blockEncryptionTypes.aes256cbc:
      encryptionResult.encryptedText = encryptAES256_CBC(
        getNormalizedKey(key),
        plainText,
        encryptionResult.iv || [],
      );
      break;
  }

  return encryptionResult;
}

export interface DecryptionResult {
  decryptedText: string;
  error: string;
}

export function getDecryptedText(
  method: BlockMethod,
  key: string,
  encryptedText: string,
  iv?: number[],
): DecryptionResult {
  const decryptionResult: DecryptionResult = { decryptedText: '', error: '' };
  const zeroIv = Array(16).fill(0);

  try {
    switch (method.type) {
      case blockEncryptionTypes.aes256ecb:
        decryptionResult.decryptedText = decryptAES256_ECB(getNormalizedKey(key), encryptedText);
        break;
      case blockEncryptionTypes.aes256cbc:
        decryptionResult.decryptedText = decryptAES256_CBC(
          getNormalizedKey(key),
          encryptedText,
          iv || zeroIv,
        );
        break;
    }
  } catch {
    decryptionResult.error = 'Невалидный закрытый текст!';
  }

  return decryptionResult;
}
