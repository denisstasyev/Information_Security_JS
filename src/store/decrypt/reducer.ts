import * as types from './types';
import { encryptionMethods } from 'libmethods';

const initialState: types.DecryptState = {
  method: encryptionMethods[0],
  decryptionKey: '',
  encryptedText: '',
  errorMessage: '',
  decryptedData: { code: [], text: '' },
};

export default function(
  state = initialState,
  action: types.DecryptActionTypes,
): types.DecryptState {
  switch (action.type) {
    case types.DECRYPT_SET_METHOD:
      state.method = action.method;
      state.errorMessage = '';
      state.decryptedData = { code: [], text: '' };
      return Object.assign({}, state);

    case types.DECRYPT_SET_DECRYPTION_KEY:
      state.decryptionKey = action.decryptionKey;
      state.errorMessage = '';
      state.decryptedData = { code: [], text: '' };
      return Object.assign({}, state);

    case types.DECRYPT_SET_ENCRYPTED_TEXT:
      state.encryptedText = action.encryptedText;
      state.errorMessage = '';
      state.decryptedData = { code: [], text: '' };
      return Object.assign({}, state);

    case types.DECRYPT_SET_DECRYPTED_DATA:
      state.decryptedData = action.decryptedData;
      state.errorMessage = '';
      return Object.assign({}, state);

    case types.DECRYPT_SET_ERROR_MESSAGE:
      state.errorMessage = action.errorMessage;
      return Object.assign({}, state);

    case types.DECRYPT_RESET_DECRYPTION_KEY:
      state.decryptionKey = '';
      state.errorMessage = '';
      state.decryptedData = { code: [], text: '' };
      return Object.assign({}, state);

    default:
      return state;
  }
}
