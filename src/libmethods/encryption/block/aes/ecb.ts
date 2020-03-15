import aesjs from 'aes-js';

import { preparePlainText } from 'libmethods/encryption/block/utils';

export function encryptAES256_ECB(key: number[], plainText: string): string {
  const textUint8ArrayFilled: Uint8Array = preparePlainText(plainText);

  const aesEcb = new aesjs.ModeOfOperation.ecb(key);

  const encryptedBytes = aesEcb.encrypt(textUint8ArrayFilled);

  // The binary data converted to hex
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
}

export function decryptAES256_ECB(key: number[], encryptedText: string): string {
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedText);

  const aesEcb = new aesjs.ModeOfOperation.ecb(key);

  const decryptedTextBytes = aesEcb.decrypt(encryptedBytes);

  const decryptedText = new TextDecoder().decode(decryptedTextBytes);
  return decryptedText;
}
