import { crc32 } from 'crc';
import { TypesCRC } from 'libmethods/checksum';

export function getCRC32(text: string): TypesCRC {
  return { 'CRC-32': crc32(text) };
}
