import { crc24 } from 'crc';
import { TypesCheckSum } from 'libmethods/checksum';

export function getCRC24(text: string): TypesCheckSum[] {
  return [{ name: 'CRC-24', value: crc24(text) }];
}
