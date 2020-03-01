import crc24 from 'crc/crc24';

export function getCRC24(text: string): string {
  return crc24(text);
}
