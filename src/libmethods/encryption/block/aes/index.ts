import aesjs from 'aes-js';

export function encryptAES256_ECB(key: number[], plainText: string): string {
  // Test convert text to bytes to detect rest
  const testTextBytes = aesjs.utils.utf8.toBytes(plainText);

  // Create text with length is a multiple of 16 Byte (with spaces at the end)
  const rest16bytesLength: number = 16 - (testTextBytes.length % 16);
  const fixedText = plainText + new Array(rest16bytesLength + 1).join(' ');

  // Main convert text to bytes
  const textBytes = aesjs.utils.utf8.toBytes(fixedText);

  const aesEcb = new aesjs.ModeOfOperation.ecb(key);
  const encryptedBytes = aesEcb.encrypt(textBytes);

  // The binary data converted to hex
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

  return encryptedHex;
}

export function decryptAES256_ECB(key: number[], encryptedText: string): string {
  // Convert hex string back to bytes
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedText);

  const aesEcb = new aesjs.ModeOfOperation.ecb(key);
  const decryptedTextBytes = aesEcb.decrypt(encryptedBytes);
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedTextBytes);

  return decryptedText;
}
