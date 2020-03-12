import { Method } from 'store';

import { blockEncryptionTypes } from 'libmethods';

import { getAES256ECB } from 'libmethods/encryption/block/aes';

export function getEncryptedText(method: Method, key: string, plainText: string): string {
  let encryptedText: string = '';

  switch (method.type) {
    case blockEncryptionTypes.aes256ecb:
      encryptedText = getAES256ECB(key, plainText);
      break;
  }

  return encryptedText;
}
