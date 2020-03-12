import sha3 from 'crypto-js/sha3';

export function getSHA3(text: string): number[] {
  return sha3(text).words;
}
