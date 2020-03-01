import crc16 from 'crc/crc16';

export function getCRC16(text: string): string {
  return crc16(text);
}
