import aesjs from 'aes-js';

import { preparePlainText } from 'libmethods/encryption/block/utils';

export function encryptAES256_CTR(key: number[], plainText: string): string {
  const textUint8ArrayFilled: Uint8Array = preparePlainText(plainText);

  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));

  const encryptedBytes = aesCtr.encrypt(textUint8ArrayFilled);

  // The binary data converted to hex
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
}

export function decryptAES256_CTR(key: number[], encryptedText: string): string {
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedText);

  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));

  const decryptedTextBytes = aesCtr.decrypt(encryptedBytes);

  const decryptedText = new TextDecoder().decode(decryptedTextBytes);
  return decryptedText;
}
