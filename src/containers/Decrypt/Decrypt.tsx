import * as React from 'react';
import { connect } from 'react-redux';

import { Header } from 'components/Header';

import { CIPHER_ALGORITHM, ENCRYPTED_DATA } from 'config';

import { AppState, Method } from 'store';
import { DecryptState } from 'store/decrypt/types';
import { setMethod, setKey, setText, setError, decryptData } from 'store/decrypt/actions';

import { encryptionMethods, encryptionTypes } from '../../methods'; //TODO: fix bug with absolut imports with Typescript

interface DecryptStateProps extends DecryptState {
  setMethod: typeof setMethod;
  setText: typeof setText;
  setKey: typeof setKey;
  setError: typeof setError;
  decryptData: typeof decryptData;
}

const Decrypt: React.SFC<DecryptStateProps> = props => {
  const [isJSONMode, setIsJSONMode] = React.useState(false);
  const [encryptedJSON, setEncryptedJSON] = React.useState('');

  const onChangeMethod = (event: any) => {
    event.preventDefault();
    const method: Method =
      encryptionMethods.find(method => method.type === event.target.value) || encryptionMethods[0];
    props.setMethod(method);

    if (
      event.target.value === encryptionTypes.caesar &&
      props.decryptionKey !== parseInt(props.decryptionKey).toString()
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
    if (props.decryptionKey === '') {
      props.setError('Введите ключ расшифрования!');
      return;
    }
    if (props.encryptedText === '') {
      props.setError('Введите текст, который необходимо расшифровать!');
      return;
    }
    props.decryptData(props.method, props.encryptedText, props.decryptionKey);
  };

  const onChangeJSON = (event: any) => {
    event.preventDefault();
    setEncryptedJSON(event.target.value);
  };

  const onSubmitJSON = (event: any) => {
    event.preventDefault();

    if (props.decryptionKey === '') {
      props.setError('Введите ключ расшифрования!');
      return;
    }

    let objectJSON = {};
    try {
      objectJSON = JSON.parse(encryptedJSON);
    } catch (e) {
      props.setError('JSON не валидный!');
    }

    const methodName =
      // @ts-ignore
      objectJSON[CIPHER_ALGORITHM] === undefined ? '' : objectJSON[CIPHER_ALGORITHM];
    const method: Method = encryptionMethods.find(method => method.name === methodName) || {
      name: '',
      type: '',
    };
    props.setMethod(method);
    if (props.method.name === '') {
      props.setError(`Введите метод шифрования в JSON (свойство: ${CIPHER_ALGORITHM})!`);
      return;
    }

    const encryptedText =
      // @ts-ignore
      objectJSON[ENCRYPTED_DATA] === undefined ? '' : objectJSON[ENCRYPTED_DATA];
    props.setText(encryptedText);
    if (props.encryptedText === '') {
      props.setError(
        `Введите текст в JSON, который необходимо расшифровать (свойство: ${ENCRYPTED_DATA})!`,
      ); //TODO: fix bug
      return;
    }

    props.decryptData(props.method, props.encryptedText, props.decryptionKey);
  };

  return (
    <>
      <Header />
      <h2>Расшифрование (легально)</h2>
      <div>0) Выберите режим расшифрования:</div>
      <button onClick={() => setIsJSONMode(!isJSONMode)}>
        {isJSONMode ? 'Перейти в обычный режим' : 'Перейти в режим расшифрования JSON'}
      </button>
      {isJSONMode ? (
        <>
          <div>1) Введите JSON, который хотите расшифровать:</div>
          <textarea value={encryptedJSON} placeholder="Ваш JSON" onChange={onChangeJSON} />
          <div>2) Введите ключ:</div>
          <input
            value={props.decryptionKey}
            type="text"
            placeholder="Ваш ключ"
            onChange={onChangeKey}
          />

          <button onClick={onSubmitJSON}>Расшифровать!</button>

          {props.errorMessage ? (
            <div>Ошибка! {props.errorMessage}</div>
          ) : (
            props.decryptedData.text && (
              <>
                <h3>Ваш результат</h3>
                <div>1) Открытый текст:</div>
                <output>{props.decryptedData.text}</output>
              </>
            )
          )}
        </>
      ) : (
        <>
          <div>1) Выберите метод для расшифрования:</div>
          <select value={props.method.type} onChange={onChangeMethod}>
            {encryptionMethods.map((method, index) => (
              <option value={method.type} key={index}>
                {method.name}
              </option>
            ))}
          </select>
          <div>2) Введите ключ:</div>
          <input
            value={props.decryptionKey}
            type="text"
            placeholder="Ваш ключ"
            onChange={onChangeKey}
          />
          <div>3) Введите закрытый (зашифрованный) текст, который хотите расшифровать:</div>
          <input
            value={props.encryptedText}
            type="text"
            placeholder="Ваш открытый текст"
            onChange={onChangeText}
          />
          <button onClick={onSubmit}>Расшифровать!</button>

          {props.errorMessage ? (
            <div>Ошибка! {props.errorMessage}</div>
          ) : (
            props.decryptedData.text && (
              <>
                <h3>Ваш результат</h3>
                <div>1) Открытый текст:</div>
                <output>{props.decryptedData.text}</output>
              </>
            )
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  method: state.decryptReducer.method,
  decryptionKey: state.decryptReducer.decryptionKey,
  encryptedText: state.decryptReducer.encryptedText,
  errorMessage: state.decryptReducer.errorMessage,
  decryptedData: state.decryptReducer.decryptedData,
});

export default connect(mapStateToProps, { setMethod, setText, setKey, setError, decryptData })(
  Decrypt,
);
