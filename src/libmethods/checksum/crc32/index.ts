import { crc32 } from 'crc';

export function getCRC32(text: string): number {
  return crc32(text);
}
