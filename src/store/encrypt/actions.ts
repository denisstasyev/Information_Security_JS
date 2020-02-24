import { Method, EncryptedData } from 'store';
import * as types from './types';

import { encryptionTypes } from '../../methods'; //TODO: fix bug with absolut imports with Typescript
import { outputData } from '../../methods/encryption';
import { encryptCesar } from '../../methods/encryption/caesar';
import { encryptMonoAlphabeticCode } from '../../methods/encryption/monoalphabetic';
import { encryptPolyAlphabeticCode } from '../../methods/encryption/polyalphabetic';
import { encryptBigram } from '../../methods/encryption/bigram';

export function setMethod(method: Method) {
  return {
    type: types.ENCRYPT_SET_METHOD,
    method,
  };
}

export function setKey(encryptionKey: string) {
  return {
    type: types.ENCRYPT_SET_ENCRYPTION_KEY,
    encryptionKey,
  };
}

export function setText(plainText: string) {
  return {
    type: types.ENCRYPT_SET_PLAIN_TEXT,
    plainText,
  };
}

export function setError(errorMessage: string) {
  return {
    type: types.ENCRYPT_SET_ERROR_MESSAGE,
    errorMessage,
  };
}

export function encryptData(method: Method, plainText: string, encryptionKey: string) {
  let encryptedData: EncryptedData = { code: [], text: '' };

  switch (method.type) {
    case encryptionTypes.caesar:
      const encryptionKeyInt = parseInt(encryptionKey);
      encryptedData = encryptCesar(plainText, isNaN(encryptionKeyInt) ? 0 : encryptionKeyInt);
      break;

    case encryptionTypes.monoalphabetic:
      encryptedData = encryptMonoAlphabeticCode(plainText, encryptionKey);
      break;

    case encryptionTypes.polyalphabetic:
      encryptedData = encryptPolyAlphabeticCode(plainText, encryptionKey);
      break;

    case encryptionTypes.bigram:
      encryptedData = encryptBigram(plainText, encryptionKey);
      break;
  }

  outputData(method.name, plainText, encryptionKey, encryptedData.code, encryptedData.text, true);

  // console.log(`А вот тут будет отправка на бекенд наших данных!`);

  return {
    type: types.ENCRYPT_SET_ENCRYPTED_DATA,
    encryptedData,
  };
}
