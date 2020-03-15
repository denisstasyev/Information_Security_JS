import aesjs from 'aes-js';

export function encryptAES256_ECB(key: number[], plainText: string): string {
  let textUint8Array = new TextEncoder().encode(plainText);

  const rest16bytesLength: number = 16 - (textUint8Array.length % 16 || 16);
  const textUint8ArrayFill = new Uint8Array([
    ...Array.from(textUint8Array),
    ...Array.from({ length: rest16bytesLength }, () => 32),
  ]);

  const aesEcb = new aesjs.ModeOfOperation.ecb(key);
  const encryptedBytes = aesEcb.encrypt(textUint8ArrayFill);

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
