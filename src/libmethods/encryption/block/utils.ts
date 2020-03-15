import { getSHA256 } from 'libmethods/hashing/sha256';
import { toHexFormat } from 'libmethods/hashing';
import { getRandomBytes } from 'js-crypto-random';

/**
 * Convert string key into Array of 4 elements with 128 bit size.
 * Then it is converted into hex string and parsed into hex Array of 16 elements with 2 characters.
 * Finally parse it into Array of 16 Numbers.
 *
 * @param  {string} key
 * @returns number
 */
export function getNormalizedKey(key: string): number[] {
  const key_128bit_4elements: number[] = getSHA256(key).slice(0, 4);
  // @ts-ignore
  const keyNormalizedHexes: string[] = toHexFormat(key_128bit_4elements).match(/.{1,2}/g) || [];
  const keyNormalized: number[] = keyNormalizedHexes.map(keyHex => parseInt(keyHex, 16));
  return keyNormalized;
}

/**
 * The initialization vector must be 16 bytes (like Array of 16 Numbers)
 */
export function getNormalizedIv(iv: string): number[] | undefined {
  const re = /\s*,\s*/;
  const ivArray = iv.split(re).map(Number);
  return ivArray.includes(NaN) || ivArray.length !== 16 ? undefined : ivArray;
}

export function generateIv(): number[] {
  return Array.from(getRandomBytes(16));
}

export const DEFAULT_IV = Array(16).fill(0);

/**
 * Convert plain text into filled with spaced at the end (to be multiple of 16) UTF-8 Array
 *
 * @param  {string} plainText
 * @returns Uint8Array
 */
export function preparePlainText(plainText: string): Uint8Array {
  // Convert text to UTF-8 Array
  let textUint8Array = new TextEncoder().encode(plainText);

  // Create text with length is a multiple of 16 Byte (with spaces at the end)
  const rest16bytesLength: number = 16 - (textUint8Array.length % 16 || 16);
  const textUint8ArrayFilled: Uint8Array = Uint8Array.from([
    ...Array.from(textUint8Array),
    ...Array.from({ length: rest16bytesLength }, () => 32), // 32 is UTF-8 code of space
  ]);

  return textUint8ArrayFilled;
}
