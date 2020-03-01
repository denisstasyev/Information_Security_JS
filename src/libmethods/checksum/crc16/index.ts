import { crc16, crc16ccitt, crc16kermit, crc16modbus, crc16xmodem } from 'crc';
import { TypesCRC } from 'libmethods/checksum';

function getCRC16_ARC(text: string): number {
  return crc16(text);
}

function getCRC16_CCITT_FALSE(text: string): number {
  return crc16ccitt(text);
}

function getCRC16_KERMIT(text: string): number {
  return crc16kermit(text);
}

function getCRC16_MODBUS(text: string): number {
  return crc16modbus(text);
}

function getCRC16_XMODEM(text: string): number {
  return crc16xmodem(text);
}

export function getCRC16(text: string): TypesCRC {
  return {
    'CRC-16/ARC': getCRC16_ARC(text),
    'CRC-16/CCITT-FALSE': getCRC16_CCITT_FALSE(text),
    'CRC-16/KERMIT': getCRC16_KERMIT(text),
    'CRC-16/MODBUS': getCRC16_MODBUS(text),
    'CRC-16/XMODEM': getCRC16_XMODEM(text),
  };
}
