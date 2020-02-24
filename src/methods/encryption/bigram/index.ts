import { EncryptedData } from 'store';
import {
  UNICODE_RING_SIZE,
  UNICODE_RING_SIZE_SQUARE,
  UNICODE_RING_SIZE_SQUARE_LENGTH,
} from 'methods/encryption';

export function encryptBigram(text: string, key: string): EncryptedData {
  let encryptedData: EncryptedData = { code: [], text: '' };
  let keyInt: number = 0;
  let symbolCode: number;

  for (let iter = 0; iter < key.length; iter++) {
    keyInt += key.charCodeAt(iter) % UNICODE_RING_SIZE;
  }

  if (text.length % 2 !== 0) {
    text += ' ';
  }

  for (let iter = 0; iter < text.length; iter += 2) {
    symbolCode =
      (text.charCodeAt(iter) * UNICODE_RING_SIZE + text.charCodeAt(iter + 1) + keyInt) %
      UNICODE_RING_SIZE_SQUARE;
    encryptedData.code.push(symbolCode);
    encryptedData.text += symbolCode.toString().padStart(UNICODE_RING_SIZE_SQUARE_LENGTH, '0');
  }

  return encryptedData;
}

export function decryptBigram(text: string, key: string): EncryptedData {
  const plainData: EncryptedData = { code: [], text: '' };
  let keyInt: number = 0;
  let symbolCode: number;
  let symbolCodeFirst: number;
  let symbolCodeSecond: number;

  for (let iter = 0; iter < key.length; iter++) {
    keyInt += key.charCodeAt(iter) % UNICODE_RING_SIZE;
  }

  for (let iter = 0; iter < text.length; iter += UNICODE_RING_SIZE_SQUARE_LENGTH) {
    symbolCode =
      (Number(text.substr(iter, UNICODE_RING_SIZE_SQUARE_LENGTH)) - keyInt) %
      UNICODE_RING_SIZE_SQUARE;
    symbolCodeSecond = symbolCode % UNICODE_RING_SIZE;
    symbolCodeFirst = (symbolCode - symbolCodeSecond) / UNICODE_RING_SIZE;
    plainData.code.push(symbolCodeFirst, symbolCodeSecond);
    plainData.text += String.fromCharCode(symbolCodeFirst, symbolCodeSecond);
  }

  return plainData;
}
