/*
 * Initially created by Ilya Grishnov
 */

import * as cryptico from 'cryptico';
import Base64 from 'utils/base64';

export function generateRSAOpenKey(KeyPhrase: string, RsaKeyLength: number): object {
  /*
   *   Params:
   *   KeyPhrase: this is password from user (can be any utf-8 string)
   *   RsaKeyLength: use 512 or 1024 (rsa key pair length)
   *
   *   Purpose:
   *   Generates the RSA key pair and extracts the public key from it for return.
   *   Also returns key length the md5 key for integrity control.
   */
  const RSAKeyPair: object = cryptico.generateRSAKey(KeyPhrase, RsaKeyLength);
  const OpenKeyValue: string = cryptico.publicKeyString(RSAKeyPair);
  const OpenKeyMD5Value: string = cryptico.publicKeyID(OpenKeyValue);
  return {
    open_rsa_key: OpenKeyValue,
    key_md5: OpenKeyMD5Value,
    RSA_len: RsaKeyLength,
  };
}

export function encryptRSA(
  OpenKeyValue: string,
  OpenKeyMD5Value: string,
  RsaKeyLength: number,
  PlainTextValue: string,
): object {
  /*
   *   Params:
   *   OpenKeyValue: open key for encryption
   *   OpenKeyMD5Value: check open key for integrity before encryption
   *   RsaKeyLength: use 512 or 1024 (rsa key pair length)
   *   PlainTextValue: message from user
   *
   *   Purpose:
   *   Performs encryption on the user's public key.
   *   Checks the integrity of the public key before encryption.
   */
  if (OpenKeyMD5Value !== cryptico.publicKeyID(OpenKeyValue)) {
    return {
      encrypted_data: 'ERROR: the open key was damaged!',
    };
  }
  const EncryptionResult: any = cryptico.encrypt(Base64.encode(PlainTextValue), OpenKeyValue);
  const CloseText: string = EncryptionResult['cipher'];
  return {
    encryption_result: CloseText,
    cipher_algorithm: 'RSA',
    RSA_len: RsaKeyLength,
  };
}

export function decryptRSA(CloseText: string, KeyPhrase: string, RsaKeyLength: number): object {
  /*
   *   Params:
   *   CloseText: encrypted text
   *   KeyPhrase: this is password from user (can be any utf-8 string)
   *   RsaKeyLength: use 512 or 1024 (rsa key pair length)
   *
   *   Purpose:
   *   Performs decryption.
   *   To get the private key, use the user's passphrase that was used when creating the public key.
   */
  const RSAKeyPair: object = cryptico.generateRSAKey(KeyPhrase, RsaKeyLength);
  const DecryptionResult: any = cryptico.decrypt(CloseText, RSAKeyPair);
  const DecryptedText: string = Base64.decode(DecryptionResult['plaintext']);
  return {
    decrypted_text: DecryptedText,
  };
}
