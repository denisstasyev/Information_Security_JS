import { Method } from 'store';

import { blockEncryptionTypes } from 'libmethods';

import { getNormalizedKey, getNormalizedIv } from 'libmethods/encryption/block/utils';

import { encryptAES256_ECB, decryptAES256_ECB } from 'libmethods/encryption/block/aes/ecb';
import { encryptAES256_CBC, decryptAES256_CBC } from 'libmethods/encryption/block/aes/cbc';
import { encryptAES256_CTR, decryptAES256_CTR } from 'libmethods/encryption/block/aes/ctr';
import { encryptAES256_CFB, decryptAES256_CFB } from 'libmethods/encryption/block/aes/cfb';
import { encryptAES256_OFB, decryptAES256_OFB } from 'libmethods/encryption/block/aes/ofb';

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
    case blockEncryptionTypes.aes256cbc:
      encryptedText = encryptAES256_CBC(getNormalizedKey(key), plainText, getNormalizedIv(iv));
      break;
    case blockEncryptionTypes.aes256ctr:
      encryptedText = encryptAES256_CTR(getNormalizedKey(key), plainText);
      break;
    case blockEncryptionTypes.aes256cfb:
      encryptedText = encryptAES256_CFB(getNormalizedKey(key), plainText, getNormalizedIv(iv));
      break;
    case blockEncryptionTypes.aes256ofb:
      encryptedText = encryptAES256_OFB(getNormalizedKey(key), plainText, getNormalizedIv(iv));
      break;
  }

  return encryptedText;
}

export interface DecryptionResult {
  error: string;
  text: string;
}

export function getDecryptedText(
  method: Method,
  key: string,
  encryptedText: string,
  iv: number[], // iv - initialization vector
): DecryptionResult {
  const decryptionResult: DecryptionResult = { error: '', text: '' };
  try {
    switch (method.type) {
      case blockEncryptionTypes.aes256ecb:
        decryptionResult.text = decryptAES256_ECB(getNormalizedKey(key), encryptedText);
        break;
      case blockEncryptionTypes.aes256cbc:
        decryptionResult.text = decryptAES256_CBC(getNormalizedKey(key), encryptedText, iv);
        break;
      case blockEncryptionTypes.aes256ctr:
        decryptionResult.text = decryptAES256_CTR(getNormalizedKey(key), encryptedText);
        break;
      case blockEncryptionTypes.aes256cfb:
        decryptionResult.text = decryptAES256_CFB(getNormalizedKey(key), encryptedText, iv);
        break;
      case blockEncryptionTypes.aes256ofb:
        decryptionResult.text = decryptAES256_OFB(getNormalizedKey(key), encryptedText, iv);
        break;
    }
  } catch {
    decryptionResult.error = 'Невалидный закрытый текст!';
  }

  return decryptionResult;
}
