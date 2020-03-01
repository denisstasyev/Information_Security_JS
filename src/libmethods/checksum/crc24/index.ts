import { crc24 } from 'crc';

export function getCRC24(text: string): number {
  return crc24(text);
}
