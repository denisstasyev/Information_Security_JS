import aesjs from 'aes-js';

export function encryptAES256_ECB(key: number[], plainText: string): string {
  // Convert text to UTF-8 Array
  let textUint8Array = new TextEncoder().encode(plainText);

  // Create text with length is a multiple of 16 Byte (with spaces at the end)
  const rest16bytesLength: number = 16 - (textUint8Array.length % 16 || 16);
  const textUint8ArrayFilled = Uint8Array.from([
    ...Array.from(textUint8Array),
    ...Array.from({ length: rest16bytesLength }, () => 32), // 32 is UTF-8 code of space
  ]);

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
