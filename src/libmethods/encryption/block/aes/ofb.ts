import aesjs from 'aes-js';

import { preparePlainText } from 'libmethods/encryption/block/utils';

export function encryptAES256_OFB(key: number[], plainText: string, iv: number[]): string {
  const textUint8ArrayFilled: Uint8Array = preparePlainText(plainText);

  const aesOfb = new aesjs.ModeOfOperation.ofb(key, iv);

  const encryptedBytes = aesOfb.encrypt(textUint8ArrayFilled);

  // The binary data converted to hex
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
}

export function decryptAES256_OFB(key: number[], encryptedText: string, iv: number[]): string {
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedText);

  const aesOfb = new aesjs.ModeOfOperation.ofb(key, iv);

  const decryptedTextBytes = aesOfb.decrypt(encryptedBytes);

  const decryptedText = new TextDecoder().decode(decryptedTextBytes);
  return decryptedText;
}
