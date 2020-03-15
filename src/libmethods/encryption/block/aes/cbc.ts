import aesjs from 'aes-js';

import { preparePlainText } from 'libmethods/encryption/block/utils';

export function encryptAES256_CBC(key: number[], plainText: string, iv: number[]): string {
  const textUint8ArrayFilled: Uint8Array = preparePlainText(plainText);

  const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);

  const encryptedBytes = aesCbc.encrypt(textUint8ArrayFilled);

  // The binary data converted to hex
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
}

export function decryptAES256_CBC(key: number[], encryptedText: string, iv: number[]): string {
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedText);

  const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);

  const decryptedTextBytes = aesCbc.decrypt(encryptedBytes);

  const decryptedText = new TextDecoder().decode(decryptedTextBytes);
  return decryptedText;
}
