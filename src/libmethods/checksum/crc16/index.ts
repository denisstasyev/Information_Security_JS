import { crc16, crc16ccitt, crc16kermit, crc16modbus, crc16xmodem } from 'crc';

function getCRC16_ARC(text: string): number {
  return crc16(text);
}

// function getCRC16_CCITT_FALSE(text: string): string {
//   return crc16ccitt(text);
// }

// function getCRC16_KERMIT(text: string): number {
//   return crc16kermit(text);
// }

// function getCRC16_MODBUS(text: string): number {
//   return crc16modbus(text);
// }

// function getCRC16_XMODEM(text: string): number {
//   return crc16xmodem(text);
// }

export function getCRC16(text: string): number {
  return getCRC16_ARC(text);
}
