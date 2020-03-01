import * as types from './types';
import { encryptionMethods } from 'libmethods';

const initialState: types.EncryptState = {
  method: encryptionMethods[0],
  encryptionKey: '',
  plainText: '',
  errorMessage: '',
  encryptedData: { code: [], text: '' },
};

export default function(
  state = initialState,
  action: types.EncryptActionTypes,
): types.EncryptState {
  switch (action.type) {
    case types.ENCRYPT_SET_METHOD:
      state.method = action.method;
      state.errorMessage = '';
      state.encryptedData = { code: [], text: '' };
      return Object.assign({}, state);

    case types.ENCRYPT_SET_ENCRYPTION_KEY:
      state.encryptionKey = action.encryptionKey;
      state.encryptedData = { code: [], text: '' };
      return Object.assign({}, state);

    case types.ENCRYPT_SET_PLAIN_TEXT:
      state.plainText = action.plainText;
      state.encryptedData = { code: [], text: '' };
      return Object.assign({}, state);

    case types.ENCRYPT_SET_ERROR_MESSAGE:
      state.errorMessage = action.errorMessage;
      return Object.assign({}, state);

    case types.ENCRYPT_SET_ENCRYPTED_DATA:
      state.encryptedData = action.encryptedData;
      state.errorMessage = '';
      return Object.assign({}, state);

    case types.ENCRYPT_RESET_ENCRYPTION_KEY:
      state.encryptionKey = '';
      return Object.assign({}, state);

    default:
      return state;
  }
}
