import * as React from 'react';
import { connect } from 'react-redux';

import { CIPHER_ALGORITHM, ENCRYPTED_DATA_CODES, ENCRYPTED_DATA } from 'config';

import { AppState, Method } from 'store';
import { EncryptState } from 'store/encrypt/types';
import { setMethod, setKey, setText, setError, encryptData } from 'store/encrypt/actions';

import { encryptionMethods, encryptionTypes } from 'libmethods';

interface EncryptStateProps extends EncryptState {
  setMethod: typeof setMethod;
  setText: typeof setText;
  setKey: typeof setKey;
  setError: typeof setError;
  encryptData: typeof encryptData;
}

const Encrypt: React.SFC<EncryptStateProps> = props => {
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

    if (props.method.type === encryptionTypes.caesar && event.target.value !== '') {
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
    props.encryptData(props.method, props.plainText, props.encryptionKey);
  };

  const getJSON = (methodName: string, encryptedCode: number[], encryptedText: string) => {
    let json = {
      [CIPHER_ALGORITHM]: methodName,
      [ENCRYPTED_DATA_CODES]: encryptedCode,
      [ENCRYPTED_DATA]: encryptedText,
    };
    return JSON.stringify(json, undefined, 2);
  };

  return (
    <>
      <h2>Шифрование</h2>
      <div>1) Выберите метод для шифрования:</div>
      <select value={props.method.type} onChange={onChangeMethod}>
        {encryptionMethods.map((method, index) => (
          <option value={method.type} key={index}>
            {method.name}
          </option>
        ))}
      </select>
      <div>2) Введите ключ:</div>
      <input
        value={props.encryptionKey}
        type="text"
        placeholder="Ваш ключ"
        onChange={onChangeKey}
      />
      <div>3) Введите открытый текст, который хотите зашифровать:</div>
      <textarea
        rows={10}
        cols={50}
        value={props.plainText}
        placeholder="Ваш открытый текст"
        onChange={onChangeText}
      />
      <button onClick={onSubmit}>Зашифровать!</button>

      {props.errorMessage ? (
        <div>Ошибка! {props.errorMessage}</div>
      ) : (
        props.encryptedData.text && (
          <>
            <h3>Ваш результат</h3>
            <div>1) Закрытый текст:</div>
            <output>
              <pre>{props.encryptedData.text}</pre>
            </output>
            <div>2) JSON для отправки на сервер для расшифрования:</div>
            <output>
              <pre>
                {getJSON(props.method.name, props.encryptedData.code, props.encryptedData.text)}
              </pre>
            </output>
          </>
        )
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
