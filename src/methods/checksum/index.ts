import { Method } from 'store';

import { checksumTypes } from '../'; //TODO: fix bug with absolut imports with Typescript

import { getCRC16 } from 'methods/checksum/crc16';
import { getCRC24 } from 'methods/checksum/crc24';
import { getCRC32 } from 'methods/checksum/crc32';

export function countChecksum(method: Method, text: string): string {
  let checksum = '';

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
  }

  return checksum;
}
