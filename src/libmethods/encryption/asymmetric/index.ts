import { Method } from 'store';

import { asymmetricEncryptionTypes } from 'libmethods';

import { encryptRSA, decryptRSA } from 'libmethods/encryption/asymmetric/rsa';

export interface AsymmetricEncryptionResult {
  encryptedText: string;
}

export function getEncryptedText(
  method: Method,
  key: string,
  plainText: string,
): AsymmetricEncryptionResult {
  let encryptionResult: AsymmetricEncryptionResult = { encryptedText: '' };

  switch (method.type) {
    case asymmetricEncryptionTypes.rsa512:
      encryptionResult.encryptedText = encryptRSA(key, plainText, 512);
      break;
    case asymmetricEncryptionTypes.rsa1024:
      encryptionResult.encryptedText = encryptRSA(key, plainText, 1024);
      break;
    // case asymmetricEncryptionTypes.rsa2048:
    //   encryptionResult.encryptedText = encryptRSA(key, plainText, 2048);
    //   break;
    // case asymmetricEncryptionTypes.rsa4096:
    //   encryptionResult.encryptedText = encryptRSA(key, plainText, 4096);
    //   break;
    // case asymmetricEncryptionTypes.rsa8192:
    //   encryptionResult.encryptedText = encryptRSA(key, plainText, 8192);
    //   break;
  }

  return encryptionResult;
}

export interface AsymmetricDecryptionResult {
  decryptedText: string;
  error: string;
}

export function getDecryptedText(
  method: Method,
  key: string,
  encryptedText: string,
): AsymmetricDecryptionResult {
  const decryptionResult: AsymmetricDecryptionResult = { decryptedText: '', error: '' };

  try {
    switch (method.type) {
      case asymmetricEncryptionTypes.rsa512:
        decryptionResult.decryptedText = decryptRSA(key, encryptedText, 512);
        break;
      case asymmetricEncryptionTypes.rsa1024:
        decryptionResult.decryptedText = decryptRSA(key, encryptedText, 1024);
        break;
      // case asymmetricEncryptionTypes.rsa2048:
      //   decryptionResult.decryptedText = decryptRSA(key, encryptedText, 2048);
      //   break;
      // case asymmetricEncryptionTypes.rsa4096:
      //   decryptionResult.decryptedText = decryptRSA(key, encryptedText, 4096);
      //   break;
      // case asymmetricEncryptionTypes.rsa8192:
      //   decryptionResult.decryptedText = decryptRSA(key, encryptedText, 8192);
      //   break;
    }
  } catch {
    decryptionResult.error = 'Невалидный закрытый текст!';
  }

  return decryptionResult;
}
