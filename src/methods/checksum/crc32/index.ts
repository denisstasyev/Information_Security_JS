import crc32 from 'crc/crc32';

export function getCRC32(text: string): string {
  return crc32(text);
}
