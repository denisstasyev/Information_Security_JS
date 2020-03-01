import { crc32 } from 'crc';
import { TypesCheckSum } from 'libmethods/checksum';

export function getCRC32(text: string): TypesCheckSum[] {
  return [{ name: 'CRC-32', value: crc32(text) }];
}
