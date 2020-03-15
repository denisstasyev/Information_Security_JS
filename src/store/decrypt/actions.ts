import { Method, EncryptedData } from 'store';
import * as types from './types';

import { encryptionTypes } from 'libmethods';
import { outputData } from 'libmethods/encryption/basic';
import { decryptCesar } from 'libmethods/encryption/basic/caesar';
import { decryptMonoAlphabeticCode } from 'libmethods/encryption/basic/monoalphabetic';
import { decryptPolyAlphabeticCode } from 'libmethods/encryption/basic/polyalphabetic';
import { decryptBigram } from 'libmethods/encryption/basic/bigram';

export function setMethod(method: Method) {
  return {
    type: types.DECRYPT_SET_METHOD,
    method,
  };
}

export function setKey(decryptionKey: string) {
  return {
    type: types.DECRYPT_SET_DECRYPTION_KEY,
    decryptionKey,
  };
}

export function setText(encryptedText: string) {
  return {
    type: types.DECRYPT_SET_ENCRYPTED_TEXT,
    encryptedText,
  };
}

export function setError(errorMessage: string) {
  return {
    type: types.DECRYPT_SET_ERROR_MESSAGE,
    errorMessage,
  };
}

export function decryptData(method: Method, encryptedText: string, decryptionKey: string) {
  let decryptedData: EncryptedData = { code: [], text: '' };

  switch (method.type) {
    case encryptionTypes.caesar:
      const decryptionKeyInt = parseInt(decryptionKey);
      decryptedData = decryptCesar(encryptedText, isNaN(decryptionKeyInt) ? 0 : decryptionKeyInt);
      break;

    case encryptionTypes.monoalphabetic:
      decryptedData = decryptMonoAlphabeticCode(encryptedText, decryptionKey);
      break;

    case encryptionTypes.polyalphabetic:
      decryptedData = decryptPolyAlphabeticCode(encryptedText, decryptionKey);
      break;

    case encryptionTypes.bigram:
      decryptedData = decryptBigram(encryptedText, decryptionKey);
      break;
  }

  outputData(
    method.name,
    encryptedText,
    decryptionKey,
    decryptedData.code,
    decryptedData.text,
    false,
  );

  return {
    type: types.DECRYPT_SET_DECRYPTED_DATA,
    decryptedData,
  };
}

//TODO: create separate method to get raw data from backend
