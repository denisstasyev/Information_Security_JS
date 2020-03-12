import sha3 from 'crypto-js/sha3';
import { toPositiveNumbers } from 'libmethods/hashing';

export function getSHA3(text: string): number[] {
  return toPositiveNumbers(sha3(text).words);
}
