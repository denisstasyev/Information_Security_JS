import { fletcher16 } from 'fletcher';
import { TypesCheckSum } from 'libmethods/checksum';
import { getUnicodeCode } from 'libmethods';

export function getFletcher(text: string): TypesCheckSum[] {
  return [
    {
      name: 'Флетчер',
      value: fletcher16(Buffer.from(Array.from(text).map(value => getUnicodeCode(value)))),
    },
  ];
}
