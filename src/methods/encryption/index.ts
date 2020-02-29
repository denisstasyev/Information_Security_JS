export const UNICODE_RING_SIZE = 1114112; // Total number of Unicode symbols
export const UNICODE_RING_SIZE_SQUARE = 1114112 ** 2;
export const UNICODE_RING_SIZE_SQUARE_LENGTH = UNICODE_RING_SIZE_SQUARE.toString().length;

/**
 * Console development output
 *
 * @param  {string} method
 * @param  {string} text
 * @param  {string} key
 * @param  {number[]} cipherCode
 * @param  {string} cipherText
 * @param  {boolean} encryptionBool
 * @returns void
 */
export function outputData(
  method: string,
  text: string,
  key: string,
  cipherCode: number[],
  cipherText: string,
  encryptionBool: boolean,
): void {
  const encriptionStr: string = encryptionBool ? 'Шифрование' : 'Расшифрование';

  if (process.env.NODE_ENV !== 'production') {
    console.log(
      `${encriptionStr} по методу - ${method}\n`,
      `Текст: ${text}\n`,
      `Ключ: ${key}\n`,
      `Коды ${encryptionBool ? 'шифротекста' : 'открытого текста'}: ${cipherCode}\n`,
      `${encryptionBool ? 'Шифротекст' : 'Открытый текст'}: ${cipherText}`,
    );
  }
}

/**
 * Since Javascript has two-character representation for Emoji
 * then a method for obtaining real unicode codes is needed
 *
 * Reason: Javascript function String.prototype.charCodeAt() works fine only with UCS-2 format
 * which is is a strict subset of UTF-16 - it can encode characters in the Basic Multilingual
 * Plane (i.e., from U+0000 til U+FFFF) only. If you need to express characters in the
 * supplementary planes (which includes some relatively rare Chinese characters), they must be
 * encoded using pairs of two 16 bit code units ("surrogates"), and if so your data will not
 * be valid UCS-2 but must be declared as UTF-16
 *
 * @param  {string} emoji
 * @returns number
 */
export function emojiUnicode(emoji: string): number {
  let comp;

  if (emoji.length === 1) {
    comp = emoji.charCodeAt(0);
  } else {
    comp = (emoji.charCodeAt(0) - 0xd800) * 0x400 + (emoji.charCodeAt(1) - 0xdc00) + 0x10000;
    if (comp < 0) {
      comp = emoji.charCodeAt(0);
    }
  }

  return isNaN(comp) ? 0 : comp; // Extra check
}
