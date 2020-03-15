import sha512 from 'crypto-js/sha512';
import { toPositiveNumbers } from 'libmethods/hashing';

export function getSHA512(text: string): number[] {
  return toPositiveNumbers(sha512(text).words);
}
