import sha256 from 'crypto-js/sha256';
import { toPositiveNumbers } from 'libmethods/hashing';

export function getSHA256(text: string): number[] {
  return toPositiveNumbers(sha256(text).words);
}
