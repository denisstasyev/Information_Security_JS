import { BlockMethod } from 'libmethods';

import { blockEncryptionTypes } from 'libmethods';

import { getNormalizedKey, generateIv, DEFAULT_IV } from 'libmethods/encryption/block/utils';

import { encryptAES256_ECB, decryptAES256_ECB } from 'libmethods/encryption/block/aes/ecb';
import { encryptAES256_CBC, decryptAES256_CBC } from 'libmethods/encryption/block/aes/cbc';
import { encryptAES256_CTR, decryptAES256_CTR } from 'libmethods/encryption/block/aes/ctr';
import { encryptAES256_CFB, decryptAES256_CFB } from 'libmethods/encryption/block/aes/cfb';
import { encryptAES256_OFB, decryptAES256_OFB } from 'libmethods/encryption/block/aes/ofb';

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
        encryptionResult.iv || DEFAULT_IV,
      );
      break;
    case blockEncryptionTypes.aes256ctr:
      encryptionResult.encryptedText = encryptAES256_CTR(getNormalizedKey(key), plainText);
      break;
    case blockEncryptionTypes.aes256cfb:
      encryptionResult.encryptedText = encryptAES256_CFB(
        getNormalizedKey(key),
        plainText,
        encryptionResult.iv || DEFAULT_IV,
      );
      break;
    case blockEncryptionTypes.aes256ofb:
      encryptionResult.encryptedText = encryptAES256_OFB(
        getNormalizedKey(key),
        plainText,
        encryptionResult.iv || DEFAULT_IV,
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

  try {
    switch (method.type) {
      case blockEncryptionTypes.aes256ecb:
        decryptionResult.decryptedText = decryptAES256_ECB(getNormalizedKey(key), encryptedText);
        break;
      case blockEncryptionTypes.aes256cbc:
        decryptionResult.decryptedText = decryptAES256_CBC(
          getNormalizedKey(key),
          encryptedText,
          iv || DEFAULT_IV,
        );
        break;
      case blockEncryptionTypes.aes256ctr:
        decryptionResult.decryptedText = decryptAES256_CTR(getNormalizedKey(key), encryptedText);
        break;
      case blockEncryptionTypes.aes256cfb:
        decryptionResult.decryptedText = decryptAES256_CFB(
          getNormalizedKey(key),
          encryptedText,
          iv || DEFAULT_IV,
        );
        break;
      case blockEncryptionTypes.aes256ofb:
        decryptionResult.decryptedText = decryptAES256_OFB(
          getNormalizedKey(key),
          encryptedText,
          iv || DEFAULT_IV,
        );
        break;
    }
  } catch {
    decryptionResult.error = 'Невалидный закрытый текст!';
  }

  return decryptionResult;
}
