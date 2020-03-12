import * as React from 'react';
import { connect } from 'react-redux';

import { ContentBox } from 'components/ContentBox';
import { Alarm } from 'components/Alarm';

import { CIPHER_METHOD, ENCRYPTED_DATA, ENCRYPTED_DATA_BASE64 } from 'config';

import { AppState, Method } from 'store';
import { EncryptState } from 'store/encrypt/types';
import { setMethod, setKey, setText, setError, encryptData } from 'store/encrypt/actions';

import { encryptionMethods, encryptionTypes } from 'libmethods';
import { getSHA256 } from 'libmethods/hashing/sha256';

import Base64 from 'utils/base64';

interface EncryptStateProps extends EncryptState {
  setMethod: typeof setMethod;
  setText: typeof setText;
  setKey: typeof setKey;
  setError: typeof setError;
  encryptData: typeof encryptData;
}

const Encrypt: React.SFC<EncryptStateProps> = props => {
  const [caesarVariant, setCaesarVariant] = React.useState(false);

  const onChangeMethod = (event: any) => {
    event.preventDefault();
    const method: Method =
      encryptionMethods.find(method => method.type === event.target.value) || encryptionMethods[0];
    props.setMethod(method);

    if (
      event.target.value === encryptionTypes.caesar &&
      props.encryptionKey !== parseInt(props.encryptionKey).toString()
    ) {
      props.setKey('');
    }
  };

  const onChangeText = (event: any) => {
    event.preventDefault();
    props.setText(event.target.value);
  };

  const clearError = () => {
    if (props.errorMessage !== '') {
      props.setError('');
    }
  };

  const onChangeKey = (event: any) => {
    event.preventDefault();

    if (
      props.method.type === encryptionTypes.caesar &&
      event.target.value !== '' &&
      caesarVariant
    ) {
      if (event.target.value === parseInt(event.target.value).toString()) {
        props.setKey(event.target.value);
        clearError();
      } else {
        props.setError('Некорретный ключ: введите целое значение!');
      }
    } else {
      props.setKey(event.target.value);
      clearError();
    }
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (props.encryptionKey === '') {
      props.setError('Введите ключ шифрования!');
      return;
    }
    if (props.plainText === '') {
      props.setError('Введите текст, который необходимо зашифровать!');
      return;
    }

    if (props.method.type === encryptionTypes.caesar && !caesarVariant) {
      props.encryptData(
        props.method,
        props.plainText,
        getSHA256(props.encryptionKey)[0].toString(),
      );
    } else {
      props.encryptData(props.method, props.plainText, props.encryptionKey);
    }
  };

  const getJSON = (methodName: string, encryptedCode: number[], encryptedText: string) => {
    let json = {
      [CIPHER_METHOD]: methodName,
      // [ENCRYPTED_DATA_CODES]: encryptedCode,
      [ENCRYPTED_DATA]: encryptedText,
      [ENCRYPTED_DATA_BASE64]: Base64.encode(encryptedText),
    };
    return JSON.stringify(json, undefined, 2);
  };

  return (
    <>
      <ContentBox title="Шифрование">
        <span>1) Выберите метод для шифрования: </span>
        <select value={props.method.type} onChange={onChangeMethod}>
          {encryptionMethods.map((method, index) => (
            <option value={method.type} key={index}>
              {method.name}
            </option>
          ))}
        </select>
        <span>
          {props.method.type === encryptionTypes.caesar && (
            <div>
              1.1) Использовать обычный сдвиг (без хеширования)
              <input
                type="checkbox"
                checked={caesarVariant}
                onChange={() => {
                  setCaesarVariant(!caesarVariant);
                  props.setKey('');
                }}
              />
            </div>
          )}
        </span>
        <span>2) Введите ключ:</span>
        <input
          value={props.encryptionKey}
          type="text"
          placeholder="Ваш ключ"
          onChange={onChangeKey}
        />
        <span>3) Введите открытый текст, который хотите зашифровать:</span>
        <textarea
          value={props.plainText}
          placeholder="Ваш открытый текст"
          onChange={onChangeText}
        />
        {props.errorMessage && <Alarm type="error" text={`Ошибка! ${props.errorMessage}`} />}
        <button onClick={onSubmit}>Зашифровать!</button>
      </ContentBox>

      {!props.errorMessage && props.encryptedData.text && (
        <ContentBox title="Ваш результат">
          <span>1) Закрытый текст:</span>
          <textarea value={props.encryptedData.text} onChange={() => {}} />
          <span>2) JSON для отправки на сервер для расшифрования:</span>
          <textarea
            value={getJSON(props.method.name, props.encryptedData.code, props.encryptedData.text)}
            onChange={() => {}}
          />
        </ContentBox>
      )}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  method: state.encryptReducer.method,
  encryptionKey: state.encryptReducer.encryptionKey,
  plainText: state.encryptReducer.plainText,
  errorMessage: state.encryptReducer.errorMessage,
  encryptedData: state.encryptReducer.encryptedData,
});

export default connect(mapStateToProps, { setMethod, setText, setKey, setError, encryptData })(
  Encrypt,
);
