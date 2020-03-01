import { crc24 } from 'crc';
import { TypesCRC } from 'libmethods/checksum';

export function getCRC24(text: string): TypesCRC {
  return { 'CRC-24': crc24(text) };
}
