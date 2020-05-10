import {
  generateRSAOpenKey,
  encryptRSA as internalEncryptRSA,
  decryptRSA as internalDecryptRSA,
} from 'libmethods/encryption/asymmetric/rsa/internal';

export function encryptRSA(key: string, plainText: string, type: number): string {
  const openKey: any = generateRSAOpenKey(key, type);

  const encryptedData: any = internalEncryptRSA(
    openKey['open_rsa_key'],
    openKey['key_md5'],
    openKey['RSA_len'],
    plainText,
  );

  return encryptedData['encryption_result'];
}

export function decryptRSA(key: string, encryptedText: string, type: number): string {
  const decryptedData: any = internalDecryptRSA(encryptedText, key, type);

  return decryptedData['decrypted_text'];
}
