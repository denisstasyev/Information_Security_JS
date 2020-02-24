import { Method, EncryptedData } from 'store';

export interface DecryptState {
  method: Method;
  decryptionKey: string;
  encryptedText: string;
  decryptedData: EncryptedData;
  errorMessage: string;
}

export const DECRYPT_SET_METHOD = 'DECRYPT_SET_METHOD';
export const DECRYPT_SET_DECRYPTION_KEY = 'DECRYPT_SET_DECRYPTION_KEY';
export const DECRYPT_SET_ENCRYPTED_TEXT = 'DECRYPT_SET_ENCRYPTED_TEXT';
export const DECRYPT_SET_DECRYPTED_DATA = 'DECRYPT_SET_DECRYPTED_DATA';
export const DECRYPT_SET_ERROR_MESSAGE = 'DECRYPT_SET_ERROR_MESSAGE';

export const DECRYPT_RESET_DECRYPTION_KEY = 'DECRYPT_RESET_DECRYPTION_KEY';

interface SetMethodAction {
  type: typeof DECRYPT_SET_METHOD;
  method: Method;
}

interface SetDecryptionKeyAction {
  type: typeof DECRYPT_SET_DECRYPTION_KEY;
  decryptionKey: string;
}

interface SetEncryptedTextAction {
  type: typeof DECRYPT_SET_ENCRYPTED_TEXT;
  encryptedText: string;
}

interface SetDecryptedTextAction {
  type: typeof DECRYPT_SET_DECRYPTED_DATA;
  decryptedData: EncryptedData;
}

interface SetErrorMessageAction {
  type: typeof DECRYPT_SET_ERROR_MESSAGE;
  errorMessage: string;
}

interface ResetDecryptionKeyAction {
  type: typeof DECRYPT_RESET_DECRYPTION_KEY;
}

export type DecryptActionTypes =
  | SetMethodAction
  | SetDecryptionKeyAction
  | SetEncryptedTextAction
  | SetDecryptedTextAction
  | SetErrorMessageAction
  | ResetDecryptionKeyAction;
