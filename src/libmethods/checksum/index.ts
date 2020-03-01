import { Method } from 'store';

import { checksumTypes } from 'libmethods';

import { getCRC16 } from 'libmethods/checksum/crc16';
import { getCRC24 } from 'libmethods/checksum/crc24';
import { getCRC32 } from 'libmethods/checksum/crc32';
import { getFletcher } from 'libmethods/checksum/fletcher';

export interface TypesCheckSum {
  [index: string]: number;
}

export function countChecksum(method: Method, text: string): TypesCheckSum {
  let checksum: TypesCheckSum;

  switch (method.type) {
    case checksumTypes.crc16:
      checksum = getCRC16(text);
      break;
    case checksumTypes.crc24:
      checksum = getCRC24(text);
      break;
    case checksumTypes.crc32:
      checksum = getCRC32(text);
      break;
    case checksumTypes.fletcher:
      checksum = getFletcher(text);
      break;
    default:
      checksum = {};
  }

  return checksum;
}
