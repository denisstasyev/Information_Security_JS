import { Method } from 'store';

import { checksumTypes } from 'libmethods';

import { getCRC16 } from 'libmethods/checksum/crc16';
import { getCRC24 } from 'libmethods/checksum/crc24';
import { getCRC32 } from 'libmethods/checksum/crc32';

export function countChecksum(method: Method, text: string): string {
  let checksum: number;

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
    default:
      checksum = 0;
  }

  return checksum.toString();
}
