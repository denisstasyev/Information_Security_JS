import { Method } from 'store';

import { hashingTypes } from 'libmethods';

import { getSHA256 } from 'libmethods/hashing/sha256';
import { getSHA512 } from 'libmethods/hashing/sha512';
import { getSHA3 } from 'libmethods/hashing/sha3';

const LENGTH_OF_ELEMENT_HASHING = 2 ** 32;
export function toPositiveNumbers(mas: number[]): number[] {
  return mas.map((elem: number) => (LENGTH_OF_ELEMENT_HASHING + elem) % LENGTH_OF_ELEMENT_HASHING);
}

export function toHexFormat(mas: number[]): string {
  return mas.reduce((hexString: string, elem: number) => hexString + elem.toString(16), '');
}

export function calculateHash(method: Method, text: string): string {
  let hash: number[];

  switch (method.type) {
    case hashingTypes.sha256:
      hash = getSHA256(text);
      break;
    case hashingTypes.sha512:
      hash = getSHA512(text);
      break;
    case hashingTypes.sha3:
      hash = getSHA3(text);
      break;
    default:
      hash = [];
  }

  return toHexFormat(hash);
}
