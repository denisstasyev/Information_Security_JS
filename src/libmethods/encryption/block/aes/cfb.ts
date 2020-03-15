import aesjs from 'aes-js';

import { preparePlainText } from 'libmethods/encryption/block/utils';

const segmentSize = 8;

export function encryptAES256_CFB(key: number[], plainText: string, iv: number[]): string {
  const textUint8ArrayFilled: Uint8Array = preparePlainText(plainText);

  const aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, segmentSize);

  const encryptedBytes = aesCfb.encrypt(textUint8ArrayFilled);

  // The binary data converted to hex
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
}

export function decryptAES256_CFB(key: number[], encryptedText: string, iv: number[]): string {
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedText);

  const aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, segmentSize);

  const decryptedTextBytes = aesCfb.decrypt(encryptedBytes);

  const decryptedText = new TextDecoder().decode(decryptedTextBytes);
  return decryptedText;
}
