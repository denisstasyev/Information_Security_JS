import { TypesCheckSum } from 'libmethods/checksum';

export function getCRC32(text: string): TypesCheckSum {
  return { 'CRC-32': crc32(text) };
}
