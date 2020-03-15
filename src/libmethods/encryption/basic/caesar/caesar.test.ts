import { encryptCesar, decryptCesar } from './index';

it('Encryption: Caesar', () => {
  expect(encryptCesar('1', 2).text).toEqual('3');
  expect(encryptCesar('2', 2).text).toEqual('4');
});

it('Decryption: Caesar', () => {
  expect(decryptCesar('3', 2).text).toEqual('1');
  expect(decryptCesar('4', 2).text).toEqual('2');
});

it('Encryption and decryption: Caesar', () => {
  expect(decryptCesar(encryptCesar('1', 2).text, 2).text).toEqual('1');
  expect(decryptCesar(encryptCesar('2', 2).text, 2).text).toEqual('2');
});
