import { Method } from 'store';

import { hashingTypes } from 'libmethods';
import { getSHA256 } from 'libmethods/hashing/sha256';
// import { getSHA512 } from 'libmethods/hashing/sha512';

export function calculateHash(method: Method, text: string, key: string): number[] {
  let hash: number[];

  switch (method.type) {
    case hashingTypes.sha256:
      hash = getSHA256(text, key);
      break;
    // case hashingTypes.sha512:
    //   hash = getSHA512(text);
    //   break;
    // case hashingTypes.sha3:
    //   hash = getSHA3(text);
    //   break;
    default:
      hash = [];
  }

  return hash;
}
