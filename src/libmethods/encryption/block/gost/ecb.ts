import gost89 from 'gost89';
import aesjs from 'aes-js';

export function encryptGOST89_ECB(key: number[], plainText: string): string {
  const gost = gost89.init();
  const textUint8Array = new TextEncoder().encode(plainText);
  // console.log(textUint8Array, Buffer.from(plainText, 'binary'));
  gost.key(key);
  console.log(textUint8Array);
  const encryptedBytes = gost.crypt(textUint8Array);
  console.log(encryptedBytes);
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  // console.log(encryptedHex);

  const decryptedBytes = gost.decrypt(encryptedBytes);
  console.log(decryptedBytes);
  return encryptedHex;
  //   const textUint8ArrayFilled: Uint8Array = preparePlainText(plainText);

  //   const aesEcb = new aesjs.ModeOfOperation.ecb(key);

  //   const encryptedBytes = aesEcb.encrypt(textUint8ArrayFilled);

  //   // The binary data converted to hex
  //   const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  //   return encryptedHex;
}

// export function decryptAES256_ECB(key: number[], encryptedText: string): string {
//   const encryptedBytes = aesjs.utils.hex.toBytes(encryptedText);

//   const aesEcb = new aesjs.ModeOfOperation.ecb(key);

//   const decryptedTextBytes = aesEcb.decrypt(encryptedBytes);

//   const decryptedText = new TextDecoder().decode(decryptedTextBytes);
//   return decryptedText;
// }
