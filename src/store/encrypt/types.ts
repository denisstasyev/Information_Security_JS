import { Method, EncryptedData } from 'store';

export interface EncryptState {
  method: Method;
  encryptionKey: string;
  plainText: string;
  errorMessage: string;
  encryptedData: EncryptedData;
}

export const ENCRYPT_SET_METHOD = 'ENCRYPT_SET_METHOD';
export const ENCRYPT_SET_ENCRYPTION_KEY = 'ENCRYPT_SET_ENCRYPTION_KEY';
export const ENCRYPT_SET_PLAIN_TEXT = 'ENCRYPT_SET_PLAIN_TEXT';
export const ENCRYPT_SET_ERROR_MESSAGE = 'ENCRYPT_SET_ERROR_MESSAGE';
export const ENCRYPT_SET_ENCRYPTED_DATA = 'ENCRYPT_SET_ENCRYPTED_DATA';

export const ENCRYPT_RESET_ENCRYPTION_KEY = 'ENCRYPT_RESET_ENCRYPTION_KEY';

interface SetMethodAction {
  type: typeof ENCRYPT_SET_METHOD;
  method: Method;
}

interface SetEncryptionKeyAction {
  type: typeof ENCRYPT_SET_ENCRYPTION_KEY;
  encryptionKey: string;
}

interface SetPlainTextAction {
  type: typeof ENCRYPT_SET_PLAIN_TEXT;
  plainText: string;
}

interface SetErrorMessageAction {
  type: typeof ENCRYPT_SET_ERROR_MESSAGE;
  errorMessage: string;
}

interface SetEncryptedDataAction {
  type: typeof ENCRYPT_SET_ENCRYPTED_DATA;
  encryptedData: EncryptedData;
}

interface ResetEncryptionKeyAction {
  type: typeof ENCRYPT_RESET_ENCRYPTION_KEY;
}

export type EncryptActionTypes =
  | SetMethodAction
  | SetEncryptionKeyAction
  | SetPlainTextAction
  | SetErrorMessageAction
  | SetEncryptedDataAction
  | ResetEncryptionKeyAction;
