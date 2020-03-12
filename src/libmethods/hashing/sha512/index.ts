import sha512 from 'crypto-js/sha512';

export function getSHA512(text: string): number[] {
  return sha512(text).words;
}
