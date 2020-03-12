import sha256 from 'crypto-js/sha256';

export function getSHA256(text: string): number[] {
  return sha256(text).words;
}
