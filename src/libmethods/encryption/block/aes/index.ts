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
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

  return encryptedHex;
}

export function decryptAES256_ECB(key: number[], encryptedText: string): string {
  return 'hello';
}
// // To print or store the binary data, you may convert it to hex
// var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
// console.log(encryptedHex);
// // "a7d93b35368519fac347498dec18b458"

// // When ready to decrypt the hex string, convert it back to bytes
// var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

// // Since electronic codebook does not store state, we can
// // reuse the same instance.
// //var aesEcb = new aesjs.ModeOfOperation.ecb(key);
// var decryptedBytes = aesEcb.decrypt(encryptedBytes);

// // Convert our bytes back into text
// var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
// console.log(decryptedText);
// // "TextMustBe16Byte"
